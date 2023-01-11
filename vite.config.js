import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[name]',
        }),
    ],
    resolve: {
        // 软连接
        alias: {
            '@': path.join(__dirname, 'src'),
        },
        // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
    },
    server: {
        // 代理配置
        proxy: {
            // 指定代理的请求
            // pexel
            '/api': {
                target: 'https://api.pexels.com/v1/',
                //跨域
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/mapi': {
                target: 'https://api.imooc-front.lgdsunday.club/api/',
                //跨域
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/mapi/, ''),
            },
            // unsplash
            '/upapi': {
                target: 'https://api.unsplash.com/',
                //跨域
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/upapi/, ''),
            },
        },
    },
});
