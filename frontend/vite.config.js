import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 폴링 방식 사용 (윈도우에서 효과적)
    },
    hmr: {
      overlay: false, // 오류 오버레이 비활성화
    },
  },
})
