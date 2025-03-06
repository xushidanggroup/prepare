---
title: Gallery
date: 2023-06-19T12:00:00Z
---

<style>
    /* 基础样式 */
    .gallery {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 5%;
        max-width: 1600px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 2.5rem;
        color: #2c3e50;
    }

    /* 缩略图区域 */
    .gallery-thumbnails {
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
        overflow-x: auto;
        padding-bottom: 1rem;
        width: 100%;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }

    .thumbnail-container {
        scroll-snap-align: start;
        flex: 0 0 auto;
        width: 150px;
        height: 100px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s;
        border: 2px solid transparent;
    }

    .thumbnail-container:hover {
        transform: scale(1.05);
    }

    .thumbnail-container.active {
        border-color: #2196F3;
        transform: scale(1.08);
    }

    .thumbnail-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 主图区域 */
    .gallery-main {
        width: 100%;
        position: relative;
        margin-top: 2rem;
        aspect-ratio: 16/9;
    }

    .gallery-main img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        transition: opacity 0.5s ease;
    }

    /* 导航按钮 */
    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.7);
        color: white;
        border: none;
        width: 40px;
        height: 60px;
        border-radius: 8px;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gallery-nav:hover {
        opacity: 1;
    }

    .gallery-nav.left { left: 15px; }
    .gallery-nav.right { right: 15px; }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .gallery {
            padding: 1.5rem;
        }

        .thumbnail-container {
            width: 120px;
            height: 80px;
        }

        .gallery-main {
            aspect-ratio: 4/3;
        }

        .gallery-nav {
            width: 35px;
            height: 50px;
            font-size: 1.2rem;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 2rem;
        }

        .thumbnail-container {
            width: 100px;
            height: 70px;
        }
    }
</style>

<div class="gallery">
    <h1>Gallery</h1>
    <div class="gallery-thumbnails" id="thumbnailContainer"></div>
    <div class="gallery-main">
        <button class="gallery-nav left" onclick="showPreviousImage()">❮</button>
        <img src="" alt="Main Image" id="mainImage" style="opacity:0;">
        <button class="gallery-nav right" onclick="showNextImage()">❯</button>
    </div>
</div>

<script>
// 配置部分
const imageBasePath = '/images/';
const imageFiles = [
    '冬至.jpg',
    '大南山_1.jpg',
    '大南山_2.jpg',
    '大南山_3.jpg',
    '大南山_4.jpg',
    '大南山_5.jpg',
    '大南山_6.jpg'
];

// 全局变量
let currentIndex = 0;
let autoSwitchInterval;

// 初始化画廊
function initGallery() {
    generateThumbnails();
    if(imageFiles.length > 0) {
        preloadImages().then(() => {
            showImage(0);
            autoSwitchImages();
        });
    }
}

// 生成缩略图
function generateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';
    
    imageFiles.forEach((file, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-container';
        thumbnail.innerHTML = `<img src="${imageBasePath}${file}" alt="Thumbnail">`;
        thumbnail.onclick = () => showImage(index, true);
        container.appendChild(thumbnail);
    });
}

// 图片切换
async function showImage(index, quick = false) {
    if(index < 0 || index >= imageFiles.length) return;
    
    const mainImage = document.getElementById('mainImage');
    mainImage.style.transition = `opacity ${quick ? 300 : 500}ms`;
    mainImage.style.opacity = 0;

    await new Promise(resolve => setTimeout(resolve, quick ? 300 : 500));
    
    mainImage.src = `${imageBasePath}${imageFiles[index]}`;
    mainImage.style.opacity = 1;
    currentIndex = index;
    
    updateActiveThumbnail();
    resetAutoSwitch();
}

// 更新激活状态
function updateActiveThumbnail() {
    document.querySelectorAll('.thumbnail-container').forEach((container, i) => {
        container.classList.toggle('active', i === currentIndex);
    });
}

// 导航功能
function showNextImage() {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    showImage(currentIndex, true);
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
    showImage(currentIndex, true);
}

// 自动播放
function autoSwitchImages() {
    autoSwitchInterval = setInterval(showNextImage, 5000);
}

function resetAutoSwitch() {
    clearInterval(autoSwitchInterval);
    autoSwitchImages();
}

// 图片预加载
function preloadImages() {
    return Promise.all(imageFiles.map(file => {
        return new Promise(resolve => {
            const img = new Image();
            img.src = `${imageBasePath}${file}`;
            img.onload = resolve;
            img.onerror = resolve;
        });
    }));
}

// 事件监听
document.addEventListener('DOMContentLoaded', initGallery);
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') showPreviousImage();
    if(e.key === 'ArrowRight') showNextImage();
});

// 响应式调整
window.addEventListener('resize', () => {
    document.querySelectorAll('.thumbnail-container').forEach(container => {
        container.style.transform = 'scale(1)';
    });
});
</script>