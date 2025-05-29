/**
 * Etsy主题主JavaScript文件
 * 包含主题的核心功能和初始化代码
 */

// 使用立即执行函数表达式(IIFE)来避免全局命名空间污染
(function($) {
    'use strict';
    
    // 全局Etsy对象
    window.Etsy = window.Etsy || {};
    
    // 初始化函数
    Etsy.init = function() {
        // 初始化所有模块
        Etsy.header.init();
        Etsy.search.init();
        Etsy.menu.init();
        Etsy.cart.init();
        Etsy.wishlist.init();
        Etsy.product.init();
        Etsy.animations.init();
        
        // 初始化响应式处理
        Etsy.responsive.init();
        
        // 初始化通用UI元素
        Etsy.initUI();
        
        // 绑定全局事件
        Etsy.bindGlobalEvents();
    };
    
    // 通用UI元素初始化
    Etsy.initUI = function() {
        // 初始化返回顶部按钮
        Etsy.initBackToTop();
        
        // 初始化工具提示
        $('[data-toggle="tooltip"]').tooltip();
        
        // 初始化下拉菜单
        $('.etsy-dropdown-toggle').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('is-active');
        });
        
        // 点击外部关闭下拉菜单
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.etsy-dropdown').length) {
                $('.etsy-dropdown').removeClass('is-active');
            }
        });
        
        // 数量输入框控制
        $('.etsy-quantity-control').on('click', '.etsy-quantity-decrease, .etsy-quantity-increase', function() {
            var $input = $(this).siblings('.etsy-quantity-input');
            var currentVal = parseInt($input.val());
            
            if ($(this).hasClass('etsy-quantity-decrease')) {
                if (currentVal > 1) {
                    $input.val(currentVal - 1).trigger('change');
                }
            } else {
                $input.val(currentVal + 1).trigger('change');
            }
        });
    };
    
    // 返回顶部按钮
    Etsy.initBackToTop = function() {
        var $backToTop = $('.etsy-back-to-top');
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $backToTop.fadeIn();
            } else {
                $backToTop.fadeOut();
            }
        });
        
        $backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 500);
        });
    };
    
    // 绑定全局事件
    Etsy.bindGlobalEvents = function() {
        // 窗口调整大小事件
        $(window).on('resize', function() {
            Etsy.responsive.onResize();
        });
        
        // 页面滚动事件
        $(window).on('scroll', function() {
            Etsy.header.onScroll();
        });
    };
    
    // 页面加载完成后初始化
    $(document).ready(function() {
        Etsy.init();
    });
    
})(jQuery);