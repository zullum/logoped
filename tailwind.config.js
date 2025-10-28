/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#4A90E2', // Main brand color
          600: '#3A7BC8',
          700: '#2A66AE',
          800: '#1E4A7A',
          900: '#0D2847',
        },
        sunshine: {
          50: '#FFFBF0',
          500: '#FFD166', // Yellow
          600: '#F4C430',
        },
        grass: {
          50: '#E8FFF5',
          500: '#06D6A0', // Green
          600: '#05C090',
        },
        coral: {
          50: '#FFF0F3',
          500: '#EF476F', // Pink
          600: '#D63F63',
        },
        lavender: {
          50: '#F5F3F7',
          500: '#9B89B3', // Purple
          600: '#8A79A2',
        },
        background: {
          light: '#F7F9FC',
          white: '#FFFFFF',
        },
        text: {
          dark: '#2D3748',
          medium: '#4A5568',
          light: '#718096',
        },
        success: '#48BB78',
        warning: '#F6AD55',
        error: '#FC8181',
      },
      fontFamily: {
        'quicksand-light': ['Quicksand_300Light'],
        'quicksand-regular': ['Quicksand_400Regular'],
        'quicksand-medium': ['Quicksand_500Medium'],
        'quicksand-semibold': ['Quicksand_600SemiBold'],
        'quicksand-bold': ['Quicksand_700Bold'],
        'nunito-regular': ['Nunito_400Regular'],
        'nunito-semibold': ['Nunito_600SemiBold'],
        'nunito-bold': ['Nunito_700Bold'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
