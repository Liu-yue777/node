// 开发模式webpack配置文件
let path = require('path')
let EslintWebpackPlugin = require('eslint-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  // // 配置入口文件 (单页面配置)
  // entry: './src/index.js',

  // 配置入口文件（多页面配置）
  entry: {
    // 一个页面对应一个入口文件
    'index': './src/index.js',
    'login': './src/login.js',
    'register': './src/register.js',
    'player-list': './src/player-list.js',
    'player-add': './src/player-add.js',
  },


  // 配置输出的目录和文件名
  output: {
    path: undefined,// 开发模式不生成实际文件
    // filename: 'main.js' // 设置打包后的文件名
    // 多页面配置，文件名不能写死
    filename: './js/[name]-[hash:5].js'
  },

  // 配置加载器
  module: {
    rules: [
      // 配置loader
      {
        // 告诉webpack处理到.css文件时，使用use中的loader处理
        test: /\.css$/,
        // 使用use中的loader从右到左执行
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 告诉webpack处理到.less文件时，使用use中的loader处理
        test: /\.less$/,
        // 使用use中的loader从右到左执行
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 告诉webpack处理到jpg jpeg png gif文件时
        test: /\.(jpe?g|png|gif)/,
        // 资源模块类型
        type: 'asset', // 使用file-loader和url-loader
        generator: {
          // 打包后图片的存储路径和文件名称
          // [hash:8] 文件名为8位哈希值
          // [ext] 使用文件原来的后缀名
          filename: './imgs/[hash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            // 设置当打包的图片小于指定的值时，编译成base64编码
            // 小于10kb的图片编译成base64编码
            // 好处：减少服务器请求次数
            // 坏处：base64编码后比原来的文件体积稍大一些
            maxSize: 10 * 1024
          }
        }
      },
      {
        // 匹配到指定的资源时，使用下面的配置处理
        test: /\.(eot|ttf|woff2?|svg)$/,
        // 资源模块类型
        type: 'asset/resource',// 相当于使用了file-loader
        generator: {
          // 设置打包后的存储目录和文件名
          filename: './fonts/[hash:5][ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,// 排除这个目录不使用babel编译
      }
    ]
  },

  // 配置插件
  plugins: [
    // 配置plugin
    // 使用new调用插件，生成一个实例对象，放在数组中
    new webpack.DefinePlugin({
      // __WEBPACK__ENV: '"dev"'
      __WEBPACK__ENV: JSON.stringify('dev')
      // 可以在业务代码中使用__WEBPACK__ENV全局变量
      // 在webpack打包业务代码时，会将__WEBPACK__ENV变量替换为'dev'字符串
    }),
    new webpack.ProvidePlugin({
      // 自动加载jquery模块
      // 在其他模块中直接使用$或jquery
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new EslintWebpackPlugin({// ESlint插件配置
      // 指定检查src目录中的js文件
      context: path.join(__dirname, 'src'),
      // 排除某些目录不检查
      exclude: path.join(__dirname, 'src/js/lib')
    }),
    new HtmlWebpackPlugin({// html插件配置
      // 指定 ./public/index.html 该文件作为模板打包
      // 打包出来的html有两个特点：
      // 1.内容和模板文件一样
      // 2.自动引入打包生成的js资源
      template: path.join(__dirname, 'public/index.html'),
      // 设置打包后html的存储路径(在dist中的路径)和文件名
      filename: './index.html',
      chunks: ['index']  //使用对应的入口资源
    }),
    new HtmlWebpackPlugin({// html插件配置
      // 指定 ./public/login.html 该文件作为模板打包
      // 打包出来的html有两个特点：
      // 1.内容和模板文件一样
      // 2.自动引入打包生成的js资源
      template: path.join(__dirname, 'public/login.html'),
      // 设置打包后html的存储路径(在dist中的路径)和文件名
      filename: './login.html',
      chunks: ['login']  //使用对应的入口资源
    }),
    new HtmlWebpackPlugin({// html插件配置
      // 指定 ./public/register.html 该文件作为模板打包
      // 打包出来的html有两个特点：
      // 1.内容和模板文件一样
      // 2.自动引入打包生成的js资源
      template: path.join(__dirname, 'public/register.html'),
      // 设置打包后html的存储路径(在dist中的路径)和文件名
      filename: './register.html',
      chunks: ['register']  //使用对应的入口资源
    }),
    new HtmlWebpackPlugin({// html插件配置
      // 指定 ./public/player-list.html 该文件作为模板打包
      // 打包出来的html有两个特点：
      // 1.内容和模板文件一样
      // 2.自动引入打包生成的js资源
      template: path.join(__dirname, 'public/player-list.html'),
      // 设置打包后html的存储路径(在dist中的路径)和文件名
      filename: './player-list.html',
      chunks: ['player-list']  //使用对应的入口资源
    }),
    new HtmlWebpackPlugin({// html插件配置
      // 指定 ./public/player-add.html 该文件作为模板打包
      // 打包出来的html有两个特点：
      // 1.内容和模板文件一样
      // 2.自动引入打包生成的js资源
      template: path.join(__dirname, 'public/player-add.html'),
      // 设置打包后html的存储路径(在dist中的路径)和文件名
      filename: './player-add.html',
      chunks: ['player-add']  //使用对应的入口资源
    }),
  ],

  // 开发服务器配置
  devServer: {
    host: 'localhost',// 服务器主机 域名/ip
    port: 8090,// 服务端口号
    open: true,// 自动打开默认浏览器
    hot: true,// 开启模块热替换（自动刷新）

    // 请求 http://localhost:5566/api/user/test1 时，
    // 开发服务器代理转发到 http://localhost:8080/user/test1
    proxy: {
      '/api': {
        // 目标代理地址
        target: 'http://localhost:8080',
        // 重新请求路径，将请求地址中开头为 '/api' 的标识重写为 ''
        pathRewrite: { '^/api': '' },
        // 修改请求头中的host地址（浏览器不会显示）
        changeOrigin: true
      }
    }
  },

  // 配置模式
  mode: 'development' // 开发模式
}

