import { HiCog, HiCursorClick, HiLogout, HiPencil, HiStatusOnline } from "react-icons/hi"

const colors = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  gray: 'bg-gray-500',
  indigo: 'bg-indigo-500',
}

const quickSearch = [
  {
    id: 1,
    url: '/docs/installation',
    color: colors.indigo,
    icon: HiCursorClick,
  },
  {
    id: 2,
    url: '/docs/tutorial',
    color: colors.red,
    icon: HiCog,
  },
  {
    id: 3,
    url: '/docs/faq',
    color: colors.green,
    icon: HiLogout,
  },
  {
    id: 4,
    url: '/docs/onboarding',
    color: colors.yellow,
    icon: HiStatusOnline,
  }
]

export default quickSearch