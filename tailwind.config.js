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
				'primary-purple': '#00cc66',
				'primary-blue': '#00bfff',
				'primary-red': '#ff0000',
				'primary-yellow': '#ffff00',
				'primary-orange': '#ffa500',
				'primary-purple': '#AF9BB6',
				'primary-black': '#323232',
				'primary-grey': '#f2f4f8',
				'primary-white': '#fff',
			},
		},
	},
	plugins: [],
}
