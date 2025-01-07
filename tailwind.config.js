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
      colors: {
        'dk-default': '#2c2c2c',
        'dk-text': '#cccccc'
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
  darkMode: 'media'
};
