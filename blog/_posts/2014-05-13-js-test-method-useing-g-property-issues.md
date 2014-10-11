---
layout: post
title:  "JS正则test方法中使用“g”属性产生的问题"
date:   2014-05-13 09:36:05 +0800
categories: 前端学习
tags: Javascript 正则
---
在Javascript中正则对象的`test`是一个很好用的方法，可以直接判断出对象字符串中是否含有所需的内容，并返回一个布尔值。

<!-- more -->

但是最近在[Codewars](http://www.codewars.com/r/qHYW2A/)中做到一道题，要求找出如下代码中的Bug：

```javascript
// TITLES is a preloaded array of String to search throught

function search(searchTerm) {
  var search = new RegExp(searchTerm, 'gi');
  
  return TITLES.filter(function(title) {
    return search.test(title);
  });
}
```

题目链接：[Breaking search bad](http://www.codewars.com/kata/52cd53948d673a6e66000576/javascript)

我横看竖看也没找到问题在哪里，但就是死活通不过测试，怎么办？翻了一下《Javascript语言精粹（修订版）》，发现P88写着这么一句：

> 不要对这个（test）方法使用g标识。

于是我把代码中的`g`删除，果然成功。

但是为什么呢？

#解决

放狗搜了一会，原来是`lastIndex`这个属性在捣鬼。`test`方法会使用`lastIndex`属性的值作为查找的起始位置，正常情况下每次查找完成后`lastIndex`应该重置为`0`，但在使用`g`（全局匹配）模式的时候，如果返回结果为`true`，那这个值就变成了上一次找到的字符串的位置。那很显然，下一次就找不到了！

用代码来举个例子：

```javascript
var str = "bla233";
var re = /bla/gi; //使用全局模式

console.log(re.test(str)); //true
console.log(re.lastIndex); //3
console.log(re.test(str)); //false
console.log(re.lastIndex); //0
console.log(re.test(str)); //true
console.log(re.lastIndex); //3
```

看，问题就很明显了。解决方法也很简单，有两种：

1. 不要在`test`方法种使用`g`全局模式。
2. 手动重置`lastIndex`属性为`0`。

第一种方法已经确认有效，我们来试一下第二种：

```javascript
var str = "bla233";
var re = /bla/gi; //使用全局模式

console.log(re.test(str)); //true
re.lastIndex = 0
console.log(re.test(str)); //true
```

OK，结案。