import React from 'react'
import { GoChevronRight } from 'react-icons/go'
import { GoChevronLeft } from 'react-icons/go'
// Pagination component that takes current page, total pages, and the function to change pages
interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

	return (
		<div className="flex items-center space-x-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="flex size-10 items-center justify-center rounded-full bg-gray-300 text-xl text-gray-700"
			>
				<GoChevronLeft />
			</button>

			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`size-10 rounded-full ${currentPage === page ? 'bg-transparent text-black' : 'bg-gray-200'}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="flex size-10 items-center justify-center rounded-full bg-gray-300 text-xl text-gray-700"
			>
				<GoChevronRight />
			</button>
		</div>
	)
}

export default Pagination
