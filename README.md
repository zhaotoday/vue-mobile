## 关于

#### We Design 是什么？

We Design 框架为微信小程序开发而生，帮助开发团队降低开发和维护成本。

#### 依赖框架

Uni App 框架。

#### 技术栈

Vue、Webpack、ES6、Vue Router、Vuex、Sass、PostCSS 等。

#### 开发工具

HBuild X。

## 使用

#### 命令

```bash
# 安装
$ npm install we-design --save

# 格式化代码
$ npm run format

# 代码校验
$ npm run lint
```

#### 开发与构建

请参考 HBuild X 的使用。

#### 目录规范

```
|- assets               未编译的静态资源
|  |- images            图片（必须小于 40K）
|     |- components     组件图片
|        |- icon        icon 组件的图片
|  |- styles            样式
|     |- global         全局样式
|     |- utils          Sass 工具
|        |- variables   Sass 变量
|- components           组件
|- mixins               混合
|- models               模型
|- store                Vuex 状态管理
|- utils                工具






|   |-- index.html                   // 模板文件
|-- src                              // 源码目录
|   |-- components                   // 公共组件
```

#### 链接

- [Uni App 官网](https://uniapp.dcloud.io/)
- [HBuild X 下载](https://www.dcloud.io/hbuilderx.html)
- []
