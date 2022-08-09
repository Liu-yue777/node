// ESlint配置
module.exports = {
  // 解析选项
  "parserOptions": {
    ecmaVersion: 6, //ES版本
    sourceType:"module",//ES模块
  },

  // 继承ESlint推荐的规则（自定义的规则可以覆盖继承的规则）
  "extends":"eslint:recommended",

  //具体语法检查规则
  // 'off'或 0 关闭规则
  // 'warn' 或 1 开启规则，警告级别（不会终止程序）
  // 'error' 或 2 开启规则，报错级别（会终止程序） 
  "rules":{
    "semi":["error","never"],//不使用分号结尾
    "space-infix-ops":2, //操作符前后必须有空格
    "no-console":0, //关闭禁用console语句
    "no-undef":0,
    "no-multi-spaces":"error", //禁止多个空格
  }
}