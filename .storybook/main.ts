import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async config => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../src', import.meta.url)),
          '@styles': fileURLToPath(new URL('../src/styles', import.meta.url)),
          '@utils': fileURLToPath(new URL('../src/utils', import.meta.url)),
          '@assets': fileURLToPath(new URL('../src/assets', import.meta.url)),
          '@pages': fileURLToPath(new URL('../src/components/pages', import.meta.url)),
          '@layouts': fileURLToPath(new URL('../src/components/layouts', import.meta.url)),
          '@features': fileURLToPath(new URL('../src/features', import.meta.url)),
        },
      },
      define: {
        ...config.define,
        'process.env.APP_STORE_URL': JSON.stringify(process.env.APP_STORE_URL),
        'process.env.GOOGLE_PLAY_URL': JSON.stringify(process.env.GOOGLE_PLAY_URL),
      },
    });
  },
};
export default config;
