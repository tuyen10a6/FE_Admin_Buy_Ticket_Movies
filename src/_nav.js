import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Danh sách các loại phim',
    to: '/dashboard',
  },

  {
    component: CNavItem,
    name: 'Danh sách rạp chiếu phim',
    to: '/charts',
  },

  {
    component: CNavItem,
    name: 'Danh sách phim',
    to: '/phim',
  },
  {
    component: CNavItem,
    name: 'Danh sách các lịch chiếu',
    to: '/lichchieu',
  },
  {
    component: CNavItem,
    name: 'Danh sách vé đặt',
    to: '/datve',
  },
]

export default _nav
