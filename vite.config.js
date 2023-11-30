import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/general-template',
    plugins: [react()],
    server: {
        proxy: {
            '/user-admin': {
                target: 'http://192.168.32.63',
                changeOrigin: true
            },
            '/lampblack-portal': {
                target: 'https://lampblack.lewinsmarteye.com:61000',
                changeOrigin: true
            },
            '/apk': {
                target: 'http://localhost:13160',
                changeOrigin: true
            }
        }
    }
})
