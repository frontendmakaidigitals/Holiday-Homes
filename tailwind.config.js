/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVar}), ${opacityValue})`
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`
		}
		return `rgb(var(${cssVar}))`
	}
}

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: ['class', 'class'],
	theme: {
		container: {
			center: 'true',
			padding: {
				DEFAULT: '1rem',
				'2xl': '128px',
			},
		},
		extend: {
			colors: {
				primary: {
					50: customColors("--c-primary-50"),
					100: customColors("--c-primary-100"),
					200: customColors("--c-primary-200"),
					300: customColors("--c-primary-300"),
					400: customColors("--c-primary-400"),
					500: customColors("--c-primary-500"),
					700: customColors("--c-primary-700"),
					800: customColors("--c-primary-800"),
					900: customColors("--c-primary-900"),
					6000: customColors("--c-primary-600"),
				},
				secondary: {
					50: customColors("--c-secondary-50"),
					100: customColors("--c-secondary-100"),
					200: customColors("--c-secondary-200"),
					300: customColors("--c-secondary-300"),
					400: customColors("--c-secondary-400"),
					500: customColors("--c-secondary-500"),
					700: customColors("--c-secondary-700"),
					800: customColors("--c-secondary-800"),
					900: customColors("--c-secondary-900"),
					6000: customColors("--c-secondary-600"),
				},
				neutral: {
					50: 'customColors("--c-neutral-50")',
					100: 'customColors("--c-neutral-100")',
					200: '#E5E7EB',
					300: 'customColors("--c-neutral-300")',
					400: 'customColors("--c-neutral-400")',
					500: 'customColors("--c-neutral-500")',
					700: 'customColors("--c-neutral-700")',
					800: 'customColors("--c-neutral-800")',
					900: 'customColors("--c-neutral-900")',
					6000: 'customColors("--c-neutral-600")',
				},
			},
			screens: {
				sm: '576px',
				md: '768px',
				lg: '992px',
				xl: '1200px',
				xxl: '1400px',
				xxxl: '1800px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-animate'),
	],
}
