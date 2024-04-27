import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiChevronDown } from 'react-icons/hi'
import { usePopper } from 'react-popper'

import { getFadeInProps } from '@/services/animations.service'
import { languages } from '@/config'
import { useRouter } from 'next/router'

const FLAGS = {
  en: '/images/flags/en.svg',
  es: '/images/flags/es.png',
  pt: '/images/flags/pt.png',
}

export const LanguageSwitch = ({ justIcons }) => {
  const router = useRouter()
  const [referenceElement, setReferenceElement] = React.useState(null)
  const [popperElement, setPopperElement] = React.useState(null)
  const { t, i18n } = useTranslation()
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  const onChange = (lang) => {
    i18n.changeLanguage(lang)
    router.reload()
  }

  if (languages.length === 1) return null

  return (
    <Listbox value={i18n.resolvedLanguage} onChange={onChange}>
      <Listbox.Button className="h-[40px]" ref={setReferenceElement}>
        <motion.span className="flex items-center gap-2" {...getFadeInProps()}>
          {i18n.resolvedLanguage === 'en' && (
            <img src={FLAGS.en} alt="English" className="h-6 w-6" />
          )}
          {i18n.resolvedLanguage === 'es' && (
            <img src={FLAGS.es} alt="Spanish" className="h-6 w-6" />
          )}
          {i18n.resolvedLanguage === 'pt' && (
            <img src={FLAGS.pt} alt="Portuguese" className="h-6 w-6" />
          )}
          {
            !justIcons && <span className="text-gray-900">
              {t(`languages.${i18n.resolvedLanguage}`)}
            </span>
          }
          <HiChevronDown className="text-2xl text-gray-900" />
        </motion.span>
      </Listbox.Button>
      <Listbox.Options
        {...attributes.popper}
        style={styles.popper}
        ref={setPopperElement}
        className="z-10 flex flex-col gap-1 overflow-hidden rounded-lg border border-sky-100 bg-white p-0 shadow-lg"
      >
        {languages.map((lang) => {
          const isSelected = lang === i18n.resolvedLanguage
          return (
            <Listbox.Option
              key={lang}
              value={lang}
              disabled={isSelected}
              className={classNames(
                'hover:text-sky-base cursor-pointer px-8 py-1.5 transition-all duration-300 hover:bg-sky-50',
                {
                  'text-sky-base cursor-default bg-sky-50': isSelected,
                }
              )}
            >
              {!justIcons && t(`languages.${lang}`)}

              {justIcons && (<>
                {lang === 'en' && (
                  <img src={FLAGS.en} alt="English" className="h-6 w-6" />
                )}
                {lang === 'es' && (
                  <img src={FLAGS.es} alt="Spanish" className="h-6 w-6" />
                )}
                {lang === 'pt' && (
                  <img src={FLAGS.pt} alt="Portuguese" className="h-6 w-6" />
                )}
              </>)}
            </Listbox.Option>
          )
        })}
      </Listbox.Options>
    </Listbox>
  )
}
