
# HTML编码规范

<!-- TOC -->

- [强制](#强制)
- [建议](#建议)

<!-- /TOC -->

## 强制

#### 【强制】同一页面，应避免使用相同的 `name` 与 `id`

#### 【强制】JavaScript 应当放在页面末尾，或采用异步加载

解释：将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守

```html
<body>
  <!-- a lot of elements -->
  <script src="init-behavior.js"></script>
</body>
```

## 建议

#### 【建议】在 `html` 标签上设置正确的 `lang` 属性

解释：有助于提高页面的可访问性，如：让语音合成工具确定应该采用的发音，让翻译工具确定翻译语言等

```html
<html lang="zh-CN">
```

#### 【建议】在能实现 UI 效果的前提下，尽量减少标签数量

```html
<!-- bad -->
<div class="avatar">
  <img src="...">
</div>

<!-- good -->
<img class="avatar" src="...">
```

#### 【建议】将标签按照逻辑区块分组，分组之间空一行，更易阅读

```html
<template>
  <div class="toolbar">
    <com-search class="toolbar__item" />

    <!-- 如有必要可加上注释，说明该区块的用途 -->
    <el-badge class="toolbar__item toolbar__message">
      ...
    </el-badge>

    <el-dropdown
      class="toolbar__item toolbar__user"
      trigger="hover"
      :show-timeout="62"
      @command="onCommand"
    >
      ...
    </el-dropdown>
  </div>
</template>
```

#### 【建议】`class` 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名

```html
<!-- bad -->
<div class="left"></div>

<!-- good -->
<div class="sidebar"></div>

<!-- bad -->
<span class="red"></span>

<!-- good -->
<span class="author"></span>
```

#### 【建议】`id`、`class` 命名，在避免冲突并描述清楚的前提下尽可能短

```html
<!-- bad -->
<div id="navigation"></div>

<!-- good -->
<div id="nav"></div>

<!-- bad -->
<p class="com"></p>

<!-- good -->
<p class="comment"></p>
```

#### 【建议】HTML 标签的使用应该遵循标签的语义

```html
<!-- bad -->
<div>Esprima serves as an important <span class="strong">building block</span> for some JavaScript language tools.</div>

<!-- good -->
<p>Esprima serves as an important <strong>building block</strong> for some JavaScript language tools.</p>
```

#### 【建议】自定义属性以 data- 为前缀。使用前缀有助于区分自定义属性和标准定义的属性

```html
<ul>
  <li data-uuid="xxx"></li>
  <li data-uuid="xxx"></li>
  <li data-uuid="xxx"></li>
</ul>
```

#### 【建议】保证 `favicon` 可访问

解释：在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 favicon.ico 。为了保证favicon可访问，避免404，必须遵循以下两种方法之一：

1. 在 Web Server 根目录放置 favicon.ico 文件
2. 使用 link 指定 favicon

```html
<link rel="shortcut icon" href="path/to/favicon.ico">
```

#### 【建议】在针对移动设备开发的页面时，根据内容类型指定输入框的 `type` 属性

解释：根据内容类型指定输入框类型，能获得更友好的输入体验

```html
<input type="tel">
```
