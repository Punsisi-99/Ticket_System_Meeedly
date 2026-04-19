import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  addReply as addReplyAction,
  assignTicket as assignTicketAction,
  setError,
  setLoading,
  updateTicketPriority as updateTicketPriorityAction,
  updateTicketStatus as updateTicketStatusAction,
} from '../../../../store/ticketActions'
import { useTicketDispatch, useTicketState } from '../../../../store/TicketStore'
import {
  addReply,
  assignTicket,
  getTicketById as fetchTicketById,
  updateTicketPriority,
  updateTicketStatus,
} from '../../../../services/ticketService'
import {
  getSupportUsers,
  getTicketDetailData,
  getTicketMetaDisplayData,
} from '../../../../store/ticketSelectors'
import { CURRENT_SUPPORT_AUTHOR_TYPE, CURRENT_SUPPORT_USER_ID } from '../utils/ticketDetailConstants'
import {
  formatTicketDate,
  mapAssigneeOptions,
  mapConversationViewModels,
  mapPriorityOptions,
  mapStatusOptions,
} from '../utils/ticketDetailMappers'
import { hasTicketReplyErrors, validateTicketReply } from '../utils/ticketReplyValidation'

export function useTicketDetail(ticketId) {
  const state = useTicketState()
  const dispatch = useTicketDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [replyValue, setReplyValue] = useState('')
  const [replyError, setReplyError] = useState('')
  const [replySubmitError, setReplySubmitError] = useState('')
  const [replySuccess, setReplySuccess] = useState('')
  const [isReplySubmitting, setIsReplySubmitting] = useState(false)
  const [isActionSubmitting, setIsActionSubmitting] = useState(false)
  const [actionError, setActionError] = useState('')

  const detailData = useMemo(() => getTicketDetailData(state, ticketId), [state, ticketId])
  const metaDisplayData = useMemo(() => getTicketMetaDisplayData(state, ticketId), [state, ticketId])
  const supportUsers = useMemo(() => getSupportUsers(state), [state])

  const conversationItems = useMemo(
    () => mapConversationViewModels(detailData.comments, state.usersById),
    [detailData.comments, state.usersById],
  )

  const assigneeOptions = useMemo(
    () =>
      mapAssigneeOptions(
        supportUsers.reduce((accumulator, user) => {
          accumulator[user.id] = user
          return accumulator
        }, {}),
      ),
    [supportUsers],
  )
  const statusOptions = useMemo(() => mapStatusOptions(), [])
  const priorityOptions = useMemo(() => mapPriorityOptions(), [])
  const metaItems = useMemo(
    () => [
      { label: 'Created by', value: metaDisplayData.creatorName },
      { label: 'Assigned to', value: metaDisplayData.assigneeName },
      {
        label: 'Created date',
        value: metaDisplayData.createdAtLabel ? formatTicketDate(metaDisplayData.createdAtLabel) : 'N/A',
      },
      {
        label: 'Updated date',
        value: metaDisplayData.updatedAtLabel ? formatTicketDate(metaDisplayData.updatedAtLabel) : 'N/A',
      },
      {
        label: 'Last reply',
        value: metaDisplayData.lastReplyAtLabel
          ? formatTicketDate(metaDisplayData.lastReplyAtLabel)
          : 'No replies yet',
      },
      { label: 'Conversation entries', value: String(metaDisplayData.commentCount) },
    ],
    [metaDisplayData],
  )

  useEffect(() => {
    let isActive = true

    async function verifyTicket() {
      if (!ticketId) {
        if (isActive) {
          setNotFound(true)
        }
        return
      }

      if (detailData.ticket) {
        if (isActive) {
          setNotFound(false)
        }
        return
      }

      if (isActive) {
        setIsLoading(true)
        setLoadError('')
        setNotFound(false)
      }

      try {
        await fetchTicketById(ticketId)

        if (isActive) {
          setNotFound(false)
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to load ticket details'

        if (isActive) {
          if (message === 'Ticket not found') {
            setNotFound(true)
          } else {
            setLoadError(message)
          }
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    verifyTicket()

    return () => {
      isActive = false
    }
  }, [detailData.ticket, ticketId])

  const handleReplyChange = useCallback((event) => {
    setReplyValue(event.target.value)
    setReplyError('')
    setReplySubmitError('')
    setReplySuccess('')
  }, [])

  const handleReplyReset = useCallback(() => {
    setReplyValue('')
    setReplyError('')
    setReplySubmitError('')
    setReplySuccess('')
  }, [])

  const handleReplySubmit = useCallback(
    async (event) => {
      event.preventDefault()

      const errors = validateTicketReply({ message: replyValue })

      if (hasTicketReplyErrors(errors)) {
        setReplyError(errors.message || '')
        return
      }

      setIsReplySubmitting(true)
      setReplySubmitError('')
      setReplySuccess('')
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const comment = await addReply({
          ticketId,
          authorId: CURRENT_SUPPORT_USER_ID,
          authorType: CURRENT_SUPPORT_AUTHOR_TYPE,
          message: replyValue,
        })

        dispatch(addReplyAction(comment))
        setReplyValue('')
        setReplyError('')
        setReplySuccess('Reply added successfully.')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to submit reply'
        setReplySubmitError(message)
        dispatch(setError(message))
      } finally {
        setIsReplySubmitting(false)
        dispatch(setLoading(false))
      }
    },
    [dispatch, replyValue, ticketId],
  )

  const handleAssignTicket = useCallback(
    async (assignedToId) => {
      if (!detailData.ticket) {
        return
      }

      setIsActionSubmitting(true)
      setActionError('')
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const updatedTicket = await assignTicket(detailData.ticket.id, assignedToId)
        dispatch(assignTicketAction(updatedTicket.id, updatedTicket.assignedToId, updatedTicket.updatedAt))
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to update assignee'
        setActionError(message)
        dispatch(setError(message))
      } finally {
        setIsActionSubmitting(false)
        dispatch(setLoading(false))
      }
    },
    [detailData.ticket, dispatch],
  )

  const handleStatusChange = useCallback(
    async (status) => {
      if (!detailData.ticket) {
        return
      }

      setIsActionSubmitting(true)
      setActionError('')
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const updatedTicket = await updateTicketStatus(detailData.ticket.id, status)
        dispatch(
          updateTicketStatusAction(updatedTicket.id, updatedTicket.status, updatedTicket.updatedAt),
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to update status'
        setActionError(message)
        dispatch(setError(message))
      } finally {
        setIsActionSubmitting(false)
        dispatch(setLoading(false))
      }
    },
    [detailData.ticket, dispatch],
  )

  const handlePriorityChange = useCallback(
    async (priority) => {
      if (!detailData.ticket) {
        return
      }

      setIsActionSubmitting(true)
      setActionError('')
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const updatedTicket = await updateTicketPriority(detailData.ticket.id, priority)
        dispatch(
          updateTicketPriorityAction(
            updatedTicket.id,
            updatedTicket.priority,
            updatedTicket.updatedAt,
          ),
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to update priority'
        setActionError(message)
        dispatch(setError(message))
      } finally {
        setIsActionSubmitting(false)
        dispatch(setLoading(false))
      }
    },
    [detailData.ticket, dispatch],
  )

  return {
    ticket: detailData.ticket,
    createdByUser: detailData.creator,
    assignedUser: detailData.assignee,
    metaDisplayData,
    metaItems,
    conversationItems,
    isLoading,
    loadError,
    notFound,
    replyValue,
    replyError,
    replySubmitError,
    replySuccess,
    isReplySubmitting,
    isActionSubmitting,
    actionError,
    assigneeOptions,
    priorityOptions,
    statusOptions,
    handleReplyChange,
    handleReplyReset,
    handleReplySubmit,
    handleAssignTicket,
    handlePriorityChange,
    handleStatusChange,
  }
}

export default useTicketDetail
