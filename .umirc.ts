import { IConfig } from 'umi-types';
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    '@layout-body-background': '#171717',
    '@background-color-base': '#262626',
    '@body-background': '#404041',
    '@layout-sider-background': '#171F22',
    '@component-background': '#1e2025',
    '@layout-header-background': '#171F22',
    '@menu-dark-submenu-bg': '#171F22',
    '@input-bg': '#313133',
    '@btn-default-bg': '#262626',
    '@border-color-base': 'rgba(255, 255, 255, 0.25)',
    '@border-color-split': '#363636',
    '@heading-color': '#E3E3E3',
    '@text-color': '#a1a3af',
    '@text-color-secondary': 'fade(#fff, 65%)',
    '@table-selected-row-bg': '#3a3a3a',
    '@table-expanded-row-bg': '#3b3b3b',
    '@table-header-bg': '#3a3a3b',
    '@table-row-hover-bg': 'rgba(4,5,8,0.7)',
    '@layout-trigger-color': 'fade(#fff, 80%)',
    '@layout-trigger-background': '#313232',
    '@alert-message-color': 'fade(#000, 67%)',
    '@item-hover-bg': "fade(#44b6b8, 20%)",
    '@item-active-bg': "fade(#44b6b8, 40%)",
    '@disabled-color': 'rgba(255, 255, 255, 0.25)',
    '@tag-default-bg': '#262628',
    '@popover-bg': '#262629',
    '@wait-icon-color': 'fade(#fff, 64%)',
    '@background-color-light': "fade(#44b6b8, 40%)",
    '@collapse-header-bg': '#262629',
    '@info-color': '#313133',
    '@primary-color': '#44b6b8',
    '@highlight-color': "red",
    '@warning-color': "red",
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'container-web',
        dll: {
          immer: true,
        },
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('postcss')
      .test(/\.css$/)
      .use('postcss')
      .loader('postcss-loader')
      .options({
        ident: 'postcss',
        plugins: [require('tailwindcss'), require('autoprefixer')],
      });
  },
};

export default config;
