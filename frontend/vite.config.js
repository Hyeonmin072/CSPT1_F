import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    fastRefresh: true,
  }),],
  server: {
    watch: {
      usePolling: true, // 폴링 방식 사용 (윈도우에서 효과적)
    },
    hmr: {
      overlay: true, // 오류 오버레이 비활성화
    },
    
  },
  define: {
    'process.env': {}  // 여기서 process.env를 정의
  }
})
