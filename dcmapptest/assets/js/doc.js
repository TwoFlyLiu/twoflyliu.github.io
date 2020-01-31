'use strict';

$(document).ready(function() {
    var pageMenu = document.getElementById('page-menu');
    var pageContentContainer = document.getElementById('page-content-container');
    var activeMenu = $('#page-menu>.active');

    $('.long-content').css('padding-bottom', $('#footer').height() + 40);

    function indexOf(children, child) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
            if (children[i] == child) {
                return i;
            }
        }
        return -1;
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
    }

    // 单击菜单
    $('.page-menu .list-group-item').click(function() {
        var index = indexOf(pageMenu.children, this);
        if (index != -1) {
            //console.log('current index = ' + index);

            activeMenu.removeClass('active');
            $(this).addClass('active');
            activeMenu = $(this);

            updatePage(index);
        }
    });

});