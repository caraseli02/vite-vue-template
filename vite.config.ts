import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import {
  VueRouterAutoImports,
} from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    VueRouter({
      // Folder(s) to scan for vue components and generate routes. Can be a string, or
      // an object, or an array of those.
      routesFolder: 'src/pages',

      // allowed extensions to be considered as routes
      extensions: ['.vue'],

      // list of glob files to exclude from the routes generation
      // e.g. ['**/__*'] will exclude all files starting with `__`
      // e.g. ['**/__*/**/*'] will exclude all files within folders starting with `__`
      // e.g. ['*.component.vue'] will exclude components ending with `.component.vue`
      exclude: [],

      // Path for the generated types. Defaults to `./typed-router.d.ts` if typescript
      // is installed. Can be disabled by passing `false`.
      dts: './typed-router.d.ts',

      // Override the name generation of routes. unplugin-vue-router exports two versions:
      // `getFileBasedRouteName()` (the default) and `getPascalCaseRouteName()`. Import any
      // of them within your `vite.config.ts` file.
      // getRouteName: (routeNode) => myOwnGenerateRouteName(routeNode),

      // Customizes the default langage for `<route>` blocks
      // json5 is just a more permissive version of json
      routeBlockLang: 'json5',

      // Change the import mode of page components. Can be 'async', 'sync', or a function with the following signature:
      // (filepath: string) => 'async' | 'sync'
      importMode: 'async',
    }),
    Vue({
      reactivityTransform: true,
    }),
    Components(),
    AutoImport({
      imports: ['vue', 'vue/macros', '@vueuse/core', VueRouterAutoImports],
      dirs: ['./src/composables'],
      vueTemplate: true,
    }),

  ],
})
