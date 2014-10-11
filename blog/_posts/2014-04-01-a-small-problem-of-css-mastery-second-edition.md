---
layout: post
title:  "《精通CSS》（第二版）中的一个小问题"
date:   2014-04-01 21:34:47 +0800
categories: 前端学习
tags: CSS
---
这两天在啃《精通CSS》（第二版），还是学到不少东西。但是今天看到第十章的实例时，发现一点小问题。

<!-- more -->

#问题
这行代码出自中文版217页，示例代码`screen.css`的第20行：

```css
background: url(../img/bg-dark.jpg) repeat-x top center, url(../img/bg-light.jpg) repeat-x 239px left;
```

按理说支持css多重背景的浏览器（比如我用的Safari 7）可以显示上面两个图片的叠加，可是我愣是没发现有什么区别，在Safari的网页检查器里一看，这行规则根本没有被应用！
这是为什么呢？
#原因
问题就出在最后的`239px left`上。
`239px`是一个像素单位，而`left`是CSS中的关键字，书中57页提到过：

>规范指出，不用将像素或百分数等单位与关键字混合使用……混合使用单位和关键字在某些浏览器上会导致错误，而且很可能使CSS失效。因此，最好不要混合使用单位和关键字。

不知为何，在第十章的实例中作者自己打破了这条规则，兴许是因为当年的Safari对这点还没有这么严格，作者自己也没发现。
知道了原因，解决方法就很简单了。

#解决
将CSS规则中的关键字改为像素值，注意先X后Y的顺序。

```css
background: url(../img/bg-dark.jpg) repeat-x top center, url(../img/bg-light.jpg) repeat-x 0px 239px;
```