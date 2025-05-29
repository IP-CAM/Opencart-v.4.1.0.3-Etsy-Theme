/**
 * Etsy主题轮播组件JavaScript文件
 * 处理各种轮播效果和滑块功能
 */

(function($) {
    'use strict';
    
    // 确保Etsy对象存在
    window.Etsy = window.Etsy || {};
    
    // 轮播组件
    Etsy.carousel = {
        init: function() {
            this.productCarousel();
            this.categoryCarousel();
            this.bannerCarousel();
            this.testimonialCarousel();
        },
        
        // 产品轮播
        productCarousel: function() {
            if ($('.etsy-product-carousel').length) {
                $('.etsy-product-carousel').each(function() {
                    var $carousel = $(this);
                    var $items = $carousel.find('.etsy-product-carousel__items');
                    var $prev = $carousel.find('.etsy-carousel-prev');
                    var $next = $carousel.find('.etsy-carousel-next');
                    var options = {
                        slidesToShow: $carousel.data('slides-to-show') || 4,
                        slidesToScroll: $carousel.data('slides-to-scroll') || 1,
                        arrows: true,
                        dots: $carousel.data('dots') || false,
                        autoplay: $carousel.data('autoplay') || false,
                        autoplaySpeed: $carousel.data('autoplay-speed') || 5000,
                        infinite: $carousel.data('infinite') || true,
                        prevArrow: $prev,
                        nextArrow: $next,
                        responsive: [
                            {
                                breakpoint: Etsy.responsive.breakpoints.lg,
                                settings: {
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: Etsy.responsive.breakpoints.md,
                                settings: {
                                    slidesToShow: 2
                                }
                            },
                            {
                                breakpoint: Etsy.responsive.breakpoints.sm,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    };
                    
                    // 初始化轮播
                    $items.slick(options);
                });
            }
        },
        
        // 分类轮播
        categoryCarousel: function() {
            if ($('.etsy-category-carousel').length) {
                $('.etsy-category-carousel').each(function() {
                    var $carousel = $(this);
                    var $items = $carousel.find('.etsy-category-carousel__items');
                    var $prev = $carousel.find('.etsy-carousel-prev');
                    var $next = $carousel.find('.etsy-carousel-next');
                    var options = {
                        slidesToShow: $carousel.data('slides-to-show') || 6,
                        slidesToScroll: $carousel.data('slides-to-scroll') || 1,
                        arrows: true,
                        dots: $carousel.data('dots') || false,
                        autoplay: $carousel.data('autoplay') || false,
                        autoplaySpeed: $carousel.data('autoplay-speed') || 5000,
                        infinite: $carousel.data('infinite') || true,
                        prevArrow: $prev,
                        nextArrow: $next,
                        responsive: [
                            {
                                breakpoint: Etsy.responsive.breakpoints.lg,
                                settings: {
                                    slidesToShow: 5
                                }
                            },
                            {
                                breakpoint: Etsy.responsive.breakpoints.md,
                                settings: {
                                    slidesToShow: 4
                                }
                            },
                            {
                                breakpoint: Etsy.responsive.breakpoints.sm,
                                settings: {
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: Etsy.responsive.breakpoints.xs,
                                settings: {
                                    slidesToShow: 2
                                }
                            }
                        ]
                    };
                    
                    // 初始化轮播
                    $items.slick(options);
                });
            }
        },
        
        // 横幅轮播
        bannerCarousel: function() {
            if ($('.etsy-banner-carousel').length) {
                $('.etsy-banner-carousel').each(function() {
                    var $carousel = $(this);
                    var $items = $carousel.find('.etsy-banner-carousel__items');
                    var $prev = $carousel.find('.etsy-carousel-prev');
                    var $next = $carousel.find('.etsy-carousel-next');
                    var options = {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: true,
                        autoplay: $carousel.data('autoplay') || true,
                        autoplaySpeed: $carousel.data('autoplay-speed') || 5000,
                        fade: $carousel.data('fade') || false,
                        prevArrow: $prev,
                        nextArrow: $next
                    };
                    
                    // 初始化轮播
                    $items.slick(options);
                });
            }
        },
        
        // 评价轮播
        testimonialCarousel: function() {
            if ($('.etsy-testimonial-carousel').length) {
                $('.etsy-testimonial-carousel').each(function() {
                    var $carousel = $(this);
                    var $items = $carousel.find('.etsy-testimonial-carousel__items');
                    var $prev = $carousel.find('.etsy-carousel-prev');
                    var $next = $carousel.find('.etsy-carousel-next');
                    var options = {
                        slidesToShow: $carousel.data('slides-to-show') || 3,
                        slidesToScroll: $carousel.data('slides-to-scroll') || 1,
                        arrows: true,
                        dots: $carousel.data('dots') || true,
                        autoplay: $carousel.data('autoplay') || true,
                        autoplaySpeed: $carousel.data('autoplay-speed') || 6000,
                        prevArrow: $prev,
                        nextArrow: $next,
                        responsive: [
                            {
                                breakpoint: Etsy.responsive.breakpoints.md,
                                settings: {
                                    slidesToShow: 2
                                }
                            },
                            {
                                breakpoint: Etsy.responsive.breakpoints.sm,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    };
                    
                    // 初始化轮播
                    $items.slick(options);
                });
            }
        }
    };
    
})(jQuery);