
# CSS 编码规范

<!-- TOC -->

- [强制](#强制)
- [建议](#建议)

<!-- /TOC -->

## 强制

#### 【强制】只使用 `SASS/SCSS` 这一种 `CSS` 预处理器，禁止多种预处理器混用

#### 【强制】遵循 [BEM](http://getbem.com/) 命名规范，可参考 [element-ui](https://element.eleme.cn/#/zh-CN/component/installation) 的 `class` 命名

- `class` 使用小写字母、`id` 采用驼峰式命名

```scss
.block {}

.block--modifier {}

.block__element {}

.block__element--modifier {}
```

## 建议

#### 【建议】同一 rule set 下的属性在书写时，应按功能进行分组，分组之间空一行，并以 Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果） 的顺序书写，以提高代码的可读性

解释：

Formatting Model 相关属性包括：`position / top / right / bottom / left / float / display / overflow` 等  
Box Model 相关属性包括：`border / margin / padding / width / height` 等  
Typographic 相关属性包括：`font / line-height / text-align / word-wrap` 等  
Visual 相关属性包括：`background / color / transition / list-style` 等  
另外，如果包含 `content` 属性，应放在最前面

```scss
.sidebar {
  /* formatting model: positioning schemes / offsets / z-indexes / display / ...  */
  position: absolute;
  top: 50px;
  left: 0;
  overflow-x: hidden;

  /* box model: sizes / margins / paddings / borders / ...  */
  width: 200px;
  padding: 5px;
  border: 1px solid #ddd;

  /* typographic: font / aligns / text styles / ... */
  font-size: 14px;
  line-height: 20px;

  /* visual: colors / shadows / gradients / ... */
  color: #333;
  background: #f5f5f5;
  transition: color 1s;
}
```

#### 【建议】尽量不使用 !important 声明

#### 【建议】将 z-index 进行分层，对文档流外定位元素的视觉层级关系进行管理

解释：局部区域可以使用 1-9 的 `z-index` 值来控制层级关系，99、999、9999 可以作为几个大的层级来使用
