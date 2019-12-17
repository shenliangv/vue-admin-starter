
# Git 规范

<!-- TOC -->

- [强制](#强制)

<!-- /TOC -->

## 强制

#### 【强制】利用 `Git Hooks` 在 `commit` 之前对 commit message 进行格式校验

解释：通过命令行工具生成格式化的 commit 信息，并自动对 commit 信息进行格式校验，校验不通过将导致提交失败。参考 [angular 的 commit 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，

```sh
# 安装依赖
npm i -D commitizen cz-conventional-changelog husky lint-staged @commitlint/{cli,config-conventional}
```

```json
// package.json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,vue,ts}": [
      "vue-cli-service lint",
      "git add"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}
```

#### 【强制】master 分支、dev 分支为保护分支，只能通过 pull request 更新代码，开发环境、测试环境发布使用 dev 分支代码构建，生产环境使用 master 分支代码构建

#### 【强制】每次迭代上线之后，在最后一个 `commit` 上添加 `tag` 作为版本号
