# 项目说明文档

- 技术栈
1. 前端：jQuery + Bootstrap + axios
2. 后端：nodejs + express + mongodb
3. 工程化工具：webpack

- 项目结构
+ project
    + admin-client 前端项目
        + node_modules/ 依赖包
        + package.json 依赖包记录/项目信息
        + public/ 静态html页面
        + src/ 项目源代码
            + css/
            + less/
            + imgs/
            + js/
            + fonts/
            + index.js 首页入口文件
            + food-list.js 菜品列表页入口文件
            + food-add.js 添加菜品页入口文件
            + 。。。
        + eslintrc.js ESlint配置文件
        + babel.config.js Babel配置文件
        + webpack.dev.js 开发模式配置
        + webpack.prod.js 生产模式配置
        + 。。。
    + admin-server 后端项目
    + README.md 项目说明
