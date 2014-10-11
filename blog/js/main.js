$(function() {
    var $header = $('header');
    var $mainNav = $header.find('.main-nav');
    var $mainDropButtons = $mainNav.find('.drop').children('a');
    var $miniNav = $header.find('.mini-nav');
    var $miniDropButtons = $miniNav.find('.drop').children('a');
    var $dropMenus = $mainNav.find('.drop-menu');
    var i = 0, l = 0;

    // 用于切换下拉菜单的激活状态
    function toggleActive($targetNode, $allNodes) {
        if ($targetNode.hasClass('active')) {
            $targetNode.removeClass('active');
        } else {
            $allNodes.removeClass('active');
            $targetNode.addClass('active');
        }
    }

    // 主导航下拉菜单事件
    $mainDropButtons.click(function(event) {
        var $subMenu = $(this).next();
        toggleActive($subMenu, $dropMenus);
        return false;
    });

    // mini导航下拉菜单事件
    $miniDropButtons.click(function(event) {
        var $target = $(event.target);
        var $searchMenu = $mainNav.find('.search');
        var $tagMenu = $mainNav.find('.tag .drop-menu');
        var $cateMenu = $mainNav.find('.category .drop-menu');
        var $menus = $dropMenus.add($searchMenu);

        if ($target.parent().hasClass('search')) {
            toggleActive($searchMenu, $menus);
        } else if ($target.parent().hasClass('tag')) {
            toggleActive($tagMenu, $menus);
        } else if ($target.parent().hasClass('category')) {
            toggleActive($cateMenu, $menus);
        }
        return false;
    });

    // 点击页面任意位置隐藏导航菜单
    $(document).click(function(event) {
        if ($dropMenus.has($(event.target)).length <= 0) {
            $dropMenus.removeClass('active');
        }
    });

    // 阻止所有已禁用按钮的事件
    $('.disabled').click(function() {
        return false;
    })

    // 为pre元素加入line-numbers类
    $('pre').addClass('line-numbers')
        //.find('.language-html').removeClass('language-html').addClass('language-markup');
});