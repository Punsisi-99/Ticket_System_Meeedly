export function getEmptyComment() {
  return {
    id: '',
    ticketId: '',
    authorId: '',
    authorType: 'customer',
    message: '',
    createdAt: '',
  }
}

export function createComment(data = {}) {
  return {
    ...getEmptyComment(),
    ...data,
  }
}
