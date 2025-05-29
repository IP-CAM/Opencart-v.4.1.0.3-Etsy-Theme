/**
 * Etsy主题收藏功能JavaScript文件
 * 处理产品收藏相关功能
 */

(function($) {
    'use strict';
    
    // 确保Etsy对象存在
    window.Etsy = window.Etsy || {};
    
    // 收藏功能
    Etsy.wishlist = {
        init: function() {
            this.wishlistToggle();
            this.wishlistRemove();
        },
        
        wishlistToggle: function() {
            $(document).on('click', '.etsy-product-card__wishlist, .etsy-product-wishlist', function(e) {
                e.preventDefault();
                var $this = $(this);
                var productId = $this.data('product-id');
                
                // 切换活动状态
                $this.toggleClass('is-active');
                
                // 这里应该发送AJAX请求添加/删除收藏
                // 为了演示，我们只添加简单的类切换和动画
                if ($this.hasClass('is-active')) {
                    // 添加到收藏
                    $this.find('.etsy-icon--heart').addClass('etsy-icon--heart-animation');
                    setTimeout(function() {
                        $this.find('.etsy-icon--heart').removeClass('etsy-icon--heart-animation');
                    }, 1000);
                    
                    // 显示成功消息
                    Etsy.showNotification('success', '产品已添加到收藏列表');
                } else {
                    // 从收藏中删除
                    Etsy.showNotification('info', '产品已从收藏列表中删除');
                }
            });
        },
        
        wishlistRemove: function() {
            $(document).on('click', '.etsy-wishlist-item-remove', function(e) {
                e.preventDefault();
                var $this = $(this);
                var wishlistItemId = $this.data('wishlist-item-id');
                
                // 这里应该发送AJAX请求删除收藏项
                // 为了演示，我们直接移除元素
                $this.closest('.etsy-wishlist-item').fadeOut(300, function() {
                    $(this).remove();
                });
                
                // 显示成功消息
                Etsy.showNotification('info', '产品已从收藏列表中删除');
            });
        }
    };
    
    // 通知消息显示
    Etsy.showNotification = function(type, message) {
        var $notification = $('<div class="etsy-notification etsy-notification--' + type + '">' + message + '</div>');
        
        // 添加到页面
        $('body').append($notification);
        
        // 显示通知
        setTimeout(function() {
            $notification.addClass('is-active');
        }, 100);
        
        // 自动隐藏通知
        setTimeout(function() {
            $notification.removeClass('is-active');
            setTimeout(function() {
                $notification.remove();
            }, 300);
        }, 3000);
    };
    
})(jQuery);