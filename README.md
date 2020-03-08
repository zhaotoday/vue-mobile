## 关于

#### 是什么

We Design 框架为微信小程序开发而生，帮助开发团队降低开发和维护成本。

#### 依赖框架

Uni App 框架。

#### 技术栈

Vue、Vuex、ES6、Sass、PostCSS 等。

#### 开发工具

HBuildX IDE。

## 使用

#### 命令

```bash
# 安装
$ npm install we-design --save

# 格式化代码
$ npm run format

# 校验代码
$ npm run lint
```

#### 开发与构建

请参考 HBuild X 的使用。

#### 目录规范

```
|- assets               待编译的静态资源
|  |- images            图片（必须小于 40K）
|     |- components     组件图片
|        |- icon        icon 组件图片
|  |- styles            样式
|     |- global         全局样式
|     |- utils          Sass 工具
|        |- variables   Sass 变量
|
|- components           组件
|  |- icon              icon 组件
|     |- index.vue      icon 组件模板
|     |- script.js      icon 组件脚本
|     |- style.scss     icon 组件样式
|
|- mixins               混合
|
|- models               模型
|  |- public            前端模型
|     |- wx-users       微信用户模型
|  |- wx                微信端模型
|     |- wx-users       微信用户模型
|
|- pages                页面
|  |- home              主页
|     |- index.vue      主页模板
|     |- script.js      主页脚本
|     |- style.scss     主页样式
|
|- plugins              插件
|
|- static               无需编译的静态资源
|  |- images            图片
|
|- store                Vuex 状态管理
|  |- modules           Vuex 状态管理模块拆分
|     |- public         前端状态管理
|        |- wx-users    微信用户状态管理
|     |- wx             微信端状态管理
|        |- wx-users    微信用户状态管理
|
|- utils                工具
```

#### 定义 Sass 变量

```scss
// CDN
$cdn: "http://localhost:88";

// CDN 版本号
$cdn-version: 0.1;

// 图片地址
$image-url: "~@/assets/images/components";

// 颜色
$colors: (
  c11: white,
  c12: black,
  ...
);

// button
$button-widths: 680px, 84px;
```

#### 覆盖 We Design 组件默认的图片资源

请参考 We Design 图片目录结构，将图片放置在 assets/images/components/ 目录下。
> 注：需要修改 Sass 变量，指向对应目录：$image-url: "~@/assets/images/components";

#### 链接

- [Uni App 官网](https://uniapp.dcloud.io/)
- [HBuild X 下载](https://www.dcloud.io/hbuilderx.html)
