<?php
namespace Template;

class Etsy {
    private $registry;
    private $config;
    private $data = [];
    
    public function __construct($registry) {
        $this->registry = $registry;
        $this->config = $registry->get('config');
    }
    
    public function __get($key) {
        return $this->registry->get($key);
    }
    
    public function set($key, $value) {
        $this->data[$key] = $value;
    }
    
    public function render($template, $cache = false) {
        $file = DIR_TEMPLATE . $template . '.twig';
        
        if (is_file($file)) {
            extract($this->data);
            
            // 添加Etsy主题特定的全局变量
            $etsy_theme = $this->config->get('theme_etsy_colors');
            $etsy_typography = $this->config->get('theme_etsy_typography');
            $etsy_layout = $this->config->get('theme_etsy_layout');
            $etsy_components = $this->config->get('theme_etsy_components');
            $etsy_social = $this->config->get('theme_etsy_social');
            
            // 添加主题版本号用于缓存刷新
            $theme_version = $this->config->get('theme_etsy_info')['version'];
            
            // 添加设备检测
            $is_mobile = preg_match('/(?i)mobile|android|blackberry|mini|windows\sce|palm/i', $this->request->server['HTTP_USER_AGENT']);
            $is_tablet = preg_match('/(?i)ipad|tablet/i', $this->request->server['HTTP_USER_AGENT']);
            $is_desktop = !$is_mobile && !$is_tablet;
            
            // 添加到模板数据
            $this->data['etsy_theme'] = $etsy_theme;
            $this->data['etsy_typography'] = $etsy_typography;
            $this->data['etsy_layout'] = $etsy_layout;
            $this->data['etsy_components'] = $etsy_components;
            $this->data['etsy_social'] = $etsy_social;
            $this->data['theme_version'] = $theme_version;
            $this->data['is_mobile'] = $is_mobile;
            $this->data['is_tablet'] = $is_tablet;
            $this->data['is_desktop'] = $is_desktop;
            
            // 渲染模板
            ob_start();
            require($file);
            return ob_get_clean();
        } else {
            trigger_error('Error: Could not load template ' . $file . '!');
            exit();
        }
    }
}