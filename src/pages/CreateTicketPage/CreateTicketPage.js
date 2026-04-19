import { createElement as h } from 'react'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import MainLayout from '../../components/layout/MainLayout'
import PageContainer from '../../components/layout/PageContainer'
import TicketCreateForm from '../../features/tickets/create/components/TicketCreateForm'

function CreateTicketPage() {
  return h(
    MainLayout,
    null,
    h(
      PageContainer,
      null,
      h(PageHeader, {
        title: 'Create Ticket',
        subtitle:
          'Describe the issue clearly, include enough context to reproduce it, and help the support team respond faster.',
      }),
      h(SectionCard, { title: 'Ticket Details' }, h(TicketCreateForm)),
    ),
  )
}

export default CreateTicketPage
