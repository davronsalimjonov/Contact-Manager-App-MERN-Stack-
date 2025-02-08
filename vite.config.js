import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';
import manifest from './manifest'

const manifestForPwa = {
  registerType: 'autoUpdate',
  strategies: 'generateSW',
  includeAssests: ['/favicon/favicon.ico', "/favicon/apple-touc-icon.png",],
  manifest,
  workbox: {
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MiB
  }
}

export default defineConfig({
  plugins: [react(), compression(), VitePWA(manifestForPwa)],
  server: { host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    minify: 'esbuild',
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /node_modules\/react-avatar\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
            }))
          },
        },
      ],
    },
    include: ['react-avatar'],
    exclude: ['js-big-decimal']
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: 'path',
        replacement: 'path-browserify'
      },
      {
        find: /^core-js-pure\/stable\/(.*)/,
        replacement: 'core-js-pure/es/$1'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})