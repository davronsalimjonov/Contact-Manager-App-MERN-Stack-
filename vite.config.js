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
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
          // State management
          'vendor-state': ['react-redux', '@reduxjs/toolkit', 'redux', 'redux-persist'],
          // UI libraries
          'vendor-ui': ['antd', 'react-select', 'react-avatar', 'react-beautiful-dnd', 'react-paginate'],
          // Forms and validation
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'yup', 'react-input-mask', 'react-phone-number-input'],
          // Charts and media
          'vendor-media': ['chart.js', 'react-chartjs-2', 'wavesurfer.js', '@wavesurfer/react'],
          // Date handling
          'vendor-date': ['dayjs', 'react-datepicker', 'react-big-calendar'],
          // Network and API
          'vendor-network': ['axios', 'react-query', 'socket.io-client']
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