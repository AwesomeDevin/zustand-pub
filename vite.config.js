const _path = require('path')
import commonjs from '@rollup/plugin-commonjs';

export default {
  // 配置选项
  build: {
    lib: {
      entry: [_path.resolve(__dirname, './src/index.ts')], // 设置入口文件
      name: 'zustand-pub', // 起个名字，安装、引入用
      formats: ['es','cjs']
      // fileName: (format) => `nf-tool.${format}.js` // 打包后的文件名
    },
    // sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['zustand','zustand-vue','zustand/vanilla'],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //   }
      // }
    }
  },
  plugins: [commonjs()]
}