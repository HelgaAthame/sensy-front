'use client'

import Button from '@/shared/button/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        {/* Previous Button */}
        <Button
          size="sm"
          variant="outline"
          className="rounded-full cursor-pointer"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="hidden sm:inline">Назад</span>
        </Button>

        {/* Page Info */}
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-400 sm:hidden">
          Page {currentPage} of {totalPages}
        </span>

        {/* Page Numbers */}
        <ul className="hidden items-center gap-3 sm:flex">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <li key={idx}>
              <Button
                onClick={() => goToPage(idx + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-theme-sm font-medium cursor-pointer ${
                  currentPage === idx + 1
                    ? 'bg-purple-900 text-white'
                    : 'bg-gray-50 text-black hover:bg-purple-900 hover:text-white'
                }`}
              >
                {idx + 1}
              </Button>
            </li>
          ))}
        </ul>

        {/* Next Button */}
        <Button
          onClick={() => goToPage(currentPage + 1)}
          size="sm"
          variant="outline"
          className="rounded-full cursor-pointer"
          disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline">Вперёд</span>
        </Button>
      </div>
    </div>
  )
}

export default Pagination
