import ts from '@rollup/plugin-typescript'
import commonJs from '@rollup/plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

// 一段自定义的内容，以下内容会添加到打包结果中
// banner: 块内头部  footer: 块内尾部
// intro: 块外头部  outtro: 块外尾部
const intro = `
/* 
 * author: lzh
 * time: ${new Date().toLocaleDateString()}
*/
`
const footer = `
if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '${pkg.version}'
}`

export default {
  input: 'src/main.ts',
  output: [
    {
      intro,
      file: pkg.main,
      format: 'cjs',
      footer,
    },
    {
      intro,
      file: pkg.module,
      format: 'esm',
      footer,
    },
    {
      intro,  
      file: pkg.browser,
      format: 'umd',
      name: 'Dry',
      footer,
    },
    {
      intro,
      file: pkg.iife,
      format: 'iife',
      footer
    }
  ],
  plugins: [
    resolve(),
    commonJs(),
    ts()
  ]
}