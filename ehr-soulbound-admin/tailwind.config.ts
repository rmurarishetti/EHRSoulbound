import type { Config } from 'tailwindcss'
import { blackA, violet, mauve } from '@radix-ui/colors';

const config: Config = {
  content: [
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
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif']
      },
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
      }
    },
  },
  plugins: [],
}
export default config
