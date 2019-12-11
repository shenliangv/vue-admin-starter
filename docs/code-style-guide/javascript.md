
# JavaScript 编码规范

<!-- TOC -->

- [强制](#强制)
- [建议](#建议)

<!-- /TOC -->

## 强制

#### 【强制】默认用 `const` 申明变量，申明后会重新赋值的变量用 `let`，没有使用 `ES6+` 的项目用 `var`

#### 【强制】`JavaScript` 变量命名需遵守以下规则

- 标准变量采用驼峰式命名（后台返回的 json 数据除外）
- 常量全大写，用下划线连接
- 构造函数、类、枚举变量，大写第一个字母
- jquery对象必须以'$'开头命名

```js
let normalVariableName

const MAX_COUNT = 10

function Person(name) {
  this.name = name
}

class Person {}

// bad
const body = $('body')

// good
const $body = $('body')
```

#### 【强制】由多个单词组成的缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致

```js
// bad
function XmlParser() {
}

// good
function XMLParser() {
}

// bad
function insertHtml(element, html) {
}

// good
function insertHTML(element, html) {
}
```

#### 【强制】构造函数名/类名使用名词

```js
function Person() {}

class Person {}
```

#### 【强制】禁止在 `Array`、 `Date` 等内置类型的原型上添加或修改方法

```js
// bad
Date.prototype.format = function(d) {
  // ...
}
```

#### 【强制】禁止修改构造函数的原型指向（定义类型的时候除外）

解释：修改构造函数的原型指向，会导致已经申明的实例无法访问新的原型对象

```js
function Person() {}

Person.prototype = { foo: 'foo' }

const person1 = new Person()

console.log(person1.foo) // 'foo'

// bad
Person.prototype = { bar: 'bar' }
console.log(person1.foo) // 'foo'
console.log(person1.bar) // undefined 无法访问到新的原型对象

// good
Person.prototype.bar = 'bar'
console.log(person1.foo) // 'foo'
console.log(person1.bar) // 'bar'
```

#### 【强制】对上下文 `this` 的引用只能使用 `that` 来命名

```js
function Person() {
  // bad
  const me = this

  // bad
  const _this = this

  // bad
  const self = this

  // good
  const that = this
}
```

#### 【强制】lodash 的所有方法都要按需引入，减小包体积

```js
`import cloneDeep from 'lodash/cloneDeep'`
```

#### 【强制】有时我们会使用一些特殊标记进行说明。特殊标记必须使用单行注释的形式。下面列举了一些常用标记

解释：

- TODO: 有功能待实现。此时需要对将要实现的功能进行简单说明
- FIXME: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明
- HACK: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述
- XXX: 该处存在陷阱。此时需要对陷阱进行描述

## 建议

#### 【建议】返回值为 `boolean` 类型的变量或函数，命名以 `is`、 `has`、`can` 等开头

```ts
const isReady = false

function hasAuth(auth: string | string[]): boolean {
  // ...
}
```

#### 【建议】在适当的位置加上空行，更易阅读

- 变量声明后（当变量声明在代码块的最后一行时，则无需空行）
- 注释前（当注释在代码块的第一行时，则无需空行）
- 代码块后
- 不同行为或逻辑的语句集之间
  
```js
// 变量声明之后空一行
let x = 1
const PI = 3.14

// 代码块之后空一行
for (let i = 0; i < 2; i++) {
  if (true) {
      return false
  }

  continue
}

let a = 0

// 注释前空一行
a++
```

#### 【建议】一个函数的参数控制在 3 个以内，超过 3 个参数使用 `Object` 形式传入
