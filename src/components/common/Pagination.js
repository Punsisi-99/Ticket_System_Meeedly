import { createElement as h } from 'react'
import Button from '../actions/Button'

function createPageNumbers(totalPages) {
  return Array.from({ length: totalPages }, (_, index) => index + 1)
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return null
  }

  const pageNumbers = createPageNumbers(totalPages)

  return h(
    'nav',
    { className: 'mt-2 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between', 'aria-label': 'Pagination' },
    h(
      Button,
      {
        variant: 'secondary',
        disabled: currentPage <= 1,
        onClick: () => onPageChange(currentPage - 1),
        type: 'button',
      },
      'Previous',
    ),
    h(
      'div',
      { className: 'flex flex-wrap gap-2' },
      ...pageNumbers.map((pageNumber) =>
        h(
          Button,
          {
            key: pageNumber,
            variant: pageNumber === currentPage ? 'primary' : 'ghost',
            onClick: () => onPageChange(pageNumber),
            type: 'button',
          },
          String(pageNumber),
        ),
      ),
    ),
    h(
      Button,
      {
        variant: 'secondary',
        disabled: currentPage >= totalPages,
        onClick: () => onPageChange(currentPage + 1),
        type: 'button',
      },
      'Next',
    ),
  )
}

export default Pagination
