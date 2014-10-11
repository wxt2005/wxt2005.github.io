---
layout: post
title:  "line-height数值 vs 百分比"
date:   2014-04-03 12:31:12 +0800
categories: 前端学习
tags: CSS HTML
---
这两天在啃《CSS权威指南（第三版）》，读到`line-height`的部分有点迷糊，于是在网上翻了点资料，在此整理下思路。

<!-- more -->

#属性

[W3school](http://www.w3school.com.cn)上对[line-height属性](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp)只有一句话的解释：

> line-height 属性设置行间的距离（行高）。

看似简单明了，但其实这个属性有很多猫腻。本文先不涉及`line-height`的显示机理，来看看这个属性可以取什么值吧。

|值|描述|
|:------:|------|
|normal|默认。设置合理的行间距。|
|number|设置数字，此数字会与当前的字体尺寸相乘来设置行间距。|
|length|设置固定的行间距。|
|%|基于当前字体尺寸的百分比行间距。|
|inherit|规定应该从父元素继承 line-height 属性的值。|

一个个说过来：

* normal：这是默认值，一般等于 _1.2_ （依用户代理不同可能取 _1.0～1.2_ ），所以实质上就是number
* number：这个数字的意思就是倍数，如果元素的`font-size`是 _16px_ ，`line-height`取 _1.5_ ，那么就等于 _16px X 1.5 =24px_ 
* lengh：直接定义一个单位数值，比如 _20px_ ， _2cm_ 。注意取 _em_ 单位时，其实也相当于下面提到的%。
* % 如果元素的`font-size`是 _16px_ ，`line-height`取 _150%_ ，那么就等于 _16px X 150% = 24px_ 。没错，看起来似乎和number没多大区别
* inherit：直接继承父元素的`line-height`值

于是问题的关键就出在number和百分数上了，把问题具体一点， _1.5_ 和 _150%_ 有什么区别？
这就得做测试了。（以下测试均在Safari 7.0.3上进行）

#测试

先从单独的`p`元素开始测试（不涉及继承）。

##测试一：父元素 line-height: 150% ，无子元素

```html
<p style="font-size: 16px; line-height: 150%; background-color: gray; color: white;">
I'm so happy, that I've found you.
</p>
```

效果如下：

<p style="font-size: 16px; line-height: 150%; background-color: gray; color: white;">
I'm so happy, that I've found you.
</p>

##测试二：父元素 line-height: 1.5 ，无子元素

```html
<p style="font-size: 16px; line-height: 1.5; background-color: gray; color: white;">
I'm so happy, that I've found you.
</p>
```
效果如下：

<p style="font-size: 16px; line-height: 1.5; background-color: gray; color: white;">
I'm so happy, that I've found you.
</p>

如预想的一样，测试一和二没有区别！`p`元素的行高均为 _24px_ 。但是等等，如果我们在`p`中再内联一个`font-size`不同的`span`元素呢？

##测试三：父元素 line-height: 150% ，子元素 line-height 继承

```html
<p style="font-size: 16px; line-height: 150%; background-color: gray; color: white;">
I'm so <span style="font-size: 32px; color: red;">happy</span>, that I've found you.
</p>
```
效果如下：

<p style="font-size: 16px; line-height: 150%; background-color: gray; color: white;">
I'm so <span style="font-size: 32px; color: red;">happy</span>, that I've found you.
</p>

看起来行高有点不够happy啊…… 我们用网页检查器看一下，`span`元素的`line-height`还是只有 _24px_ 。
why? 按理说应该是 _32px X 150% = 48px_ 啊？这中间一定有什么误会，但容我们先放一放，先来看看下一个测试。

##测试四：父元素 line-height: 1.5 ，子元素 line-height 继承

```html
<p style="font-size: 16px; line-height: 1.5; background-color: gray; color: white;">
I'm so <span style="font-size: 32px; color: red;">happy</span>, that I've found you.
</p>
```
效果如下：

<p style="font-size: 16px; line-height: 1.5; background-color: gray; color: white;">
I'm so <span style="font-size: 32px; color: red;">happy</span>, that I've found you.
</p>

hmm... 可以很明显看出`p`元素被`span`撑高了，再来看一看`span`的行高，这次终于是 _48px_ 了。

##测试五：父元素 line-height: 150% ，子元素 line-height 150%

```html
<p style="font-size: 16px; line-height: 150%; background-color: gray; color: white;">
I'm so <span style="font-size: 32px; color: red; line-height: 150%;">happy</span>
, that I've found you.
</p>
```
效果如下：

<p style="font-size: 16px; line-height: 150%; background-color: gray; color: white;">
I'm so <span style="font-size: 32px; color: red; line-height: 150%;">happy</span>
, that I've found you.
</p>

哦，这次也正常了。这么说只要显式声明了`line-height`的值，就能得到我们想要的结果。

#解决

综合上面五个测试的结果，我们很容易发现问题就出在继承上。哪里和我们预想的不一样？

**对于`line-height`属性来说，如果使用百分数（或者em单位)，子元素继承的是父元素的计算值，而非声明值！**

测试三中，`p`元素的`line-height`声明值为 _150%_ ，计算值为 _16px X 150% = 24px_ 。接下来`span`元素继承了计算值 _24px_ ！

而在测试四中，`p`元素的`line-height`声明值为 _1.5_ ，计算值为 _16px X 1.5 = 24px_ 。但因为 _1.5_ 并非百分数而是一个绝对值，所以`span`元素继承了声明值 _1.5_ ，并把它和本身的`font-size`进行计算，也就是 _32px X 1.5 = 48px_ 。

这样看起来要解决这个问题的方法只有两个：

1. 在每个子元素中显式声明`line-height`值
2. 在父元素中对`line-height`值使用绝对值

方法一实在太麻烦了，因此该选哪边一目了然。

参考：[Line Height (中文版)](http://www.slideshare.net/daemao/line-height-2470819)