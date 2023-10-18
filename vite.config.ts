import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Ai-mrk/",
  
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const moduleName = id.toString().split('node_modules/')[1].split('/')[0].toString();
            switch (moduleName) {
              case '@uiw':
              case '@use-gesture':
              case 'axios':
              case 'email-validator':
              case 'framer-motion':
              case 'react':
              case 'react-dom':
              case 'react-markdown':
              case 'react-syntax-highlighter':
              case 'subject-extractor':
              case 'typewriter-effect':
                return moduleName;
            }
          }
        }
      }
    }
  }
});
