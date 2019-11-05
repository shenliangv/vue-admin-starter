# Vue 项目模板

## 规范

### 使用 `npm run commit` 提交代码

解释：git 提交基于 [angular 的 commit 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，提交时会自动进行校验， commit 信息不符合要求将导致提交失败。如遇到特殊情况，才可使用 `git commit` 命令进行提交，但仍然会对 commit 信息进行校验

### lodash 的所有方法都要按需引入，减小包体积

例子：`import cloneDeep from 'lodash/cloneDeep'`

## 相关命令

```sh
# 启动
npm run dev

# 打包
npm run build

# 单元测试
npm run test:unit

# 端到端测试
npm run test:e2e

# 代码格式校验
npm run lint

# 提交代码
npm run commit
```

## 自定义配置

[配置文档](https://cli.vuejs.org/config/)
