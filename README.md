## vue-vant-base基于vant搭建的一个移动端基础框架
1. 增加开发环境下vConsole移动端调试工具，可以显示console.log的内容以及接口请求情况  
2. 生产环境启用cdn加速，提升页面访问速度 (可在config -> cdn.js里开启和关闭)  
3. 增加eslint代码检测，可在.eslintrc.js文件查看具体配置要求，可在vscode编辑器配置ctrl+s 自动修复代码提示的格式不正确问题   
4. 路由采用懒加载，并且增加vue-navigation插件(比keep-alive功能更强大),页面路由回退不刷新，前进刷新  
5. 组件采用批量注册，只需在base文件(放置基础组件)，components文件(放置公共业务组件)下直接写组件即可，使用时无需在页面再次引用，可直接使用组件
6. utils文件放置一些工具函数，例如dingding.js里面是钉钉相关的api   
7. 配置了开发环境和生产环境的配置文件 .env.dev(开发环境下url等全局变量的配置).env.prod(生产即正式环境下url等全局变量的配置), 使用npm run buildDev命令打测试包，使用npm run buildProd命令打正式包

 
