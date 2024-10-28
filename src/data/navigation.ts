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

const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Online booking',
	},
	{
		id: ncNanoId(),
		href: '/home-2',
		name: 'Real estate',
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/home-3',
		name: 'Home 3',
		isNew: true,
	},
]

const otherPageChildMenus: NavItemType[] = [
	{ id: ncNanoId(), href: '/add-listing/1' as Route, name: '+ Add listing' },
	{ id: ncNanoId(), href: '/blog', name: 'Blog page' },
	{ id: ncNanoId(), href: '/blog/single' as Route, name: 'Blog single' },
	{ id: ncNanoId(), href: '/about', name: 'About' },
	{ id: ncNanoId(), href: '/contact', name: 'Contact us' },
	{ id: ncNanoId(), href: '/login', name: 'Login' },
	{ id: ncNanoId(), href: '/signup', name: 'Signup' },
]

const templatesChildrenMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/add-listing/1' as Route,
		name: '+ Add listing',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/add-listing/1' as Route,
				name: 'Add listing 1',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/2' as Route,
				name: 'Add listing 2',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/3' as Route,
				name: 'Add listing 3',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/4' as Route,
				name: 'Add listing 4',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/5' as Route,
				name: 'Add listing 5',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/6' as Route,
				name: 'Add listing 6',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/7' as Route,
				name: 'Add listing 7',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/8' as Route,
				name: 'Add listing 8',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/9' as Route,
				name: 'Add listing 9',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/10' as Route,
				name: 'Add listing 10',
			},
		],
	},
	//
	{ id: ncNanoId(), href: '/checkout', name: 'Checkout' },
	{ id: ncNanoId(), href: '/pay-done', name: 'Pay done' },
	//
	{ id: ncNanoId(), href: '/author', name: 'Author page' },
	{ id: ncNanoId(), href: '/account', name: 'Account page' },
	//
	{
		id: ncNanoId(),
		href: '/subscription',
		name: 'Subscription',
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
		href: '/',
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

export const NAVIGATION_DEMO_2: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		type: 'dropdown',
		children: demoChildMenus,
		isNew: true,
	},

	//
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Listing pages',
		children: [
			{ id: ncNanoId(), href: '/listing-stay', name: 'Stay listings' },
			{
				id: ncNanoId(),
				href: '/listing-stay-map',
				name: 'Stay listings (map)',
			},
			{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Stay detail' },

			//
			{
				id: ncNanoId(),
				href: '/listing-experiences',
				name: 'Experiences listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-experiences-map',
				name: 'Experiences (map)',
			},
			{
				id: ncNanoId(),
				href: '/listing-experiences-detail',
				name: 'Experiences detail',
			},
		],
	},
	{
		id: ncNanoId(),
		href: '/listing-car',
		name: 'Listing pages',
		children: [
			{ id: ncNanoId(), href: '/listing-car', name: 'Cars listings' },
			{ id: ncNanoId(), href: '/listing-car-map', name: 'Cars listings (map)' },
			{ id: ncNanoId(), href: '/listing-car-detail', name: 'Car detail' },

			//
			{
				id: ncNanoId(),
				href: '/listing-real-estate',
				name: 'Real estate listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-real-estate-map',
				name: 'Real estate (map)',
			},
			//
			{
				id: ncNanoId(),
				href: '/listing-flights',
				name: 'Flights listings',
			},
		],
	},

	//
	{
		id: ncNanoId(),
		href: '/author',
		name: 'Templates',
		type: 'dropdown',
		children: templatesChildrenMenus,
	},

	//
	{
		id: ncNanoId(),
		href: '/blog',
		name: 'Other pages',
		type: 'dropdown',
		children: otherPageChildMenus,
	},
]
