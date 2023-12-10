/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'primary-indigo': '#4f46e5',
				'primary-black': '#323232',
				'primary-grey': '#f2f4f8',
				'primary-white': '#fff',
			},
		},
	},
	plugins: [],
}
