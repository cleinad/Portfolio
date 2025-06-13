import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        parallax: {
          '0%': { transform: 'translateY(0)', backgroundPosition: '0 0' },
          '100%': { transform: 'translateY(-100%)', backgroundPosition: '0 1000px' },
        }
      },
      animation: {
        'parallax': 'parallax 20s linear infinite',
      }
    },
  },
  plugins: [],
}

export default config 