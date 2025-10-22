import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Build optimization
  build: {
    sourcemap: false, // Disable source maps in production for smaller bundle
    minify: 'esbuild', // Faster minification with esbuild
    target: 'esnext', // Modern browsers only

    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk - React core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI Framework chunk - Material-UI
          'mui-core': ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],

          // Toolpad chunk (if used significantly)
          'toolpad': ['@toolpad/core'],
        },
      },
    },

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000, // 1000 KB
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },

  // Path aliases (optional but recommended)
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/assets/components',
      '@pages': '/src/assets/pages',
      '@views': '/src/assets/views',
      '@hooks': '/src/assets/components/MiniDrawer/hooks',
      '@context': '/src/context',
      '@themes': '/src/assets/themes',
    },
  },
})
