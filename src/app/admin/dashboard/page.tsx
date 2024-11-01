'use client'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Page = () => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('/api/blogs')
				console.log(res.data)
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
	}, [])
	return (
		<div className="w-full h-[100vh] xl:mt-5 xl:px-3 xxl:mt-7 xxl:px-7 xxxl:mt-10 xxxl:px-10">
			<div className="grid h-[450px] w-full grid-cols-1 gap-x-7 gap-y-7 lg:grid-cols-3 lg:grid-rows-2">
				<div className="h-full w-full rounded-xl bg-slate-200 lg:col-span-2 lg:row-span-2"></div>
				<div className="h-full w-full rounded-xl bg-gray-100 lg:col-start-3"></div>
				<div className="h-full w-full rounded-xl bg-neutral-100 lg:col-start-3 lg:row-start-2"></div>
			</div>
		</div>
	)
}

export default Page
