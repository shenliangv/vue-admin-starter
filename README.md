# Vue 单页应用模板

<!-- TOC -->

- [目录结构](#目录结构)
- [相关命令](#相关命令)
- [编码规范](#编码规范)
- [Git 规范](#git-规范)
- [参考](#参考)

<!-- /TOC -->

### 目录结构

### 相关命令

```sh
# 提交代码
npm run commit

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
```

### 编码规范

- [HTML](./docs/code-style-guide/html.md)
- [CSS](./docs/code-style-guide/css.md)
- [JavaScript](./docs/code-style-guide/javascript.md)
- [TypeScript](./docs/code-style-guide/typescript.md)
- [Vue](./docs/code-style-guide/vue.md)

### Git 规范

- 使用 `npm run commit` 命令提交代码，基于 [angular 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，提交时会自动进行校验， commit 信息不符合要求将导致提交失败
- master 分支、dev 分支为保护分支，只能通过 pull request 更新代码，开发环境、测试环境发布使用 dev 分支代码构建，生产环境使用 master 分支代码构建
- 每次迭代上线之后，在最后一个 `commit` 上添加 `tag` 作为版本号

### 参考

样式和布局参考了 [Ant Design Pro](https://preview.pro.ant.design/dashboard/analysis)
