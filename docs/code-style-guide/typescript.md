
# TypeScript 编码规范

<!-- TOC -->

- [强制](#强制)
- [建议](#建议)

<!-- /TOC -->

## 强制

#### 【强制】需要暴露给外部使用的类型，在统一的目录中定义（如 src/types）

#### 【强制】先写模块导入语句，中间空一行，再写类型导入语句

```ts
// 模块导入
import cloneDeep from 'lodash/cloneDeep'
import routes from '@/router/routes'
import { hasAuth } from '@/utils/auth'

// 类型导入
import { CustomRouteConfig } from '@/types/vendor'
```

#### 【强制】无返回值的函数不要显式标明返回值为 `void`

```ts
// bad
function clearJwt(): void {
  localStorage.removeItem(constants.TOKEN_KEY)
}

// good
function clearJwt() {
  localStorage.removeItem(constants.TOKEN_KEY)
}

```

## 建议

#### 【建议】尽量避免使用 `any`，没有类型的 TypeScript 毫无意义
