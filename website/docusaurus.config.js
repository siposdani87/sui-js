// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const prism = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SUI-JS',
  tagline: 'Lightweight Frontend Framework in TypeScript',
  url: 'https://sui-js.siposdani87.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'siposdani87', // Usually your GitHub org/user name.
  projectName: 'sui-js', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      // Plugin / TypeDoc options
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: '.',
        readme: 'none',
        excludePrivate: true,
        excludeProtected: false,
        excludeExternals: true,
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**', '/blog/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // AI-friendly metadata
      metadata: [
        {name: 'keywords', content: 'typescript, framework, frontend, ui, components, material-design, web-framework, spa, single-page-application'},
        {name: 'description', content: 'SUI-JS is a lightweight frontend framework written in TypeScript with 60+ UI components, Material Design styling, and comprehensive API'},
        {name: 'og:type', content: 'website'},
        {name: 'og:image', content: 'https://sui-js.siposdani87.com/img/sui-js-og.png'},
        {name: 'og:description', content: 'Lightweight frontend framework in TypeScript with Material Design components'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:creator', content: '@siposdani87'},
        {name: 'robots', content: 'index, follow'},
        {name: 'author', content: 'Dániel Sipos'},
      ],
      navbar: {
        title: 'SUI-JS',
        logo: {
          alt: 'SUI-JS Logo',
          src: 'img/android-chrome-192x192.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/siposdani87/sui-js',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'ReadMe',
                to: '/docs',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'x.com/siposdani87',
                href: 'https://x.com/siposdani87',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/siposdani87/sui-js',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} siposdani87, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prism.themes.github,
        darkTheme: prism.themes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        appId: 'EE0OFT8MSU',
        apiKey: '13d2ca1739f797a942f36b15a31d36b6',
        indexName: 'sui-js',
        // Optional: see doc section below
        contextualSearch: true
      }
    }),
};

module.exports = config;
