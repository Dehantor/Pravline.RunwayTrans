import { SocialIcon, type socialNetworks } from '@/components/SocialIcons'

export function FooterSocialIcon({ network }: { network: (typeof socialNetworks)[number] }) {
  return <SocialIcon className="size-[35px]" markClassName="size-6" network={network} />
}
