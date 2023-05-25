import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import qiankun from 'vite-plugin-qiankun';
import fs from 'fs';
const { name } = require('./package');
const entryHtml = fs.readFileSync("./index.html", { encoding: "utf-8" });
// useDevMode 开启时与热更新插件冲突,使用变量切换
const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // 本地代理处理
    server: {
      port: 3001,
      cors: {       // 允许子应用跨域
        exposedHeaders: [
          'Access-Control-Allow-Origin: *',
        ],
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // white: '#333',
            // 'component-background': '#777',
            // 'primary-color': '#1DA57A',
            // 'link-color': '#1DA57A',
            // 'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      }
    },
    plugins: [
      react(),
      qiankun(name, {
        useDevMode
      }),
      // buildHtmlMeta(mode)
    ],
    resolve: {
      // 路径别名配置
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    // 打包配置处理
    build: {
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true
      //   }
      // },
      target: 'esnext',
      // lib: {
      //   name,
      //   entry: resolve(__dirname, './src/main.tsx'),
      //   formats: ['umd'],
      // },
      // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
      // rollupOptions: {
      //   output: {
      //     //静态资源分类打包
      //     chunkFileNames: 'static/js/[name]-[hash].js',
      //     entryFileNames: 'static/js/[name]-[hash].js',
      //     assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      //     manualChunks(id) {
      //       //静态资源分拆打包
      //       if (id.includes('node_modules')) {
      //         if (id.includes('react/')) {
      //           console.log(id, id.toString().split('node_modules/')[1].split('/')[0].toString())
      //         }
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //       }
      //     }
      //     // inlineDynamicImports: true,
      //   }
      // }
    }
  };
})
