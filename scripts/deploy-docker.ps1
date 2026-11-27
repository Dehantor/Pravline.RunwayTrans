param(
  [string]$Release = (Get-Date -Format 'yyyyMMdd-HHmmss'),
  [ValidateSet('Build', 'Start')][string]$Action = 'Build'
)

$ErrorActionPreference = 'Stop'
$projectDir = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectDir
$releaseDir = Join-Path $projectDir "output/docker-release/$Release"
New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
$databaseLine = Get-Content -LiteralPath (Join-Path $projectDir '.env') |
  Where-Object { $_ -match '^DATABASE_URL=' } | Select-Object -First 1
if (-not $databaseLine) { throw 'DATABASE_URL is missing from .env' }
$databaseUrl = $databaseLine.Substring('DATABASE_URL='.Length).Trim().Trim('"').Trim("'")
$databaseUrl = $databaseUrl -replace '@(127\.0\.0\.1|localhost)(?=[:/])', '@host.docker.internal'
if ($databaseUrl -notmatch '@host\.docker\.internal:5432/runway_trans(?:\?|$)') {
  throw 'Expected existing runway_trans database on host port 5432'
}
$previousDatabaseUrl = $env:DATABASE_URL
try {
  $env:DATABASE_URL = $databaseUrl
  $commonArgs = @('--env-file', (Join-Path $projectDir '.env'),
    '-e', 'DATABASE_URL', '-e', 'PAYLOAD_DB_PUSH=false',
    '-e', 'NEXT_PUBLIC_SERVER_URL=http://localhost:3005',
    '-e', 'NEXT_TELEMETRY_DISABLED=1',
    '-e', "RUNWAY_NEXT_DIST_DIR=.next-runtime/docker-$Release",
    '-v', "${projectDir}:/app", '-v', "runway-trans-deps-${Release}:/app/node_modules", '-w', '/app')
  if ($Action -eq 'Build') {
    $args = @('run', '-d', '--name', "runway-trans-build-$Release") + $commonArgs +
      @('node:22.17.0-alpine', 'sh', '-lc', 'npm ci --include=dev && npx tsc --noEmit --incremental false && npx next build --webpack')
    & docker @args
    if ($LASTEXITCODE -ne 0) { throw 'Could not start build container' }
    @{ release = $Release; distDir = ".next-runtime/docker-$Release"; buildContainer = "runway-trans-build-$Release";
       dependenciesVolume = "runway-trans-deps-$Release"; publicUrl = 'http://localhost:3005'; database = 'runway_trans' } |
      ConvertTo-Json | Set-Content -LiteralPath (Join-Path $releaseDir 'release.json') -Encoding utf8
  } else {
    $buildResult = & docker inspect "runway-trans-build-$Release" --format '{{.State.Status}} {{.State.ExitCode}}'
    if ($LASTEXITCODE -ne 0 -or $buildResult -ne 'exited 0') { throw "Build is not successful: $buildResult" }
    if (-not (Test-Path -LiteralPath (Join-Path $projectDir ".next-runtime/docker-$Release/BUILD_ID"))) {
      throw 'Fresh BUILD_ID is missing'
    }
    $existing = & docker ps -a --filter 'name=^/runway-trans-prod$' --format '{{.Names}}'
    if ($existing) { throw 'An existing production container must be retained and switched explicitly' }
    $args = @('run', '-d', '--name', 'runway-trans-prod', '--restart', 'unless-stopped', '-p', '3005:3000') +
      $commonArgs + @('-e', 'NODE_ENV=production', 'node:22.17.0-alpine',
        'sh', '-lc', 'npm run start -- --hostname 0.0.0.0')
    & docker @args
    if ($LASTEXITCODE -ne 0) { throw 'Could not start production container' }
  }
} finally {
  $env:DATABASE_URL = $previousDatabaseUrl
}
