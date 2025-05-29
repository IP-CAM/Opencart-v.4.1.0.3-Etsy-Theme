/**
 * Etsy主题动画效果JavaScript文件
 * 处理各种UI动画效果
 */

(function($) {
    'use strict';
    
    // 确保Etsy对象存在
    window.Etsy = window.Etsy || {};
    
    // 动画效果
    Etsy.animations = {
        init: function() {
            this.initScrollAnimations();
            this.initHoverAnimations();
            this.initLoadAnimations();
        },
        
        initScrollAnimations: function() {
            // 滚动显示元素
            $('.etsy-scroll-animate').each(function() {
                var $this = $(this);
                
                $(window).on('scroll', function() {
                    var scrollTop = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var elementTop = $this.offset().top;
                    var elementHeight = $this.outerHeight();
                    
                    // 当元素进入视口时添加动画类
                    if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
                        $this.addClass('is-visible');
                    } else {
                        // 如果元素设置了重复动画属性，则在离开视口时移除动画类
                        if ($this.data('repeat-animation')) {
                            $this.removeClass('is-visible');
                        }
                    }
                });
                
                // 页面加载时触发一次滚动事件，以显示已在视口中的元素
                $(window).trigger('scroll');
            });
            
            // 滚动视差效果
            $('.etsy-parallax').each(function() {
                var $this = $(this);
                var speed = $this.data('parallax-speed') || 0.5;
                
                $(window).on('scroll', function() {
                    var scrollTop = $(window).scrollTop();
                    var offset = scrollTop * speed;
                    
                    $this.css('transform', 'translateY(' + offset + 'px)');
                });
            });
        },
        
        initHoverAnimations: function() {
            // 悬停缩放效果
            $('.etsy-hover-zoom').hover(
                function() {
                    $(this).addClass('is-zoomed');
                },
                function() {
                    $(this).removeClass('is-zoomed');
                }
            );
            
            // 悬停淡入效果
            $('.etsy-hover-fade').hover(
                function() {
                    $(this).find('.etsy-hover-fade__content').fadeIn(200);
                },
                function() {
                    $(this).find('.etsy-hover-fade__content').fadeOut(200);
                }
            );
            
            // 悬停滑入效果
            $('.etsy-hover-slide').hover(
                function() {
                    $(this).find('.etsy-hover-slide__content').slideDown(200);
                },
                function() {
                    $(this).find('.etsy-hover-slide__content').slideUp(200);
                }
            );
        },
        
        initLoadAnimations: function() {
            // 页面加载时的动画效果
            $('.etsy-load-animate').each(function(index) {
                var $this = $(this);
                var delay = $this.data('load-delay') || index * 100;
                
                setTimeout(function() {
                    $this.addClass('is-loaded');
                }, delay);
            });
            
            // 图片加载完成后的动画
            $('.etsy-image-animate').each(function() {
                var $this = $(this);
                var $img = $this.find('img');
                
                if ($img.length) {
                    if ($img[0].complete) {
                        $this.addClass('is-loaded');
                    } else {
                        $img.on('load', function() {
                            $this.addClass('is-loaded');
                        });
                    }
                }
            });
        }
    };
    
})(jQuery);