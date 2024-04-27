import { ecommerces } from "@/constants"

export const clientName = 'payway'
export const ecommerce = ecommerces.tiendanube
export const languages = ['es', 'en', 'pt']

// Left navigation
export const leftNavigation = [
  {
    title: 'general.title',
    links: [
      { title: 'general.summary.title', href: '/' },
      { title: 'general.installation.title', href: '/docs/installation' },
      { title: 'general.tutorial.title', href: '/docs/tutorials' },
    ],
  },
  {
    title: 'configuration.title',
    links: [
      { title: 'configuration.onboarding.title', href: '/docs/onboarding' },
      { title: 'configuration.additional.title', href: '/docs/additional' },
      { title: 'configuration.customer-flow.title', href: '/docs/customer-flow' },
      { title: 'configuration.admin-flow.title', href: '/docs/admin-flow' },
    ],
  },
  {
    title: 'more.title',
    links: [
      { title: 'more.faq.title', href: '/docs/faq' },
    ],
  },

]