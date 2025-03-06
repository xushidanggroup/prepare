---
title: Gallery
date: 2023-06-19T12:00:00Z
---

<style>
/* 基础样式 */
.gallery-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* 分类筛选 */
.gallery-filter {
    text-align: center;
    margin-bottom: 30px;
}

.filter-btn {
    display: inline-block;
    padding: 8px 20px;
    margin: 0 5px 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn.active {
    background: #2196F3;
    color: white;
    border-color: #2196F3;
}

/* 瀑布流布局 */
.masonry-grid {
    column-count: 4;
    column-gap: 15px;
}

.grid-item {
    break-inside: avoid;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s;
}

.grid-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 灯箱样式 */
.lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 1000;
}

.lightbox-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90%;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 40px;
    cursor: pointer;
    padding: 20px;
    user-select: none;
}

.prev-btn { left: 20px; }
.next-btn { right: 20px; }

/* 响应式布局 */
@media (max-width: 992px) {
    .masonry-grid { column-count: 3; }
}

@media (max-width: 768px) {
    .masonry-grid { column-count: 2; }
}

@media (max-width: 480px) {
    .masonry-grid { column-count: 1; }
    .filter-btn { padding: 6px 15px; }
}
</style>

<div class="gallery-container">
    <!-- 分类筛选 -->
    <div class="gallery-filter">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="nature">Nature</button>
        <button class="filter-btn" data-filter="event">Events</button>
        <button class="filter-btn" data-filter="group">Group Photos</button>
    </div>

    <!-- 图片容器 -->
    <div class="masonry-grid">
        <!-- 示例图片数据 - 需要替换成实际图片 -->
        <div class="grid-item" data-category="nature">
            <img src="/images/冬至.jpg" alt="Winter Solstice">
        </div>
        <div class="grid-item" data-category="event">
            <img src="/images/大南山_1.jpg" alt="Mountain 1">
        </div>
        <!-- 更多图片... -->
    </div>

    <!-- 灯箱 -->
    <div class="lightbox">
        <span class="lightbox-nav prev-btn">❮</span>
        <img class="lightbox-content" src="" alt="Enlarged View">
        <span class="lightbox-nav next-btn">❯</span>
    </div>
</div>

<script>
// 图片数据配置
const galleryData = [
    { src: '/images/冬至.jpg', category: 'nature', title: 'Winter Solstice' },
    { src: '/images/大南山_1.jpg', category: 'event', title: 'Mountain 1' },
    // 添加更多图片...
];

// 初始化画廊
function initGallery() {
    const grid = document.querySelector('.masonry-grid');
    
    // 动态生成图片元素
    grid.innerHTML = galleryData.map(item => `
        <div class="grid-item" data-category="${item.category}">
            <img src="${item.src}" alt="${item.title}">
        </div>
    `).join('');

    // 绑定事件
    initFilters();
    initLightbox();
}

// 分类筛选功能
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新激活状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选图片
            const filter = btn.dataset.filter;
            document.querySelectorAll('.grid-item').forEach(item => {
                const show = filter === 'all' || item.dataset.category === filter;
                item.style.display = show ? 'block' : 'none';
            });
        });
    });
}

// 灯箱功能
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const items = Array.from(document.querySelectorAll('.grid-item'));
    let currentIndex = 0;

    // 打开灯箱
    document.querySelectorAll('.grid-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = 'block';
        });
    });

    // 导航功能
    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightbox();
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateLightbox();
    });

    // 关闭灯箱
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.style.display = 'none';
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if(lightbox.style.display === 'block') {
            if(e.key === 'Escape') lightbox.style.display = 'none';
            if(e.key === 'ArrowLeft') prevImage();
            if(e.key === 'ArrowRight') nextImage();
        }
    });

    function updateLightbox() {
        const activeItems = [...document.querySelectorAll('.grid-item:not([style*="none"])')];
        const src = activeItems[currentIndex].querySelector('img').src;
        lightboxImg.src = src;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', initGallery);
</script>