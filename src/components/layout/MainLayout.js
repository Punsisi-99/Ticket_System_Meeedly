import { createElement as h } from 'react'

function MainLayout({ children }) {
  return h(
    'div',
    { className: 'min-h-screen bg-slate-50 text-slate-900' },
    h(
      'header',
      { className: 'sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur' },
      h(
        'div',
        {
          className:
            'mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8',
        },
        h(
          'div',
          { className: 'space-y-1' },
          h('p', { className: 'text-xs font-semibold uppercase tracking-[0.24em] text-slate-500' }, 'Frontend Intern Assignment'),
          h('h1', { className: 'text-2xl font-semibold tracking-tight text-slate-950' }, 'Support Ticket System'),
          h(
            'p',
            { className: 'max-w-2xl text-sm leading-6 text-slate-600' },
            'A modern internal support workspace for creating, triaging, and resolving tickets.',
          ),
        ),
        h(
          'nav',
          {
            className: 'flex flex-wrap items-center gap-2',
            'aria-label': 'Primary navigation',
          },
          h(
            'a',
            {
              className:
                'inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-200',
              'data-route-link': 'true',
              href: '/tickets',
            },
            'Dashboard',
          ),
          h(
            'a',
            {
              className:
                'inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100',
              'data-route-link': 'true',
              href: '/tickets/new',
            },
            'Create Ticket',
          ),
          // h(
          //   'a',
          //   {
          //     className:
          //       'inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100',
          //     'data-route-link': 'true',
          //     href: '/tickets/sample-ticket-id',
          //   },
          //   'Ticket Details',
          // ),
        ),
      ),
    ),
    h('main', { className: 'flex-1' }, children),
  )
}

export default MainLayout
