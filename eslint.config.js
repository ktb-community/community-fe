import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { parser } from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      languageOptions: {
        globals: globals.browser,
        parser,
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  ...pluginJs.configs.recommended,
  ...pluginReact.configs['flat/recommended'],
};