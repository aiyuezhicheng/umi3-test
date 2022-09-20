// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   icon: 'dashboard',
    //   routes: [
    //     {
    //       path: '/dashboard',
    //       redirect: '/dashboard/analysis',
    //     },
    //     {
    //       name: 'analysis',
    //       icon: 'smile',
    //       path: '/dashboard/analysis',
    //       component: './dashboard/analysis',
    //     },
    //     {
    //       name: 'monitor',
    //       icon: 'smile',
    //       path: '/dashboard/monitor',
    //       component: './dashboard/monitor',
    //     },
    //     {
    //       name: 'workplace',
    //       icon: 'smile',
    //       path: '/dashboard/workplace',
    //       component: './dashboard/workplace',
    //     },
    //   ],
    // },
    // {
    //   path: '/form',
    //   icon: 'form',
    //   name: 'form',
    //   routes: [
    //     {
    //       path: '/form',
    //       redirect: '/form/basic-form',
    //     },
    //     {
    //       name: 'basic-form',
    //       icon: 'smile',
    //       path: '/form/basic-form',
    //       component: './form/basic-form',
    //     },
    //     {
    //       name: 'step-form',
    //       icon: 'smile',
    //       path: '/form/step-form',
    //       component: './form/step-form',
    //     },
    //     {
    //       name: 'advanced-form',
    //       icon: 'smile',
    //       path: '/form/advanced-form',
    //       component: './form/advanced-form',
    //     },
    //   ],
    // },
    // {
    //   path: '/list',
    //   icon: 'table',
    //   name: 'list',
    //   routes: [
    //     {
    //       path: '/list/search',
    //       name: 'search-list',
    //       component: './list/search',
    //       routes: [
    //         {
    //           path: '/list/search',
    //           redirect: '/list/search/articles',
    //         },
    //         {
    //           name: 'articles',
    //           icon: 'smile',
    //           path: '/list/search/articles',
    //           component: './list/search/articles',
    //         },
    //         {
    //           name: 'projects',
    //           icon: 'smile',
    //           path: '/list/search/projects',
    //           component: './list/search/projects',
    //         },
    //         {
    //           name: 'applications',
    //           icon: 'smile',
    //           path: '/list/search/applications',
    //           component: './list/search/applications',
    //         },
    //       ],
    //     },
    //     {
    //       path: '/list',
    //       redirect: '/list/table-list',
    //     },
    //     {
    //       name: 'table-list',
    //       icon: 'smile',
    //       path: '/list/table-list',
    //       component: './list/table-list',
    //     },
    //     {
    //       name: 'basic-list',
    //       icon: 'smile',
    //       path: '/list/basic-list',
    //       component: './list/basic-list',
    //     },
    //     {
    //       name: 'card-list',
    //       icon: 'smile',
    //       path: '/list/card-list',
    //       component: './list/card-list',
    //     },
    //   ],
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   icon: 'profile',
    //   routes: [
    //     {
    //       path: '/profile',
    //       redirect: '/profile/basic',
    //     },
    //     {
    //       name: 'basic',
    //       icon: 'smile',
    //       path: '/profile/basic',
    //       component: './profile/basic',
    //     },
    //     {
    //       name: 'advanced',
    //       icon: 'smile',
    //       path: '/profile/advanced',
    //       component: './profile/advanced',
    //     },
    //   ],
    // },
    // {
    //   name: 'result',
    //   icon: 'CheckCircleOutlined',
    //   path: '/result',
    //   routes: [
    //     {
    //       path: '/result',
    //       redirect: '/result/success',
    //     },
    //     {
    //       name: 'success',
    //       icon: 'smile',
    //       path: '/result/success',
    //       component: './result/success',
    //     },
    //     {
    //       name: 'fail',
    //       icon: 'smile',
    //       path: '/result/fail',
    //       component: './result/fail',
    //     },
    //   ],
    // },
    // {
    //   name: 'exception',
    //   icon: 'warning',
    //   path: '/exception',
    //   routes: [
    //     {
    //       path: '/exception',
    //       redirect: '/exception/403',
    //     },
    //     {
    //       name: '403',
    //       icon: 'smile',
    //       path: '/exception/403',
    //       component: './exception/403',
    //     },
    //     {
    //       name: '404',
    //       icon: 'smile',
    //       path: '/exception/404',
    //       component: './exception/404',
    //     },
    //     {
    //       name: '500',
    //       icon: 'smile',
    //       path: '/exception/500',
    //       component: './exception/500',
    //     },
    //   ],
    // },
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      hideInMenu:true,
      routes: [
        {
          path: '/account',
          redirect: '/account/center',
        },
        {
          name: 'center',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
        {
          name: 'settings',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },
    // {
    //   name: 'editor',
    //   icon: 'highlight',
    //   path: '/editor',
    //   routes: [
    //     {
    //       path: '/editor',
    //       redirect: '/editor/flow',
    //     },
    //     {
    //       name: 'flow',
    //       icon: 'smile',
    //       path: '/editor/flow',
    //       component: './editor/flow',
    //     },
    //     {
    //       name: 'mind',
    //       icon: 'smile',
    //       path: '/editor/mind',
    //       component: './editor/mind',
    //     },
    //     {
    //       name: 'koni',
    //       icon: 'smile',
    //       path: '/editor/koni',
    //       component: './editor/koni',
    //     },
    //   ],
    // },
    {
      path: '/orgStructure',
      icon: 'table',
      name: 'orgStructure',
      routes: [
        {
          path: '/orgStructure',
          redirect: '/orgStructure/org-unit',
        },
        {
          name: 'org-unit',
          icon: 'smile',
          path: '/orgStructure/org-unit',
          component: './orgStructure/org-unit',
        },
        {
          name: 'post',
          icon: 'smile',
          path: '/orgStructure/post',
          component: './orgStructure/post',
        },
        {
          name: 'business-scope',
          icon: 'smile',
          path: '/orgStructure/business-scope',
          component: './orgStructure/business-scope',
        },
        {
          name: 'user',
          icon: 'smile',
          path: '/orgStructure/user',
          component: './orgStructure/user',
        },
      ],
    },
    {
      path: '/assetManage',
      name: 'assetManage',
      icon: 'dashboard',
      routes: [
        {
          path: '/assetManage',
          redirect: '/assetManage/asset',
        },
        {
          name: 'asset',
          icon: 'smile',
          path: '/assetManage/asset',
          component: './assetManage/asset',
        },
        {
          name: 'asset-type',
          icon: 'smile',
          path: '/assetManage/asset-type',
          component: './assetManage/asset-type',
        },
      ],
    },
    {
      path: '/listManage',
      icon: 'table',
      name: 'listManage',
      routes: [
        {
          path: '/listManage',
          redirect: '/listManage/shift',
        },
        {
          name: 'shift',
          icon: 'smile',
          path: '/listManage/shift',
          component: './listManage/shift',
        },
        {
          name: 'custom-list',
          icon: 'smile',
          path: '/listManage/custom-list',
          component: './listManage/custom-list',
        },
        {
          name: 'exception-level',
          icon: 'smile',
          path: '/listManage/exception-level',
          component: './listManage/exception-level',
        },
        {
          name: 'engineering-unit',
          icon: 'smile',
          path: '/listManage/engineering-unit',
          component: './listManage/engineering-unit',
        },
        {
          name: 'attachment',
          icon: 'smile',
          path: '/listManage/attachment',
          component: './listManage/attachment',
        },
        {
          name: 'global-attribute-template',
          icon: 'smile',
          path: '/listManage/global-attribute-template',
          component: './listManage/global-attribute-template',
        },
      ],
    },
    {
      path: '/businessProcess',
      icon: 'table',
      name: 'businessProcess',
      redirect: '/businessProcess'
    },
    {
      path: '/taskManage',
      icon: 'table',
      name: 'taskManage',
      routes: [
        {
          path: '/taskManage',
          redirect: '/taskManage/taskgroup-template',
        },
        {
          name: 'taskgroup-template',
          icon: 'smile',
          path: '/taskManage/taskgroup-template',
          component: './taskManage/taskgroup-template',
        },
        {
          name: 'task-standards',
          icon: 'smile',
          path: '/taskManage/task-standards',
          component: './taskManage/task-standards',
        },
        {
          name: 'serviceproject-template',
          icon: 'smile',
          path: '/taskManage/serviceproject-template',
          component: './taskManage/serviceproject-template',
        },
      ],
    },
    {
      path: '/system',
      icon: 'table',
      name: 'system',
      routes: [
        {
          path: '/system',
          redirect: '/system/settings',
        },
        {
          name: 'settings',
          icon: 'smile',
          path: '/system/settings',
          component: './system/settings',
        },
        {
          name: 'import-export',
          icon: 'smile',
          path: '/system/import-export',
          component: './system/import-export',
        },
        {
          name: 'log',
          icon: 'smile',
          path: '/system/log',
          component: './system/log',
        },
      ],
    },
    {
      path: '/',
      redirect: '/assetManage/asset-type',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: join(__dirname, 'authApi.json'),
      projectName: 'auth',
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: join(__dirname, 'baseApi.json'),
      projectName: 'base',
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: join(__dirname, 'assetApi.json'),
      projectName: 'asset',
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: join(__dirname, 'orgStructureApi.json'),
      projectName: 'orgStructure',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
