/**
 * Etsy主题筛选功能JavaScript文件
 * 处理产品列表页面的筛选和排序功能
 */

(function($) {
    'use strict';
    
    // 确保Etsy对象存在
    window.Etsy = window.Etsy || {};
    
    // 筛选功能
    Etsy.filters = {
        init: function() {
            this.mobileFiltersToggle();
            this.filterAccordion();
            this.priceRangeSlider();
            this.colorFilter();
            this.filterCheckboxes();
            this.sortingOptions();
            this.viewSwitcher();
            this.filterClear();
        },
        
        // 移动端筛选切换
        mobileFiltersToggle: function() {
            $('.etsy-mobile-filters-toggle').on('click', function(e) {
                e.preventDefault();
                $('body').toggleClass('etsy-filters-open');
                $('.etsy-filters').toggleClass('is-active');
                $('.etsy-filters-overlay').toggleClass('is-active');
            });
            
            $('.etsy-filters-close, .etsy-filters-overlay').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('etsy-filters-open');
                $('.etsy-filters').removeClass('is-active');
                $('.etsy-filters-overlay').removeClass('is-active');
            });
        },
        
        // 筛选手风琴
        filterAccordion: function() {
            $('.etsy-filter-title').on('click', function() {
                var $this = $(this);
                var $content = $this.next('.etsy-filter-content');
                
                $this.toggleClass('is-active');
                $content.slideToggle(300);
            });
            
            // 默认展开第一个筛选项
            $('.etsy-filter-title').first().addClass('is-active');
            $('.etsy-filter-content').first().show();
        },
        
        // 价格范围滑块
        priceRangeSlider: function() {
            var $priceSlider = $('.etsy-price-slider');
            
            if ($priceSlider.length && $.fn.slider) {
                $priceSlider.each(function() {
                    var $slider = $(this);
                    var $minInput = $slider.siblings('.etsy-price-min');
                    var $maxInput = $slider.siblings('.etsy-price-max');
                    var min = parseInt($slider.data('min')) || 0;
                    var max = parseInt($slider.data('max')) || 1000;
                    var currentMin = parseInt($minInput.val()) || min;
                    var currentMax = parseInt($maxInput.val()) || max;
                    
                    $slider.slider({
                        range: true,
                        min: min,
                        max: max,
                        values: [currentMin, currentMax],
                        slide: function(event, ui) {
                            $minInput.val(ui.values[0]);
                            $maxInput.val(ui.values[1]);
                        },
                        change: function(event, ui) {
                            // 触发筛选更新
                            Etsy.filters.updateFilters();
                        }
                    });
                    
                    // 输入框变化时更新滑块
                    $minInput.on('change', function() {
                        var value = parseInt($(this).val()) || min;
                        var currentMax = $slider.slider('values', 1);
                        
                        if (value > currentMax) {
                            value = currentMax;
                            $(this).val(value);
                        } else if (value < min) {
                            value = min;
                            $(this).val(value);
                        }
                        
                        $slider.slider('values', 0, value);
                    });
                    
                    $maxInput.on('change', function() {
                        var value = parseInt($(this).val()) || max;
                        var currentMin = $slider.slider('values', 0);
                        
                        if (value < currentMin) {
                            value = currentMin;
                            $(this).val(value);
                        } else if (value > max) {
                            value = max;
                            $(this).val(value);
                        }
                        
                        $slider.slider('values', 1, value);
                    });
                });
            } else if ($priceSlider.length) {
                // 简单的输入框实现（无依赖）
                $('.etsy-price-min, .etsy-price-max').on('change', function() {
                    Etsy.filters.updateFilters();
                });
            }
        },
        
        // 颜色筛选
        colorFilter: function() {
            $('.etsy-color-filter').on('click', function() {
                $(this).toggleClass('is-active');
                Etsy.filters.updateFilters();
            });
        },
        
        // 筛选复选框
        filterCheckboxes: function() {
            $('.etsy-filter-checkbox').on('change', function() {
                Etsy.filters.updateFilters();
            });
        },
        
        // 排序选项
        sortingOptions: function() {
            $('.etsy-sorting-select').on('change', function() {
                var sortValue = $(this).val();
                var currentUrl = window.location.href;
                var url = new URL(currentUrl);
                
                // 更新排序参数
                url.searchParams.set('sort', sortValue);
                
                // 重定向到新URL
                window.location.href = url.toString();
            });
        },
        
        // 视图切换（网格/列表）
        viewSwitcher: function() {
            $('.etsy-view-switcher').on('click', '.etsy-view-grid, .etsy-view-list', function(e) {
                e.preventDefault();
                var $this = $(this);
                var view = $this.hasClass('etsy-view-grid') ? 'grid' : 'list';
                
                // 更新按钮状态
                $('.etsy-view-switcher button').removeClass('is-active');
                $this.addClass('is-active');
                
                // 更新产品列表视图
                $('.etsy-product-list').removeClass('etsy-product-list--grid etsy-product-list--list')
                                      .addClass('etsy-product-list--' +