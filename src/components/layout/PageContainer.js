import { createElement as h } from 'react'

function PageContainer({ children }) {
  return h(
    'section',
    {
      className: 'mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10',
    },
    children,
  )
}

export default PageContainer
