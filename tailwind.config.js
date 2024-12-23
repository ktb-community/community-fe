import daisyui from 'daisyui';

export default {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'bg': 'background-color',
        'text': 'color'
      },
      colors: {
        background: '#f2f2f2',
      },
    },
    screens: {
      ss: '480px',
      sm: '620px',
      sl: '768px',
      md: '1060px',
      lg: '1200px',
    },
  },
  plugins: [daisyui],
  darkMode: 'class'
};
