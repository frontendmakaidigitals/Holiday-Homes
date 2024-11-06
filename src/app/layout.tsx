import { Poppins } from 'next/font/google'
import ClientCommons from './ClientCommons'
import './globals.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import { Metadata } from 'next'
import ThemeProvider from './theme-provider'
import HeaderFooter from '@/components/HeaderFooter' // Import the new client component
import WhatsappContact from '@/components/WhatsappContact'
import { Suspense } from 'react'
import Loading from './loading' // Import the Loading component

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'BSHH - Booking online & rental online',
	description: 'Booking online & rental online React Next Template',
	keywords:
		'BSHH, Holiday Booking, Rental Booking, Brown Stone, Dubai, Dubai hotels',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={poppins.className}>
			<ThemeProvider>
				<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
					<div className="z-9 relative">
						<WhatsappContact />

						<HeaderFooter>
							{children}
							<Loading />
						</HeaderFooter>
					</div>
					<ClientCommons />
				</body>
			</ThemeProvider>
		</html>
	)
}
