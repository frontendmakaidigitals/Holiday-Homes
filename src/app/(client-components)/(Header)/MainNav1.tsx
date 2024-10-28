import React, { FC } from 'react'
import Logo from '@/shared/Logo'
import Navigation from '@/shared/Navigation/Navigation'
import SearchDropdown from './SearchDropdown'
import ButtonPrimary from '@/shared/ButtonPrimary'
import MenuBar from '@/shared/MenuBar'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import HeroSearchForm2MobileFactory from '../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory'
import LangDropdown from './LangDropdown'

export interface MainNav1Props {
	className?: string
}

const MainNav1: FC<MainNav1Props> = ({ className = '' }) => {
	return (
		<div className={`nc-MainNav1 relative z-10 hidden xl:flex ${className}`}>
			<div className="relative flex h-20 justify-between px-4 lg:container">
				<div className="hidden flex-1 justify-start space-x-4 sm:space-x-10 md:flex">
					<Logo className="!w-28 self-center" />
					<Navigation />
				</div>

				<div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="hidden space-x-0.5 xl:flex">
						<div className="px-1" />
						<ButtonPrimary className="self-center" href="/Get-Estimate">
							Get Estimate
						</ButtonPrimary>
					</div>

					<div className="flex items-center xl:hidden">
						<div className="px-0.5" />
						<MenuBar />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainNav1
