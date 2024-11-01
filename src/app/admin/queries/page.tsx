'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { MdDeleteForever } from 'react-icons/md'
import { RiEdit2Fill } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa6'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/Shadcncomponents/components/ui/table'
import Dropdown from '@/components/queryDropDown'
interface Query {
	id: string
	email: string
	company: string
	name: string
	mobile: string
	is_read: number
}
const Page = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const serverURL = 'https://admin.yatriclubs.com/'
	const [queries, setQueries] = useState([])
	const [selectedOption, setSelectedOption] = useState({
		value: 2,
		label: 'All',
	})
	const options: { value: number; label: string }[] = [
		{ value: 2, label: 'All' },
		{ value: 1, label: 'Read' },
		{ value: 0, label: 'Unread' },
	]

	const getQueries = () => {
		setIsLoading(true)
		axios
			.get(`${serverURL}sanctum/csrf-cookie`, { withCredentials: true })
			.then(() => {
				return axios.get(`${serverURL}api/query`, { withCredentials: true })
			})
			.then((res) => {
				setQueries(res.data)
				setStatus('success')
			})
			.catch((error) => {
				console.error(error)
				setStatus('failed')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		getQueries()
	}, [])

	return (
		<div className="w-full xl:mt-5 xl:px-3 xxl:mt-7 xxl:px-10">
			<div className=" flex w-full items-center justify-between">
				<p className="font-Satoshi font-medium">Total Queries</p>
				{/* Search Input */}
				<div className="flex items-center gap-5">
					<input
						type="text"
						placeholder="Search..."
						className="rounded-md border p-2"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Dropdown
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						options={options}
					/>
				</div>
			</div>
			<div className="mt-1 rounded-xl bg-slate-50 p-3">
				{queries.length > 0 ? (
					<Queries
						searchTerm={searchTerm}
						serverURL={serverURL}
						queries={queries}
						setQueries={setQueries}
						selectedOption={selectedOption}
					/>
				) : (
					<p className="font-Satoshi text-center text-lg font-medium">
						No Queries Found
					</p>
				)}
			</div>
		</div>
	)
}

export default Page

const Queries = ({
	searchTerm,
	serverURL,
	queries,
	setQueries,
	selectedOption,
}: {
	searchTerm: string
	serverURL: string
	queries: any
	setQueries: any
	selectedOption: any
}) => {
	const [isQuerySubmitting, setIsQuerySubmitting] = useState(false)
	const [submitId, setSubmitId] = useState<string | null>(null)

	const filteredQueries = queries.filter((query: Query) => {
		const matchesSearchTerm =
			query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			query.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
			query.name.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesReadStatus =
			selectedOption.label === 'All' || selectedOption.value === query.is_read

		return matchesSearchTerm && matchesReadStatus
	})

	const updateQuery = (id: string | null) => {
		setSubmitId(id)
		setIsQuerySubmitting(true)
		axios
			.get(`${serverURL}sanctum/csrf-cookie`, { withCredentials: true })
			.then(() => {
				return axios.post(
					`${serverURL}api/updateRead/${id}`,
					{ checked: 1 },
					{ withCredentials: true },
				)
			})
			.then(() => {
				setQueries((prevQueries: Query[]) =>
					prevQueries.map((query: { id: string }) =>
						query.id === id ? { ...query, is_read: 1 } : query,
					),
				)
			})
			.catch((error) => {
				console.error(error)
			})
			.finally(() => {
				setIsQuerySubmitting(false)
			})
	}

	return (
		<div className="relative h-[80vh] overflow-auto">
			<Table className="min-w-full">
				<TableCaption>A list of your Queries.</TableCaption>
				<TableHeader className="sticky left-0 top-0 z-10">
					<TableRow className="bg-gray-200 hover:bg-gray-200">
						<TableHead className="font-Satoshi rounded-l-xl pl-4 text-lg font-bold text-gray-900">
							No.
						</TableHead>
						<TableHead className="font-Satoshi text-lg font-bold text-gray-900">
							Name
						</TableHead>
						<TableHead className="font-Satoshi text-lg font-bold text-gray-900">
							Email
						</TableHead>
						<TableHead className="font-Satoshi text-lg font-bold text-gray-900">
							Company
						</TableHead>
						<TableHead className="font-Satoshi text-lg font-bold text-gray-900">
							Contact
						</TableHead>
						<TableHead className="font-Satoshi rounded-r-xl text-lg font-bold text-gray-900">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredQueries.map((query: Query, index: number) => (
						<TableRow key={query.id} className="hover:bg-gray-100">
							<TableCell className="py-3 pl-4">{index + 1}</TableCell>
							<TableCell className="font-Satoshi py-3 text-lg font-medium">
								{query.name}
							</TableCell>
							<TableCell className="font-Satoshi py-3 font-medium">
								{query.email}
							</TableCell>
							<TableCell className="font-Satoshi py-3 font-medium">
								{query.company}
							</TableCell>
							<TableCell className="font-Satoshi py-3 font-medium">
								{query.mobile}
							</TableCell>
							<TableCell className="py-3">
								<div className="flex items-center gap-2">
									<div className="group relative cursor-pointer">
									<p className="absolute bottom-full left-1/2 z-9 hidden w-auto -translate-x-1/2 text-nowrap rounded-full bg-slate-500 px-4 py-1 text-gray-100 shadow-lg group-hover:block">
											Mark as read
										</p>
										{isQuerySubmitting && submitId === query.id ? (
											<div className="flex items-center gap-4">
												<div role="status">
													<svg
														aria-hidden="true"
														className="h-6 w-6 animate-spin fill-sky-500 text-gray-200 dark:text-gray-600"
														viewBox="0 0 100 101"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
															fill="currentColor"
														/>
														<path
															d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
															fill="currentFill"
														/>
													</svg>
													<span className="sr-only">Loading...</span>
												</div>
												<FaCheck className="relative text-xl text-gray-500" />
											</div>
										) : (
											<FaCheck
												onClick={() => updateQuery(query.id)}
												className={`relative text-xl ${query.is_read ? 'text-green-500' : 'text-slate-900'}`}
											/>
										)}
									</div>
									<div className="group relative cursor-pointer">
										<p className="absolute bottom-full left-1/2 z-9 hidden w-auto -translate-x-1/2 text-nowrap rounded-full bg-red-500 px-4 py-1 text-gray-100 shadow-lg group-hover:block">
											Delete query
										</p>
										<MdDeleteForever className="relative text-xl text-red-500" />
									</div>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
