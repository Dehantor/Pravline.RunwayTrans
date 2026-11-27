# Docker release on the local Windows host

Date: 2026-11-18. Scope: deploy the current working tree on branch `stage` without switching branches, discarding local edits, or changing the database schema.

## Observed state

- Next.js 16.2.3, Payload 3.82.1, React 19.2.4; existing Docker setup uses Node 22.17.0 Alpine.
- The development Compose file publishes a second PostgreSQL on an occupied port and runs migrations automatically. It is unsuitable for this release.
- The checked-in Dockerfile assumes standalone output, which the current Next configuration does not enable.
- The analyst confirmed the existing database is `runway_trans` in `postgres-crm`; the README's `runway_trans_restored` database does not exist.
- Existing build directories predate this release. Windows dependencies must not be used as Linux dependencies.

## Decision

Use the existing README deployment pattern: a Node container running a fresh production Next build, with the current project mounted at `/app`. Overlay `/app/node_modules` with a new, release-specific Docker volume. Use a unique `RUNWAY_NEXT_DIST_DIR` under `.next-runtime/` for the build and runtime, preserving all previous build directories and the host development process.

Install exactly the package-lock dependencies with `npm ci --include=dev` inside Linux. Build using `npm exec -- next build --webpack`, then run `npm run start -- --hostname 0.0.0.0` with `NODE_ENV=production`. Set the same public URL for build and runtime, initially `http://localhost:3005`, and publish host port 3005 to container port 3000. The standard `npm run build` postbuild sitemap task does not currently select the custom distDir; do not run it against the stale default `.next`. Regenerating sitemaps requires explicitly selecting the new output directory and reviewing resulting public files.

Read existing secrets from the untracked `.env` without printing them or embedding them in documentation. Preserve its database name and credentials; adapt only the loopback database hostname to `host.docker.internal` for Docker Desktop. Verify actual connectivity before completing deployment. Set `PAYLOAD_DB_PUSH=false`; do not invoke migrations, schema push, seed, or database restoration. Keep uploads in the existing host `public/media` directory through the project mount.

Use a dedicated production Compose file or equivalent recorded `docker run` command, rather than modifying the development stack. The application container should restart unless stopped and report health through a real HTTP request. Do not change the shared Nginx routing merely to make this local Docker endpoint available. Public HTTPS publication is a separate verification boundary.

## Constraints and risks

This is a single-instance local production-mode deployment. A host project mount means configuration and media can change after deployment; it does not provide an immutable image. Do not reinstall dependencies in a volume used by a running release. Keep the distinct build directory and dependency volume until rollback is no longer needed. For a future reproducible release pipeline, build an immutable application image while mounting only media separately and injecting secrets at runtime.

No new application contracts, roles, controllers, database schema, or UI behavior are introduced. The existing PostgreSQL is shared infrastructure: application startup must not restart or replace it. Build tasks can require external font downloads and database connectivity; a failed build must not replace a working runtime.

No throughput target was provided. One Node process and the existing database pool are retained; capacity for increased concurrent traffic is unproven. Sustained CPU/memory pressure, database pool waits, or rising response latency would justify a measured load test and capacity review. Do not run production load tests as part of this release.

## Acceptance and rollback

1. Record the new build ID and runtime container settings without secrets; confirm the runtime references the fresh output directory.
2. Confirm `npm ci` and the production build complete successfully. Validate TypeScript with `tsc --noEmit` if not already covered by the build.
3. Confirm the container remains running and HTTP requests to the homepage, representative CMS-backed routes, `/cases`, `/tehnika`, `/geografiya`, `/admin`, and a static media asset succeed. Missing pages should return 404.
4. Inspect application logs for failed database queries, missing assets, and startup exceptions. A process or HTTP 200 alone does not prove UI correctness.
5. Independently smoke-test the actual served container version in a browser, including relevant themes and menus. Report untested UI states explicitly.
6. Distinguish successful local Docker deployment from verified public HTTPS deployment.

Rollback stops only the new application container and reuses a previously verified release/build configuration if available. Existing host processes, old build folders, media, database containers, and volumes must be preserved.

## Official references checked

- [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting): production `next start`, build-time public environment variables, and single-instance cache constraints.
- [Docker Desktop networking](https://docs.docker.com/desktop/features/networking/): container-to-host networking and published-port behavior.

These references inform deployment mechanics; installed versions and observed runtime behavior remain the evidence for this release.
