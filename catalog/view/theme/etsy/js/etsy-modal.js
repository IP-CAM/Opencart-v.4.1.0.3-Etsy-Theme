/**
 * Etsy主题模态框组件JavaScript文件
 * 处理模态框的显示、隐藏和交互功能
 */

(function($) {
    'use strict';
    
    // 确保Etsy对象存在
    window.Etsy = window.Etsy || {};
    
    // 模态框组件
    Etsy.modal = {
        init: function() {
            this.initModalTriggers();
            this.initModalClose();
            this.initAjaxModals();
        },
        
        initModalTriggers: function() {
            // 模态框触发器
            $(document).on('click', '[data-toggle="etsy-modal"]', function(e) {
                e.preventDefault();
                var target = $(this).data('target');
                Etsy.modal.openModal(target);
            });
        },
        
        initModalClose: function() {
            // 关闭模态框
            $(document).on('click', '.etsy-modal-close, .etsy-modal-overlay', function(e) {
                e.preventDefault();
                Etsy.modal.closeModal($(this).closest('.etsy-modal'));
            });
            
            // ESC键关闭模态框
            $(document).on('keydown', function(e) {
                if (e.keyCode === 27) { // ESC键
                    Etsy.modal.closeAllModals();
                }
            });
        },
        
        initAjaxModals: function() {
            // AJAX加载内容的模态框
            $(document).on('click', '[data-toggle="etsy-ajax-modal"]', function(e) {
                e.preventDefault();
                var $this = $(this);
                var url = $this.data('url') || $this.attr('href');
                var target = $this.data('target');
                
                if (url && target) {
                    var $modal = $(target);
                    var $content = $modal.find('.etsy-modal-content');
                    
                    // 显示加载状态
                    $content.html('<div class="etsy-modal-loading"><div class="etsy-spinner"></div></div>');
                    Etsy.modal.openModal(target);
                    
                    // 加载内容
                    $.ajax({
                        url: url,
                        type: 'GET',
                        success: function(response) {
                            $content.html(response);
                        },
                        error: function() {
                            $content.html('<div class="etsy-modal-error">加载内容失败，请重试。</div>');
                        }
                    });
                }
            });
        },
        
        openModal: function(target) {
            var $modal = $(target);
            
            if ($modal.length) {
                // 关闭其他模态框
                if (!$modal.data('allow-multiple')) {
                    $('.etsy-modal.is-active').not($modal).removeClass('is-active');
                }
                
                // 显示模态框
                $modal.addClass('is-active');
                $('body').addClass('etsy-modal-open');
                
                // 触发事件
                $(document).trigger('etsy.modal.opened', [$modal]);
            }
        },
        
        closeModal: function($modal) {
            if ($modal.length) {
                $modal.removeClass('is-active');
                
                // 如果没有其他活动的模态框，移除body类
                if ($('.etsy-modal.is-active').length === 0) {
                    $('body').removeClass('etsy-modal-open');
                }
                
                // 触发事件
                $(document).trigger('etsy.modal.closed', [$modal]);
            }
        },
        
        closeAllModals: function() {
            $('.etsy-modal.is-active').each(function() {
                Etsy.modal.closeModal($(this));
            });
        }
    };
    
})(jQuery);