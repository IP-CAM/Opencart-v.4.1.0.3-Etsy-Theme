/**
 * Etsy主题组件交互JavaScript文件
 * 包含各种UI组件的交互功能
 */

(function($) {
    'use strict';
    
    // 确保Etsy对象存在
    window.Etsy = window.Etsy || {};
    
    // 头部组件
    Etsy.header = {
        init: function() {
            this.stickyHeader();
            this.mobileMenuToggle();
            this.userMenuToggle();
        },
        
        stickyHeader: function() {
            var $header = $('.etsy-header');
            var headerHeight = $header.outerHeight();
            var $placeholder = $('<div class="etsy-header-placeholder"></div>').height(headerHeight);
            
            if ($header.hasClass('etsy-header--sticky')) {
                $header.before($placeholder);
                $placeholder.hide();
            }
        },
        
        onScroll: function() {
            var $header = $('.etsy-header');
            var $placeholder = $('.etsy-header-placeholder');
            
            if ($header.hasClass('etsy-header--sticky')) {
                if ($(window).scrollTop() > 200) {
                    $header.addClass('is-sticky');
                    $placeholder.show();
                } else {
                    $header.removeClass('is-sticky');
                    $placeholder.hide();
                }
            }
        },
        
        mobileMenuToggle: function() {
            $('.etsy-mobile-menu-toggle').on('click', function(e) {
                e.preventDefault();
                $('body').toggleClass('etsy-mobile-menu-open');
                $('.etsy-mobile-menu').toggleClass('is-active');
                $('.etsy-mobile-menu-overlay').toggleClass('is-active');
            });
            
            $('.etsy-mobile-menu-close, .etsy-mobile-menu-overlay').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('etsy-mobile-menu-open');
                $('.etsy-mobile-menu').removeClass('is-active');
                $('.etsy-mobile-menu-overlay').removeClass('is-active');
            });
        },
        
        userMenuToggle: function() {
            $('.etsy-user-menu-trigger').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('is-active');
                $(this).next('.etsy-user-menu').toggleClass('is-active');
            });
            
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.etsy-user-menu-wrapper').length) {
                    $('.etsy-user-menu-trigger').removeClass('is-active');
                    $('.etsy-user-menu').removeClass('is-active');
                }
            });
        }
    };
    
    // 搜索组件
    Etsy.search = {
        init: function() {
            this.searchToggle();
            this.searchAutocomplete();
        },
        
        searchToggle: function() {
            $('.etsy-search-toggle').on('click', function(e) {
                e.preventDefault();
                $('.etsy-search-form').toggleClass('is-active');
                setTimeout(function() {
                    $('.etsy-search-input').focus();
                }, 100);
            });
        },
        
        searchAutocomplete: function() {
            $('.etsy-search-input').on('keyup', function() {
                var query = $(this).val();
                
                if (query.length > 2) {
                    // 这里应该发送AJAX请求获取搜索建议
                    // 为了演示，我们直接显示搜索建议容器
                    $('.etsy-search-suggestions').addClass('is-active');
                } else {
                    $('.etsy-search-suggestions').removeClass('is-active');
                }
            });
            
            // 点击外部关闭搜索建议
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.etsy-search-form').length) {
                    $('.etsy-search-suggestions').removeClass('is-active');
                }
            });
        }
    };
    
    // 导航菜单组件
    Etsy.menu = {
        init: function() {
            this.megaMenu();
            this.mobileSubmenu();
        },
        
        megaMenu: function() {
            // 在移动设备上禁用悬停效果
            if (!Etsy.responsive.isMobile()) {
                $('.etsy-nav-item--has-submenu').hover(
                    function() {
                        $(this).addClass('is-active');
                        $(this).find('.etsy-submenu, .etsy-mega-menu').addClass('is-active');
                    },
                    function() {
                        $(this).removeClass('is-active');
                        $(this).find('.etsy-submenu, .etsy-mega-menu').removeClass('is-active');
                    }
                );
            }
        },
        
        mobileSubmenu: function() {
            $('.etsy-mobile-menu-submenu-toggle').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('is-active');
                $(this).next('.etsy-mobile-submenu').slideToggle(300);
            });
        }
    };
    
    // 购物车组件
    Etsy.cart = {
        init: function() {
            this.cartToggle();
            this.cartUpdate();
            this.cartRemove();
        },
        
        cartToggle: function() {
            $('.etsy-cart-toggle').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('is-active');
                $('.etsy-cart-dropdown').toggleClass('is-active');
            });
            
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.etsy-cart-wrapper').length) {
                    $('.etsy-cart-toggle').removeClass('is-active');
                    $('.etsy-cart-dropdown').removeClass('is-active');
                }
            });
        },
        
        cartUpdate: function() {
            $(document).on('change', '.etsy-cart-item-quantity', function() {
                var $this = $(this);
                var quantity = $this.val();
                var cartItemId = $this.data('cart-item-id');
                
                // 这里应该发送AJAX请求更新购物车
                // 为了演示，我们直接显示加载状态
                $this.closest('.etsy-cart-item').addClass('is-loading');
                
                setTimeout(function() {
                    $this.closest('.etsy-cart-item').removeClass('is-loading');
                }, 500);
            });
        },
        
        cartRemove: function() {
            $(document).on('click', '.etsy-cart-item-remove', function(e) {
                e.preventDefault();
                var $this = $(this);
                var cartItemId = $this.data('cart-item-id');
                
                // 这里应该发送AJAX请求删除购物车项
                // 为了演示，我们直接移除元素
                $this.closest('.etsy-cart-item').fadeOut(300, function() {
                    $(this).remove();
                });
            });
        }
    };
    
    // 产品组件
    Etsy.product = {
        init: function() {
            this.productImageGallery();
            this.productQuantity();
            this.productVariants();
            this.productTabs();
            this.productReviews();
        },
        
        productImageGallery: function() {
            // 产品图片画廊初始化
            if ($('.etsy-product-gallery').length) {
                // 这里应该初始化图片画廊插件
                // 为了演示，我们只添加简单的缩略图点击事件
                $('.etsy-product-thumbnail').on('click', function() {
                    var imgSrc = $(this).data('image');
                    $('.etsy-product-gallery-main img').attr('src', imgSrc);
                    $('.etsy-product-thumbnail').removeClass('is-active');
                    $(this).addClass('is-active');
                });
            }
        },
        
        productQuantity: function() {
            // 产品数量控制
            $('.etsy-product-quantity-decrease').on('click', function() {
                var $input = $('.etsy-product-quantity');
                var currentVal = parseInt($input.val());
                if (currentVal > 1) {
                    $input.val(currentVal - 1);
                }
            });
            
            $('.etsy-product-quantity-increase').on('click', function() {
                var $input = $('.etsy-product-quantity');
                var currentVal = parseInt($input.val());
                $input.val(currentVal + 1);
            });
        },
        
        productVariants: function() {
            // 产品变体选择
            $('.etsy-product-option').on('change', function() {
                // 这里应该处理产品变体选择逻辑
                // 为了演示，我们只添加简单的类切换
                $(this).closest('.etsy-product-options-group').find('.etsy-product-option-label').removeClass('is-active');
                $(this).closest('.etsy-product-option-label').addClass('is-active');
            });
        },
        
        productTabs: function() {
            // 产品选项卡
            $('.etsy-product-tab').on('click', function(e) {
                e.preventDefault();
                var target = $(this).attr('href');
                
                $('.etsy-product-tab').removeClass('is-active');
                $(this).addClass('is-active');
                
                $('.etsy-product-tab-content').removeClass('is-active');
                $(target).addClass('is-active');
            });
        },
        
        productReviews: function() {
            // 产品评论表单
            $('.etsy-review-form-toggle').on('click', function(e) {
                e.preventDefault();
                $('.etsy-review-form').slideToggle(300);
            });
        }
    };
    
    // 响应式处理
    Etsy.responsive = {
        breakpoints: {
            xs: 576,
            sm: 768,
            md: 992,
            lg: 1200,
            xl: 1440
        },
        
        init: function() {
            this.checkBreakpoint();
        },
        
        onResize: function() {
            this.checkBreakpoint();
        },
        
        checkBreakpoint: function() {
            var windowWidth = $(window).width();
            var breakpoint = '';
            
            if (windowWidth < this.breakpoints.xs) {
                breakpoint = 'xs';
            } else if (windowWidth < this.breakpoints.sm) {
                breakpoint = 'sm';
            } else if (windowWidth < this.breakpoints.md) {
                breakpoint = 'md';
            } else if (windowWidth < this.breakpoints.lg) {
                breakpoint = 'lg';
            } else {
                breakpoint = 'xl';
            }
            
            $('body').removeClass('etsy-breakpoint-xs etsy-breakpoint-sm etsy-breakpoint-md etsy-breakpoint-lg etsy-breakpoint-xl')
                   .addClass('etsy-breakpoint-' + breakpoint);
        },
        
        isMobile: function() {
            return $(window).width() < this.breakpoints.md;
        },
        
        isTablet: function() {
            var windowWidth = $(window).width();
            return windowWidth >= this.breakpoints.sm && windowWidth < this.breakpoints.lg;
        },
        
        isDesktop: function() {
            return $(window).width() >= this.breakpoints.lg;
        }
    };
    
})(jQuery);