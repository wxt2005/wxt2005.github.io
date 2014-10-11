---
layout: post
title:  "利用CSS在链接后加一个小图标"
date:   2014-03-30 14:10:14 +0800
categories: 前端学习
tags: CSS
---
有时候需要在link后面加一个小图标，就像下图所示，该怎么办呢？

![链接后的图标](http://i1266.photobucket.com/albums/jj540/wxt2005/icon-after-link.png)

<!-- more -->

#解决
第一反应是在`<a>`标签内加一个`<img>`标签，试试看吧。

##方案一

```html
<a href="#">TEST<img src="images/icon.gif" alt="icon"></a>
```

```css
a {
    text-decoration: none;
}
```

示意一下，就不做装饰了。
看起来似乎很完美，简洁明了，但这样不就等于在html中添加了无意义的标签吗？而且每个link都要加这么一个`<img>`标签真是非常麻烦。有更好的解决方案吗？
有，css的```background-image```。

##方案二

```html
<a href="#">TEST</a>
```

注意这里把`<img>`标签去掉了。

```css
a {
    background: url(images/icon.gif) center right no-repeat;
    padding-right: 30px; /*根据你的icon大小确定*/
    text-decoration: none;
}
```

也可以达成与方案一同样的效果，而且只要在css里定义即可，既干净又省力。

