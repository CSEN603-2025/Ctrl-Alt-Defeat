import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'metallica-blue-50': '#F0F9FB',
        'metallica-blue-100': '#D9F0F4',
        'metallica-blue-200': '#B8E1E9',
        'metallica-blue-300': '#86CBDA',
        'metallica-blue-400': '#5DB2C7',
        'metallica-blue-500': '#318FA8',
        'metallica-blue-600': '#2D758D',
        'metallica-blue-700': '#2A5F74',
        'metallica-blue-800': '#2A5060',
        'metallica-blue-900': '#274353',
        'metallica-blue-950': '#152B37',
        'metallica-blue-off-charts': '#4C798B',

        'apple-gray-50': '#F9F9F9',
        'apple-gray-100': '#F3F3F3',
        'apple-gray-200': '#E5E5E5',
        'apple-gray-300': '#D4D4D4',
        'apple-gray-400': '#A3A3A3',
        'apple-gray-500': '#737373',
        'apple-gray-600': '#525252',
        'apple-gray-700': '#404040',
        'apple-gray-800': '#262626',
        'apple-gray-900': '#171717',

        'apple-blue-50': '#EFF6FF',
        'apple-blue-100': '#DBEAFE',
        'apple-blue-200': '#BFDBFE',
        'apple-blue-300': '#93C5FD',
        'apple-blue-400': '#60A5FA',
        'apple-blue-500': '#3B82F6',
        'apple-blue-600': '#0055CC',
        'apple-blue-700': '#1D4ED8',
        'apple-blue-800': '#1E40AF',
        'apple-blue-900': '#1E3A8A',
      },
      boxShadow: {
        'apple': '0 0 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 0 2px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 0 2px rgba(0, 0, 0, 0.08), 0 16px 24px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'apple': '0.75rem',
      },
      fontFamily: {
        'apple': ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
    },
  },
  plugins: [],
}
export default config