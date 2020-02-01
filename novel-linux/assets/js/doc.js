'use strict';

$(document).ready(function() {
    var pageMenu = document.getElementById('page-menu');
    var activeMenu = $('#page-menu>.active');
    
    var pageContentContainer = document.getElementById('page-content-container');
    var pageContentColumn = $('#page-content-col');

    var isPhoneOrTablet; //是手机或者平板
    var pageMenuPosition = $(pageMenu).css('position');

    // 对于md, lg类型，设置菜单定位为fixed
    function windowOnSize() {
        isPhoneOrTablet = ($(window).width() <= 991);
        console.log('isPhoneOrTablet: ' + isPhoneOrTablet);
        if (!isPhoneOrTablet) {
            $(pageMenu).css('position', 'fixed');
        } else {
            $(pageMenu).css('position', pageMenuPosition);
        }
    }

    windowOnSize();

    // 更新浏览器类型
    $(window).resize(function() {
        windowOnSize();
    });

    function phoneOrTabletMenuCmd(showMenu) {
        if (!isPhoneOrTablet) return;

        if (!showMenu) {
            $(pageMenu).addClass('hidden-xs hidden-sm');                // 隐层菜单
            pageContentColumn.removeClass('hidden-xs hidden-sm');       // 显示内容
        } else {
            pageContentColumn.addClass('hidden-xs hidden-sm');    // 隐藏内容
            $(pageMenu).removeClass('hidden-xs hidden-sm');       // 显示菜单
        }
    }

    function indexOf(children, child) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
            if (children[i] == child) {
                return i;
            }
        }
        return -1;
    }

    function updatePageBtn(index) {
        if (0 === index) {
            $('#prev_page_btn').addClass('disabled');
            $('#next_page_btn').removeClass('disabled')
        } else if (index === pageMenu.children.length-1) {
            $('#next_page_btn').addClass('disabled');
            $('#prev_page_btn').removeClass('disabled')
        } else {
            $('#next_page_btn').removeClass('disabled');
            $('#prev_page_btn').removeClass('disabled')
        }
    }

    function updatePage(index) {
        var len = pageContentContainer.children.length;
        for (var i = 0; i < len; i++) {
            if (index != i) {
                $(pageContentContainer.children[i]).addClass('sr-only');
            } else {
                $(pageContentContainer.children[i]).removeClass('sr-only');
            }
        }
        updatePageBtn(index);
        $(window).scrollTop(0); //滚动到起始位置
    }

    // 进入下一页
    window.nextPage = function() {
        var index = indexOf(pageMenu.children, activeMenu.get(0));
        ++index;
        if (index >= pageMenu.children.length) {
            return;
        }
        
        console.log('new index:' + index);

        activeMenu.removeClass('active');

        var newActiveMenu = $(pageMenu.children[index]);
        newActiveMenu.addClass('active');
        activeMenu = newActiveMenu;

        updatePage(index);
    };

    // 进入前一页
    window.prevPage = function() {
        var index = indexOf(pageMenu.children, activeMenu.get(0));
        --index;
        if (index < 0) {
            return;
        }

        console.log('new index:' + index);

        activeMenu.removeClass('active');

        var newActiveMenu = $(pageMenu.children[index]);
        newActiveMenu.addClass('active');
        activeMenu = newActiveMenu;

        updatePage(index);
    };

    window.menuPage = function() {
        phoneOrTabletMenuCmd(true);
    };

    // 单击菜单
    $('.page-menu .list-group-item').click(function() {
        var index = indexOf(pageMenu.children, this);
        if (index != -1) {
            //console.log('current index = ' + index);

            activeMenu.removeClass('active');
            $(this).addClass('active');
            activeMenu = $(this);

            updatePage(index);
            phoneOrTabletMenuCmd(false);
        }
    });

});