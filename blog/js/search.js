$(function() {
    'use strict'

     /**
     * 用于将数据对象转换为html代码
     * @method buildHtml
     * @param {obj} obj 数据对象
     * @return {string} html字符串
     */
    function buildHtml(obj) {
        var str = '';
        str += '<li><div class="time-stamp"><span class="date">' +
            obj.date + '</span><span class="time">' +
            obj.time + '</span></div><h2><a href="' +
            obj.url + '">' + obj.title + '</a></h2></li>'; 
        return str;
    }

    /**
    * 用于获得所需对象并添加到页面
    * @method getList
    * @param {obj} option 选项对象
    */
    function getList(option) {
        var list = $('.content ul');
        var listTitle = list.prev('h1');
        var flag = option.flag || 'all',
            keyword = option.keyword || '';

        $.getJSON('../json/posts.json', function(json, textStatus) {
                var html = '';

                // 寻找符合的文章
                for (var i = 0, l = json.length; i < l; i++) {
                    if ((flag === 'tag' && json[i].tags.indexOf(keyword) !== -1) ||
                        (flag === 'cat' && json[i].categories.indexOf(keyword) !== -1) ||
                        (flag === 'title' && json[i].title.indexOf(keyword) !== -1) ||
                        flag === 'all') {
                        html += buildHtml(json[i]);
                    }
                }

                // 修改列表标题
                if (flag === 'tag') {
                    listTitle.text('标签: ' + keyword);
                } else if (flag === 'cat') {
                    listTitle.text('分类: ' + keyword);
                } else if (flag === 'title') {
                    listTitle.text('标题: ' + keyword);
                } else {
                    listTitle.text('所有文章');
                }

                // 展示内容
                if (html) {
                    list.append(html);
                } else {
                    list.append('<li>没有您想找的内容</li>');
                }
        });
    }

    /**
     * 从url中获取搜索选项
     * @method getOption
     * @return {obj} 选项对象
     */
    function getOption() {
        var href = window.location.href; 
        var option = {};
        if (href.indexOf('?tag=') !== -1) {
            option.flag = 'tag';
            option.keyword = href.match(/\?tag=(.+)/,'i')[1];
        } else if (href.indexOf('?cat=') !== -1) {
            option.flag = 'cat';
            option.keyword = href.match(/\?cat=(.+)/,'i')[1];
        } else if (href.indexOf('?title=') !== -1) {
            option.flag = 'title';
            option.keyword = href.match(/\?title=(.+)/,'i')[1];
        }
        option.keyword = decodeURI(option.keyword);
        return option;
    }

    getList(getOption());
});