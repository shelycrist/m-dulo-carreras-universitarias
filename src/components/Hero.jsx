
import { tWithVars } from '@/lib'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()
  return (
    <div className="overflow-hidden bg-primary-200 dark:bg-primary-900">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline bg-gradient-to-r from-primary-700 via-primary-base to-primary-700 dark:from-primary-100 dark:via-primary-300 dark:to-primary-500 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                {tWithVars("hero.title", t)}
              </p>
              <p className="mt-3 text-2xl tracking-tight text-primary-base dark:text-primary-100">
                {tWithVars("hero.subtitle", t)}
              </p>
              {/* <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href="/">Empezar</Button>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
