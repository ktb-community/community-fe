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
        'dk-text': '#cccccc',
      },
      boxShadow: {
        uniform: '0 0 7px rgba(0, 0, 0, 0.5)',
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
  darkMode: 'media',
};
