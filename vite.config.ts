import * as path from 'path'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Injection from 'vite-plugin-injection'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue(),
      VueJsx(),
      Unocss(),
      Injection(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
        ],
        dts: 'src/auto-import.d.ts',
        dirs: [
          'src/composables/**',
          'src/store/**',
        ],
        vueTemplate: true,
        resolvers: [],
      }),
      Components({
        dts: 'src/components.d.ts',
        resolvers: [],
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 9041, // game of life -> 9 04 1
    },
    build: {
      // 浏览器兼容性
      target: 'es2015',
      assetsDir: 'assets',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  })
}
