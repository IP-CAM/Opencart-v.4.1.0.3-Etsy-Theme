<?php
// 主题配置文件
// Etsy主题配置选项

// 主题基本信息
$_['theme_etsy_info'] = [
    'name'    => 'Etsy',
    'version' => '1.0.0',
    'author'  => 'OpenCart Etsy Theme',
    'website' => 'https://www.opencart.com',
];

// 颜色配置
$_['theme_etsy_colors'] = [
    'primary'   => '#F56500', // Etsy橙色
    'secondary' => '#222222', // 深灰色
    'light'     => '#F7F7F7', // 浅灰色
    'success'   => '#00A651', // 绿色
    'danger'    => '#E60023', // 红色
    'info'      => '#00BCD4', // 蓝绿色
    'warning'   => '#F57C00', // 橙色
];

// 字体配置
$_['theme_etsy_typography'] = [
    'primary_font'   => 'Graphik, Arial, Helvetica, sans-serif',
    'base_font_size' => '16px',
];

// 布局配置
$_['theme_etsy_layout'] = [
    'container_width'  => '1440px',
    'grid_columns'     => 12,
    'grid_gutter'      => '30px',
    'responsive_breakpoints' => [
        'xs' => '576px',  // 小型设备
        'sm' => '768px',  // 平板
        'md' => '992px',  // 桌面
        'lg' => '1200px', // 大桌面
        'xl' => '1440px', // 超大桌面
    ],
];

// 组件配置
$_['theme_etsy_components'] = [
    'enable_product_card_hover' => true,
    'enable_wishlist'          => true,
    'enable_quick_view'        => true,
    'enable_mega_menu'         => true,
    'enable_sticky_header'     => true,
    'enable_back_to_top'       => true,
];

// 首页配置
$_['theme_etsy_home'] = [
    'show_slideshow'      => true,
    'show_featured'       => true,
    'show_bestsellers'    => true,
    'show_latest'         => true,
    'show_categories'     => true,
    'show_brands'         => true,
    'show_testimonials'   => true,
    'show_newsletter'     => true,
];

// 产品页配置
$_['theme_etsy_product'] = [
    'image_zoom'          => true,
    'related_products'    => true,
    'product_thumbnails'  => 'horizontal', // horizontal, vertical
    'product_sticky_info' => true,
];

// 分类页配置
$_['theme_etsy_category'] = [
    'default_view'        => 'grid', // grid, list
    'products_per_page'   => 24,
    'show_subcategories'  => true,
    'show_filters'        => true,
];

// 社交媒体链接
$_['theme_etsy_social'] = [
    'facebook'  => '',
    'twitter'   => '',
    'instagram' => '',
    'pinterest' => '',
    'youtube'   => '',
];

// 自定义代码
$_['theme_etsy_custom'] = [
    'custom_css' => '',
    'custom_js'  => '',
    'head_tags'  => '',
    'footer_tags' => '',
];