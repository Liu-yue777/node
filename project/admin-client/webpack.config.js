// webpack配置文件(默认配置)
let path = require('path')
let EslintWebpackPlugin = require('eslint-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 配置入口文件
  entry: './src/index.js',

  // 配置输出的目录和文件名
  output: {
    path: path.join(__dirname, 'dist'), //设置打包后的文件的存储路径（绝对路径）
    filename: 'main.js'  //设置打包后的文件名
  },

  // 配置加载器
  module: {
    rules: [
      //配置loader
      {
        // 告诉webpack处理到.css文件时，使用use中的loader处理
        test: /\.css$/,
        // 使用use中的loader从右到左执行
        use: ['style-loader', 'css-loader']
      },
      {
        // 告诉webpack处理到.less文件时，使用use中的loader处理
        test: /\.less$/,
        // 使用use中的loader从右到左执行
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 告诉webpack处理到JPG jpeg png gif文件时
        test: /\.(jpe?g|png|gif)/,
        type: 'asset', //使用file-loader和url-loader
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
        // 配置图标资源
        test: /\.(eot|ttf|woff2?|svg)/,
        // 资源模块类型
        type: 'asset/resource',  //相当于使用了file-loader
        generator: {
          // 设置打包后的存储目录和文件名
          filename: './fonts/[hash:6][ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,// 排除这个目录不使用babel编译
        //     options: {// 这些配置推荐在配置文件中写
        //         presets: ['@babel/preset-env']
        //     }
      }
    ]
  },

  // 配置插件
  plugins: [
    // 配置plugin
    // 使用new调用插件，生成一个实例对象，放在数组中
    new EslintWebpackPlugin({
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
      // 设置打包后html的存储路径（在dist中的路径）和文件名
      filename: './index.html'
    })
  ],

  

  // 配置模式
  mode: 'development'  //开发模式
}