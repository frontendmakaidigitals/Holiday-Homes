'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../chart.css'
import { IoIosCheckbox } from 'react-icons/io'
import { TrendingUp } from 'lucide-react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
const Page = () => {
	const [areaCounts, setAreaCounts] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')

	const [queries, setQueries] = useState([])
	const [tracking, setTracking] = useState([])
	const [listings, setListings] = useState([])
	// Simulating an API call and processing the data
	const getQueries = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/query`, {
					withCredentials: true,
				})
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
	const getListings = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing`, {
					withCredentials: true,
				})
			})
			.then((res) => {
				setListings(res.data.data)
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
	const getTracking = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracking`, {
					withCredentials: true,
				})
			})
			.then((res) => {
				setTracking(res.data.data)
				setStatus('success')
				const processedData = processData(res.data.data) // Use the data from the API or mock data
				setAreaCounts(processedData)
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
		getTracking()
		getListings()
	}, [])

	// Function to process the raw data into area counts grouped by month
	const processData = (data: { area: string; created_at: string }[]) => {
		const areaCounts: { [key: string]: { [key: string]: number } } = {}

		data.forEach((item) => {
			const date = new Date(item.created_at)
			const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}` // "1-2024" for January 2024

			if (!areaCounts[monthYear]) {
				areaCounts[monthYear] = {}
			}

			if (!areaCounts[monthYear][item.area]) {
				areaCounts[monthYear][item.area] = 0
			}

			areaCounts[monthYear][item.area]++
		})

		return areaCounts
	}

	return (
		<div className="h-[100vh] w-full xl:mt-5 xl:px-3 xxl:mt-7 xxl:px-7 xxxl:mt-10 xxxl:px-10">
			<div className="grid w-full grid-cols-1 gap-x-7 gap-y-7 lg:grid-cols-3 lg:grid-rows-2">
				<div className="h-full w-full rounded-xl bg-slate-200 lg:col-span-2 lg:row-span-2">
					<AreaGraphs areaCounts={areaCounts} />
				</div>
				<div className="h-full w-full rounded-xl bg-yellow-50 shadow-md lg:col-start-3">
					<TotalQuery queries={queries} />
				</div>
				<div className="h-full w-full rounded-xl bg-slate-100 shadow-md lg:col-start-3 lg:row-start-2">
					<Listing listings={listings} />
				</div>
			</div>
		</div>
	)
}

export default Page

const TotalQuery = ({ queries }: { queries: any }) => {
	const [checked, setChecked] = useState(0)

	const getChecked = () => {
		// Count the number of items where is_read is true
		const count = queries.filter((item: any) => item.is_read).length
		setChecked(count)
	}

	useEffect(() => {
		getChecked()
	}, [queries])

	return (
		<div className="h-full w-full p-5">
			<p className="text-2xl font-semibold">Queries</p>

			<div className="mt-4 flex items-center justify-center">
				<p className="text-6xl">
					{queries.length}
					<span className="text-lg">Total</span>
				</p>
			</div>
			<div className="mt-5 flex w-full items-center justify-end gap-4">
				<p className="flex items-center">
					<IoIosCheckbox className="text-lg text-green-300" />{' '}
					<span className="">{checked}</span>
				</p>
				<p className="flex items-center">
					<IoIosCheckbox className="text-lg text-red-400" />{' '}
					<span className="">{queries.length - checked}</span>
				</p>
			</div>
		</div>
	)
}
// AreaGraphs component now accepts areaCounts as a prop to show the chart
const AreaGraphs = ({ areaCounts }: any) => {
	if (Object.keys(areaCounts).length === 0) {
		return (
			<Card className="flex h-full w-full flex-col items-center justify-center">
				<CardHeader>
					<CardTitle>Loading...</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Data is loading...</p>
				</CardContent>
			</Card>
		)
	}

	const areaColors: any = {
		Marina: '#ff96ce',
		Downtown: '#5C6BC0',
		'Business Bay': '#00ACC1',
		'Jumeriah Village Circle': '#5D4037',
		'Jumeriah Lake Triangle': '#EF6C00',
	}

	const getMonthName = (monthIndex: number) => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		return months[monthIndex]
	}

	const allMonths = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
	]

	// Construct chartData
	const chartData = allMonths.map((monthIndex) => {
		const monthYear = `${monthIndex}-2024`
		const monthName = getMonthName(parseInt(monthIndex) - 1)

		const areas = areaCounts[monthYear] || {}

		// Ensure all areas have valid values
		const validData = Object.keys(areaColors).reduce((acc: any, area: any) => {
			const value = areas[area]
			acc[area] = isNaN(value) || value == null ? 0 : value // Default to 0 if invalid
			return acc
		}, {})

		return { month: monthName, ...validData }
	})

	console.log('chartData', chartData) // Debugging: Check the generated data

	if (chartData.length === 0) {
		return <p>No data available for the chart.</p>
	}

	return (
		<Card className="h-full w-full">
			<CardHeader>
				<CardTitle>Area Chart - Monthly Counts</CardTitle>
				<CardDescription>Showing area counts for each month</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={chartData}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)} // Shortened month names
							/>
							{/* Adjust YAxis domain to ensure it starts from 0 and auto scales */}
							<YAxis tickLine={false} axisLine={false} domain={[0, 'auto']} />
							<Tooltip
								contentStyle={{
									background: 'white',
									border: '.4px solid #000000',
									borderRadius: '.6rem',
									paddingRight: '1rem',
									paddingLeft: '1rem',
									paddingTop: '0.5rem',
									paddingBottom: '0.5rem',
								}}
								labelFormatter={(value) => `${value}`}
							/>
							{/* Render each Area dynamically */}
							{Object.keys(areaColors).map((area) => (
								<Area
									key={area}
									type="monotone"
									dataKey={area}
									stackId="a" // If you want stacking, keep this; otherwise, remove it
									stroke={areaColors[area] || 'gray'}
									fill={areaColors[area] || 'gray'}
									fillOpacity={0.4}
								/>
							))}
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

const Listing = ({ listings }: { listings: any }) => {
	const areaNames: string[] = [
		'Marina',
		'Downtown',
		'Business Bay',
		'JVC', // This is the shorthand you want to map
		'JLT', // This is the shorthand you want to map
	]

	// Count the listings by area
	const areaCounts = areaNames.reduce(
		(counts: { [key: string]: number }, areaName) => {
			// Map 'JVC' to 'Jumeirah Village Circle' and 'JLT' to 'Jumeirah Lake Towers'
			const searchArea =
				areaName === 'JVC'
					? 'Jumeriah Village Circle'
					: areaName === 'JLT'
						? 'Jumeriah Lake Triangle'
						: areaName

			// Count how many listings match this area
			const areaCount = listings.filter(
				(listing: any) => listing.Area === searchArea, // Search for the transformed area name
			).length

			counts[areaName] = areaCount // Store the count for each area
			return counts
		},
		{},
	)
	return (
		<div className="h-full w-full p-5">
			<p className="text-2xl font-semibold">Listings</p>

			<div className="mt-4 flex items-center justify-center">
				<p className="text-6xl">
					{listings.length}
					<span className="text-lg">Total</span>
				</p>
			</div>
			<div className="mt-6 flex w-full flex-wrap items-center justify-end gap-4 text-sm">
				{/* Display the area counts */}
				{areaNames.map((areaName) => (
					<p key={areaName}>
						{areaName}: {areaCounts[areaName] || 0}{' '}
						{/* Default to 0 if no listings for the area */}
					</p>
				))}
			</div>
		</div>
	)
}
