import { createElement as h, useEffect, useMemo, useState } from 'react'
import TicketDashboardPage from '../pages/TicketDashboardPage/TicketDashboardPage'
import CreateTicketPage from '../pages/CreateTicketPage/CreateTicketPage'
import TicketDetailPage from '../pages/TicketDetailPage/TicketDetailPage'

function getCurrentPath() {
  return window.location.pathname || '/tickets'
}

function getRoute(pathname) {
  if (pathname === '/' || pathname === '/tickets') {
    return {
      page: 'dashboard',
      params: {},
    }
  }

  if (pathname === '/tickets/new') {
    return {
      page: 'create',
      params: {},
    }
  }

  const ticketDetailMatch = pathname.match(/^\/tickets\/([^/]+)$/)

  if (ticketDetailMatch) {
    return {
      page: 'detail',
      params: {
        ticketId: ticketDetailMatch[1],
      },
    }
  }

  return {
    page: 'not-found',
    params: {},
  }
}

function AppRouter() {
  const [pathname, setPathname] = useState(getCurrentPath)

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(getCurrentPath())
    }

    const handleDocumentClick = (event) => {
      const link = event.target.closest('a[data-route-link="true"]')

      if (!link) {
        return
      }

      const href = link.getAttribute('href')

      if (!href || href.startsWith('http')) {
        return
      }

      event.preventDefault()
      window.history.pushState({}, '', href)
      handleLocationChange()
    }

    window.addEventListener('popstate', handleLocationChange)
    document.addEventListener('click', handleDocumentClick)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const route = useMemo(() => getRoute(pathname), [pathname])

  if (route.page === 'create') {
    return h(CreateTicketPage)
  }

  if (route.page === 'detail') {
    return h(TicketDetailPage, { ticketId: route.params.ticketId })
  }

  if (route.page === 'dashboard') {
    return h(TicketDashboardPage)
  }

  return h(TicketDashboardPage)
}

export default AppRouter
