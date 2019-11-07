# Vue 单页应用模板

<!-- TOC -->

- [目录结构](#目录结构)
- [打包环境](#打包环境)
- [相关命令](#相关命令)
- [开发规范](#开发规范)
- [自定义配置](#自定义配置)
- [参考](#参考)

<!-- /TOC -->

### 目录结构

### 打包环境

由 `process.env.VUE_APP_BUILD_ENV` 决定打什么环境的包，有三种可能值：

- `dev` 开发环境
- `test` 测试环境
- `prod` 生产环境

不同环境的 API URL 不同

### 相关命令

```sh
# 启动
npm run dev

# 打开发包
npm run build:dev

# 打测试包
npm run build:test

# 打生产包
npm run build:prod

# 打生产包并生成包分析报表
npm run build:report

# 单元测试
npm run test:unit

# 端到端测试
npm run test:e2e

# 代码格式校验
npm run lint

# 提交代码
npm run commit
```

### 开发规范

#### CSS

遵循 [BEM](http://getbem.com/) 命名规范，可参考 [element-ui](https://element.eleme.cn/#/zh-CN/component/installation) 的 `class` 命名

```css
.block {}

.block--modifier {}

.block__element {}

.block__element--modifier {}
```

#### TypeScript

- 需要暴露给外部使用的类型，统一在 src/types 目录中定义
- 多使用自定义类型，尽量避免使用 `any`，没有自定义类型的 TypeScript 毫无意义
- 先引入模块，中间空一行，再引入类型
- 没有返回值的函数不要显式标明返回值为 `void`

#### Vue

- 标签先写静态属性，再写动态属性
- 实例选项、选项中的方法之间空一行
- 事件处理器命名一律以 on 开头

  ```vue
  <com-search class="toolbar_search" :on-search="onSearch" />

  // ...

  methods: {
    onSearch(keyword: string) {
      console.log('onsearch', keyword)
    }
  }
  ```

#### lodash

- 优先级：js 内置方法 > lodash > 自己写的方法
- lodash 的所有方法都要按需引入，减小包体积

  ```js
  `import cloneDeep from 'lodash/cloneDeep'`
  ```

#### 代码提交

- 使用 `npm run commit` 命令提交代码，基于 [angular 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，提交时会自动进行校验， commit 信息不符合要求将导致提交失败
- 每次迭代上线之后，在最后一个 `commit` 上添加 `tag` 作为版本号
- master 分支、dev 分支为保护分支，只能通过 pull request 更新代码，测试环境打包使用 dev 分支代码，生产环境打包使用 master 分支代码

### 自定义配置

[配置文档](https://cli.vuejs.org/config/)

### 参考

样式和布局参考了 [Ant Design Pro](https://preview.pro.ant.design/dashboard/analysis)
