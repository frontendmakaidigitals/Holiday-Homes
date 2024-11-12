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

const data = [
	{ area: 'Marina', created_at: '2024-01-10T12:00:00Z' },
	{ area: 'Marina', created_at: '2024-01-20T12:00:00Z' },
	{ area: 'Downtown', created_at: '2024-01-15T12:00:00Z' },
	{ area: 'Marina', created_at: '2024-02-05T12:00:00Z' },
	{ area: 'Downtown', created_at: '2024-02-10T12:00:00Z' },
	{ area: 'Business Bay', created_at: '2024-02-10T12:00:00Z' },
	// More data...
]

const Page = () => {
	const [areaCounts, setAreaCounts] = useState({})

	// Simulating an API call and processing the data
	useEffect(() => {
		const fetchData = async () => {
			try {
				// In real use case, you'd fetch this data
				// const res = await axios.get('/api/blogs')
				// const data = res.data;

				const processedData = processData(data) // Use the data from the API or mock data
				setAreaCounts(processedData)
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
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
				<div className="h-full w-full rounded-xl bg-yellow-50 lg:col-start-3">
					<TotalQuery />
				</div>
				<div className="h-full w-full rounded-xl bg-gray-100 lg:col-start-3 lg:row-start-2"></div>
			</div>
		</div>
	)
}

export default Page

const TotalQuery = () => {
	const totalNum = 421
	return (
		<div className="h-full w-full p-5">
			<p className="text-2xl font-semibold">Queries</p>

			<div className="flex items-center justify-center">
				<p className="text-6xl">
					821<span className="text-lg">Total</span>
				</p>
			</div>
			<div className="mt-5 flex w-full items-center justify-end gap-4">
				<p className="flex items-center">
					<IoIosCheckbox className="text-lg text-green-300" />{' '}
					<span className="">412</span>
				</p>
				<p className="flex items-center">
					<IoIosCheckbox className="text-lg text-red-400" />{' '}
					<span className="">42</span>
				</p>
			</div>
		</div>
	)
}
// AreaGraphs component now accepts areaCounts as a prop to show the chart
const AreaGraphs = ({ areaCounts }: any) => {
	// If areaCounts is empty, return a loading or fallback message
	if (Object.keys(areaCounts).length === 0) {
		return (
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Loading...</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Data is loading...</p>
				</CardContent>
			</Card>
		)
	}

	// Define a color mapping for each area
	const areaColors: any = {
		Marina: '#ff96ce', // Example color
		Downtown: '#96ffc9', // Example color
		Suburb: '#e0ff96', // Example color
		Beach: '#ffcd69', // Example color
		// Add more areas as needed
	}

	// Format the areaCounts data to create chartData
	const chartData = Object.keys(areaCounts).map((monthYear) => {
		const areas = areaCounts[monthYear]
		return {
			month: monthYear,
			...Object.keys(areas).reduce((acc: any, area: any) => {
				acc[area] = areas[area]
				return acc
			}, {}),
		}
	})

	return (
		<Card className="w-full">
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
								tickFormatter={(value) => value.slice(0, 3)} // Month short name
							/>
							<YAxis tickLine={false} axisLine={false} />
							<Tooltip
								contentStyle={{
									background: 'hsl(var(--card))',
									border: '1px solid hsl(var(--border))',
								}}
							/>
							{Object.keys(chartData[0])
								.filter((key) => key !== 'month') // Exclude the "month" field
								.map((area) => (
									<Area
										key={area}
										type="natural"
										dataKey={area}
										stackId="a"
										stroke={areaColors[area] || 'gray'} // Use the color from areaColors or fallback to gray
										fillOpacity={0.4}
										fill={areaColors[area] || 'gray'} // Use the color from areaColors or fallback to gray
									/>
								))}
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
