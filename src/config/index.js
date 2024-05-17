import { ecommerces } from "@/constants"

export const clientName = 'payway'
export const ecommerce = ecommerces.tiendanube
export const languages = ['es', 'en', 'pt']

// Left navigation
export const leftNavigation = [
  {
    title: 'GENERAL',
    links: [
      { title: 'Resumen', href: '/docs/resumen' },
    ],
  },
  {
    title: 'ESTADO',
    links: [
      { title: 'Lara', href: '/docs/lara/lara' },
      { title: 'Falcón', href: '/docs/falcon/falcon' },
      { title: 'Yaracuy', href: '/docs/yaracuy/yaracuy' },
      { title: 'Portuguesa', href: '/docs/portuguesa/portuguesa' },
    ],
  },
  {
    title: 'OTROS',
    links: [
      { title: 'Destacados del país', href: '/docs/yaracuy' },
    ],
  },

]