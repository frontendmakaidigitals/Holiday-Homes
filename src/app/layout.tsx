import { Poppins } from 'next/font/google'
import ClientCommons from './ClientCommons'
import './globals.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import { Metadata } from 'next'
import ThemeProvider from './theme-provider'
import HeaderFooter from '@/components/HeaderFooter' // Import the new client component

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Chisfis - Booking online React Next Template',
	description: 'Booking online & rental online React Next Template',
	keywords: 'Chisfis, Booking online, React Next Template',
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
					<div className="relative z-[999999]">
						<a
							className="fixed bottom-10 right-10 z-[999999] flex size-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-green-600 bg-[#25D366] transition-all duration-300 hover:bg-green-400 hover:shadow-lg"
							href="https://wa.me/15551234567"
						>
							<img
								width={30}
								src={
									'https://cdn-icons-png.freepik.com/256/2585/2585165.png?semt=ais_hybrid'
								}
							/>
						</a>
						<HeaderFooter>{children}</HeaderFooter>{' '}
					</div>

					<ClientCommons />
				</body>
			</ThemeProvider>
		</html>
	)
}
