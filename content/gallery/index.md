---
title: Gallery
date: 2023-06-19T12:00:00Z
---

<style>
/* 简化版瀑布流布局 */
.gallery-grid {
    columns: 4 250px;
    gap: 1rem;
    padding: 2rem;
}

.gallery-item {
    break-inside: avoid;
    margin-bottom: 1rem;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s;
}

.gallery-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 自适应布局 */
@media (max-width: 1200px) { .gallery-grid { columns: 3; } }
@media (max-width: 768px) { .gallery-grid { columns: 2; } }
@media (max-width: 480px) { .gallery-grid { columns: 1; } }

/* 灯箱样式（保持原样） */
.lightbox { /* 保持之前的灯箱样式 */ }
</style>

<div class="gallery-grid" id="galleryContainer"></div>

<div class="lightbox">
    <span class="lightbox-nav prev-btn">❮</span>
    <img class="lightbox-content" src="" alt="Enlarged View">
    <span class="lightbox-nav next-btn">❯</span>
</div>

<script>
// 只需在此数组添加图片路径
const IMAGE_LIST = [
    '/images/冬至.jpg',
    '/images/大南山_1.jpg',
    '/images/大南山_2.jpg',
    '/images/大南山_3.jpg',
    '/images/大南山_4.jpg',
    '/images/大南山_5.jpg',
    '/images/大南山_6.jpg',
    // 添加更多图片...
];

// 自动生成相册
function generateGallery() {
    const container = document.getElementById('galleryContainer');
    
    IMAGE_LIST.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${src}" alt="Gallery Image ${index + 1}">`;
        item.onclick = () => openLightbox(index);
        container.appendChild(item);
    });
}

// 灯箱功能（保持原样）
let currentIndex = 0;
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = IMAGE_LIST[index];
    lightbox.style.display = 'block';
}

// 导航和关闭逻辑（保持原样）
document.querySelector('.prev-btn').onclick = () => {/* 保持之前逻辑 */};
document.querySelector('.next-btn').onclick = () => {/* 保持之前逻辑 */};
window.onclick = (e) => { if(e.target === lightbox) lightbox.style.display = 'none'; };

// 初始化
document.addEventListener('DOMContentLoaded', generateGallery);
</script>