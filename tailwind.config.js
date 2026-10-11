/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#140206',
          900: '#23040A',
          800: '#3D0A14',
          700: '#520E1C',
          600: '#6D1627',
          500: '#8A1F33',
        },
        gold: {
          50: '#FDFBF0',
          100: '#FAF4D8',
          200: '#F5E6A7',
          300: '#EDD374',
          400: '#E2BF48',
          500: '#D4A429',
          600: '#B8861E',
          700: '#946618',
          800: '#6E4815',
          900: '#4A2F0F',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FDFBF7',
          200: '#FAF6EE',
          300: '#F5EFEB',
          400: '#EDE4DC',
          500: '#DFD2C4',
        },
        roseGold: {
          400: '#E4A49B',
          500: '#C97D73',
          600: '#A85D54',
        },
        emeraldDeep: {
          800: '#113328',
          900: '#0B221B',
        }
      },
      fontFamily: {
        royal: ['"Cinzel Decorative"', '"Cinzel"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Noto Color Emoji"', 'serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Noto Color Emoji"', 'serif'],
        sanskrit: ['"Rozha One"', '"Gotu"', '"Yatra One"', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Noto Color Emoji"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-metallic': 'linear-gradient(135deg, #ECC872 0%, #D4AF37 25%, #FFF0BD 50%, #AA8232 75%, #D4AF37 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(255,240,189,0.6), transparent)',
        'maroon-radial': 'radial-gradient(ellipse at center, #4A0E17 0%, #2A050B 60%, #150205 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FAF6EE 0%, #F5EFEB 50%, #FAF6EE 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 60px rgba(212, 175, 55, 0.45)',
        'gold-inner': 'inset 0 0 20px rgba(212, 175, 55, 0.25)',
        'royal-card': '0 20px 50px rgba(35, 4, 10, 0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinSlowReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: 0.9, transform: 'scaleY(1)' },
          '25%': { opacity: 0.75, transform: 'scaleY(0.95) scaleX(1.03)' },
          '50%': { opacity: 1, transform: 'scaleY(1.08) scaleX(0.97)' },
          '75%': { opacity: 0.85, transform: 'scaleY(0.98)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        diyaBreath: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px #FF9933) drop-shadow(0 0 20px #FFCC00)' },
          '50%': { filter: 'drop-shadow(0 0 14px #FF6600) drop-shadow(0 0 35px #FFD700)' },
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-mandala': 'spinSlow 60s linear infinite',
        'spin-mandala-rev': 'spinSlowReverse 45s linear infinite',
        'flame-flicker': 'flicker 1.8s ease-in-out infinite',
        'shimmer-slide': 'shimmer 2.5s infinite linear',
        'diya-glow': 'diyaBreath 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
