
# Vue 编码规范

<!-- TOC -->

- [强制](#强制)
- [建议](#建议)

<!-- /TOC -->

## 强制

#### 【强制】禁止使用 `this.$parent`

解释：使用 `this.$parent` 会造成子组件跟父组件深度耦合，不利于组件的复用

#### 【强制】禁止修改 `props` 传递过来的引用类型值

解释：修改引用类型的 `props` 属性值会破坏单向数据流，容易造成隐蔽的 bug

#### 【强制】除了组件私有状态之外，所有状态都由 `Vuex` 管理

解释：将组件 data 中的状态移到 store 中进行管理，状态变化时可以减少组件不必要的渲染，也方便集中管理状态

#### 【强制】`Vuex` `module` 总是使用命名空间

#### 【强制】为 `v-for` 设置键值

解释：在组件上总是必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。尽量不要用 `index` 值作为 `key` 值

#### 【强制】永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上

解释：

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表
- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`, `ol`)

```html
<!-- bad -->
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

<!-- good -->
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

<!-- bad -->
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

<!-- good -->
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

#### 【强制】为组件样式设置作用域

解释：对于应用来说，顶级 `App` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的

```html
<style type="scss" scoped>
/* ... */
</style>
```

#### 【强制】使用私有属性名

解释：使用模块作用域保持不允许外部访问的函数的私有性。如果无法做到这一点，就始终为插件、混入等不考虑作为对外公共 API 的自定义私有属性使用 `$_` 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 `$_yourPluginName_`)

```js
const myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```

#### 【强制】单文件组件的文件名始终是横线连接 (kebab-case)

```txt
components/
|- my-component.vue
```

#### 【强制】应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以 `base-` 前缀开头

```txt
components/
|- base-button.vue
|- base-table.vue
|- base-icon.vue
```

#### 【强制】和父组件紧密耦合的子组件应该以父组件名作为前缀命名

解释：如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起

```txt
# bad
components/
|- Todo-list.vue
|- Todo-item.vue
|- Todo-button.vue

# good
components/
|- Todo-list.vue
|- Todo-list-item.vue
|- Todo-list-item-button.vue
```

#### 【强制】JS/JSX 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用 Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串

```js
// bad
import myComponent from './MyComponent.vue'

// good
import MyComponent from './MyComponent.vue'

// bad
export default {
  name: 'myComponent',
  // ...
}

// good
export default {
  name: 'MyComponent',
  // ...
}
```

#### 【强制】组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法

```html
<!-- bad -->
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}

<!-- good -->
{{ normalizedFullName }}
```

```js
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

## 建议

#### 【建议】事件处理函数以 `on` 开头

```html
<el-autocomplete @keydown.enter.native="onSearch" @select="onSelect">
  <template v-slot:prefix>
    <i class="el-icon-search" @click="onToggleInputVisible"></i>
  </template>
</el-autocomplete>
```

#### 【建议】标签属性书写顺序：静态属性、指令、动态属性、事件监听

```html
<el-dropdown
  class="toolbar__item"
  trigger="hover"
  v-if="dropdownVisible"
  :show-timeout="62"
  @command="onCommand"
>
...
</el-dropdown>
```

#### 【建议】Vue 实例 options 对象的一级、二级属性之间插入空行，提高可读性

```ts
export default Vue.extend({
  components: { ComSearch, headerMessage },

  // 一级属性之间插入空行
  props: {
    foo: { type: String, default: 'foo' },

    // 二级属性之间插入空行
    bar: { type: Boolean, default: true }
  },

  data() {
    return {
      foo: 'foo',
      bar: 'bar'
      // ...
    }
  },

  methods: {
    onCommand() {},

    search() {},

    logout() {}
  }
})
```

#### 【建议】路由跳转时，在 `beforeRouterEnter` 中调接口请求数据或者使用骨架屏技术

解释：避免出现白屏影响用户体验

#### 【建议】组件/实例的选项应该有统一的顺序

1. **副作用** (触发组件外的影响)

- `el`

2. **全局感知** (要求组件以外的知识)

- `name`
- `parent`

3. **组件类型** (更改组件的类型)

- `functional`

4. **模板修改器** (改变模板的编译方式)

- `delimiters`
- `comments`

5. **模板依赖** (模板内使用的资源)

- `components`
- `directives`
- `filters`

6. **组合** (向选项里合并属性)

- `extends`
- `mixins`

7. **接口** (组件的接口)

- `inheritAttrs`
- `model`
- `props`/`propsData`

8. **本地状态** (本地的响应式属性)

- `data`
- `computed`

9. **事件** (通过响应式事件触发的回调)

- `watch`
- 生命周期钩子 (按照它们被调用的顺序)
  - `beforeCreate`
  - `created`
  - `beforeMount`
  - `mounted`
  - `beforeUpdate`
  - `updated`
  - `activated`
  - `deactivated`
  - `beforeDestroy`
  - `destroyed`

10. **非响应式的属性** (不依赖响应系统的实例属性)

- `methods`

11. **渲染** (组件输出的声明式描述)

- `template`/`render`
- `renderError`
