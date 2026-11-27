import Image from 'next/image'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'
import { socialNetworks } from '@/components/SocialIcons'
import { companyEmail, mainPhone, officeAddresses } from '@/i18n/companyContacts'
import { footerMessages } from '@/i18n/footerMessages'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { defaultLocale } from '@/i18n/locales'
import { homeMessages } from '@/i18n/messages'
import { headerMessages } from '@/i18n/navigationMessages'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { FooterSocialIcon } from './FooterSocialIcon'
import styles from './footer.module.css'

export async function Footer() {
  const locale = await getRequestLocale()
  const footerData = await getCachedGlobal('footer', locale, 1)()
  const navItems = footerData?.navItems?.filter(({ link }) => link.label?.trim()) ?? []
  const t = footerMessages[locale]
  const services = (homeMessages[locale] ?? homeMessages[defaultLocale])?.coreServices ?? []
  const contactsHref = `/${locale}/contacts`

  return (
    <footer className={`mt-auto ${styles.footer}`}>
      <div className={styles.forest}>
        <div className={styles.inner}>
          <div className={styles.columns}>
            <Link
              aria-label={headerMessages[locale].homeLabel}
              className={styles.brand}
              href={`/${locale}`}
            >
              <Image alt="" height={63} src="/media/logo.svg" width={202} />
            </Link>

            <div>
              <h2 className={styles.heading}>
                <Link className={styles.link} href={`/${locale}/uslugi`}>
                  {t.services}
                </Link>
              </h2>
              <ul className={styles.list}>
                {services.slice(0, 3).map(({ label }) => (
                  <li key={label}>{label}</li>
                ))}
                <li>{t.emergency}</li>
              </ul>
            </div>

            <div>
              <h2 className={styles.heading}>
                <Link className={styles.link} href={contactsHref}>
                  {t.contacts}
                </Link>
              </h2>
              <address className={styles.list}>
                <span>{officeAddresses[locale]}</span>
                <a className={`${styles.link} ${styles.phone}`} href={mainPhone.href}>
                  {mainPhone.label}
                </a>
                <a className={styles.link} href={companyEmail.href}>
                  {companyEmail.label}
                </a>
              </address>
              <Link className={styles.requisites} href={`${contactsHref}#company-details`}>
                {t.requisites}
              </Link>
            </div>
          </div>

          <div className={styles.social}>
            <h2 className={styles.heading}>{t.social}</h2>
            <ul className={styles.socialList}>
              {socialNetworks.slice(0, 6).map((network) => (
                <li key={network.label}>
                  <span className="sr-only">{network.label}</span>
                  <FooterSocialIcon network={network} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.utilityBar}>
        <div className={styles.utilities}>
          {navItems.length > 0 && (
            <nav aria-label={t.links} className={styles.extraLinks}>
              {navItems.map(({ id, link }, index) => (
                <CMSLink className={styles.link} key={id ?? index} {...link} />
              ))}
            </nav>
          )}
          <ThemeSelector labels={t.theme} />
        </div>
      </div>
    </footer>
  )
}
