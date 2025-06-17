import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        move1: {
          '0%': { transform: 'translate(0vw, 0vh)' },
          '25%': { transform: 'translate(80vw, 10vh)' },
          '50%': { transform: 'translate(80vw, 70vh)' },
          '75%': { transform: 'translate(0vw, 90vh)' },
          '100%': { transform: 'translate(0vw, 0vh)' },
        },
        move2: {
          '0%': { transform: 'translate(20vw, 20vh)' },
          '25%': { transform: 'translate(60vw, 20vh)' },
          '50%': { transform: 'translate(60vw, 80vh)' },
          '75%': { transform: 'translate(10vw, 80vh)' },
          '100%': { transform: 'translate(20vw, 20vh)' },
        },
        move3: {
          '0%': { transform: 'translate(50vw, 10vh)' },
          '25%': { transform: 'translate(90vw, 30vh)' },
          '50%': { transform: 'translate(90vw, 90vh)' },
          '75%': { transform: 'translate(40vw, 90vh)' },
          '100%': { transform: 'translate(50vw, 10vh)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        move1: 'move1 20s infinite linear',
        move2: 'move2 15s infinite linear',
        move3: 'move3 10s infinite linear',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        slideInTop: 'slideInTop 0.5s ease-out',
        slideInBottom: 'slideInBottom 0.5s ease-out',
        technologies: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [scrollbarHide],
};
