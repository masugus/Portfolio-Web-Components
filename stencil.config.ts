import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { JsonDocs } from '@stencil/core/internal';

export const config: Config = {
  namespace: 'portfolio-web-components',
  plugins: [sass()],
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    transform: {
      '.+\\.(svg)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
      '^.+\\.(svg)$': 'jest-transform-stub',
    },
  },
  devServer: {
    startupTimeout: 100000,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'custom-elements.json', dest: 'custom-elements.json' },
        { src: 'components/layout/**/*.stories.mdx', dest: 'stories/layout' },
        { src: 'components/atoms/**/*.stories.mdx', dest: 'stories/atoms' },
        { src: 'components/molecules/**/*.stories.mdx', dest: 'stories/molecules' },
        { src: 'components/organisms/**/*.stories.mdx', dest: 'stories/organisms' },
        { src: 'components/templates/**/*.stories.mdx', dest: 'stories/templates' },
      ],
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  enableCache: true,
};
