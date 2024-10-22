// /app/HeaderFooter.tsx
'use client'

import { usePathname } from 'next/navigation'
import SiteHeader from '@/app/(client-components)/(Header)/SiteHeader'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'

const HeaderFooter = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const isAdminRoute = pathname.startsWith('/admin')

	return (
		<>
			<FooterNav />
			{!isAdminRoute && <SiteHeader />}
			{children}
			{!isAdminRoute && <Footer />}
		</>
	)
}

export default HeaderFooter
