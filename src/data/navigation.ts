import { MegamenuItem, NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'
import { Route } from '@/routers/types'
import __megamenu from './jsons/__megamenu.json'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
const megaMenuDemo: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: businessBayImg,
		title: 'Business Bay',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.BusinessBay,
		})),
	},
	{
		id: ncNanoId(),
		image: MarinaImg,
		title: 'Marina',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Marina,
		})),
	},
	{
		id: ncNanoId(),
		image: donwtownImg,
		title: 'Downtown',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Downtown,
		})),
	},
	{
		id: ncNanoId(),
		image: JVCImg,
		title: 'Jumeriah Village Circle',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Jumeriah_Village_Circle,
		})),
	},
	{
		id: ncNanoId(),
		image: JLTImg,
		title: 'Jumeriah Lake Triangle',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Jumeriah_Lake_Triangle,
		})),
	},
]

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '#',
		name: 'Popular Area',
		type: 'megaMenu',
		megaMenu: megaMenuDemo,
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'About & Services',
	},
	{
		id: ncNanoId(),
		href: '/contact',
		name: 'Contact',
	},
	{
		id: ncNanoId(),
		href: '/BecomeHost',
		name: 'Become a Host',
	},
]
