// 代码检查
module.exports = {
  root: true,
  // 指定脚本运行环境
  env: {
    node: true,
    browser: true,
  },
  // 扩展
  extends: ['eslint:recommended', 'react-app', 'react-app/jest'],
  // parserOptions: {
  //   parser: 'babel-eslint',
  // },
  rules: {
    // Possible Problems eslint:recommended + 11 条
    // https://zh-hans.eslint.org/docs/latest/rules/#possible-problems
    // 数组 api 如无需返回值请考虑使用 .forEach 代替。
    'array-callback-return': 'error',
    // 一次创建所有 Promise，然后使用 Promise.all() 访问结果
    'no-await-in-loop': 'error',
    // 禁止重复模块导入
    'no-duplicate-imports': 'error',
    // 不允许从构造函数返回值
    'no-constructor-return': 'error',
    // 禁止在嵌套块中声明变量或 function
    'no-inner-declarations': 'error',
    // 禁止从 Promise 执行器函数返回值
    'no-promise-executor-return': 'error',
    // 禁止双方完全相同的比较
    'no-self-compare': 'error',
    // 禁止未修改的循环条件
    'no-unmodified-loop-condition': 'error',
    // 禁止在定义变量之前使用变量
    'no-use-before-define': 'error',
    // 禁止因使用 await 或 yield 而导致竞争条件的分配
    'require-atomic-updates': 'error',
    // 除了catch不允许空语句
    'no-empty': ['error', { allowEmptyCatch: true }],
    // 关闭未使用变量
    'no-unused-vars': 'warn',

    // sugestion
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 'off',
    'max-lines': ['warn', 1000],
    'max-lines-per-function': ['warn', 100],
  },
};
