<style>
    /* 基础容器 */
    .gallery-container {
        width: 100%;
        max-width: 100%;
        padding: 20px 0;
        margin: 0 auto;
    }

    /* 主图区域 */
    .main-view {
        width: 90%;
        height: 70vh;
        margin: 0 auto;
        position: relative;
    }

    #mainImage {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: opacity 0.4s ease;
    }

    /* 缩略图轨道 */
    .thumbnails-track {
        display: flex;
        gap: 12px;
        padding: 20px 5%;
        overflow-x: auto;
        scroll-behavior: smooth;
    }

    .thumbnail-item {
        flex: 0 0 180px;
        height: 120px;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }

    .thumbnail-item.active {
        border-color: #2196F3;
        transform: scale(1.05);
    }

    .thumbnail-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 导航按钮 */
    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.7);
        color: white;
        border: none;
        width: 40px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.9;
        z-index: 10;
    }

    .nav-btn:hover {
        opacity: 1;
    }

    .prev-btn { left: 2%; }
    .next-btn { right: 2%; }

    /* 响应式设计 */
    @media (min-width: 1600px) {
        .main-view { width: 85%; }
        .thumbnail-item { flex: 0 0 220px; height: 150px; }
    }

    @media (max-width: 768px) {
        .main-view { height: 60vh; }
        .thumbnail-item { flex: 0 0 140px; height: 100px; }
        .nav-btn { width: 35px; height: 50px; }
    }

    @media (max-width: 480px) {
        .main-view { height: 50vh; }
        .thumbnail-item { flex: 0 0 120px; height: 80px; }
    }
</style>

<div class="gallery-container">
    <div class="main-view">
        <button class="nav-btn prev-btn" onclick="showPrev()">❮</button>
        <img id="mainImage" src="" alt="Main Image">
        <button class="nav-btn next-btn" onclick="showNext()">❯</button>
    </div>
    <div class="thumbnails-track" id="thumbnailsContainer"></div>
</div>

<script>
// 配置信息
const IMAGE_PATH = '/images/';
const IMAGE_LIST = [
    '冬至.jpg',
    '大南山_1.jpg',
    '大南山_2.jpg',
    '大南山_3.jpg',
    '大南山_4.jpg',
    '大南山_5.jpg',
    '大南山_6.jpg'
];

// 系统状态
let currentIndex = 0;
let autoPlayTimer = null;

// 初始化画廊
function initGallery() {
    // 生成缩略图
    const container = document.getElementById('thumbnailsContainer');
    IMAGE_LIST.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail-item';
        thumb.innerHTML = `<img src="${IMAGE_PATH}${img}" alt="Thumb ${index + 1}">`;
        thumb.onclick = () => switchImage(index);
        container.appendChild(thumb);
    });

    // 加载首图
    switchImage(0);
    startAutoPlay();
}

// 核心切换函数
function switchImage(index) {
    if (index < 0 || index >= IMAGE_LIST.length) return;
    
    const mainImg = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumbnail-item');
    
    // 淡出过渡
    mainImg.style.opacity = 0;
    
    setTimeout(() => {
        mainImg.src = IMAGE_PATH + IMAGE_LIST[index];
        mainImg.alt = `Gallery Image ${index + 1}`;
        mainImg.style.opacity = 1;
        
        // 更新缩略图状态
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }, 300);

    resetAutoPlay();
}

// 导航控制
function showPrev() { switchImage((currentIndex - 1 + IMAGE_LIST.length) % IMAGE_LIST.length); }
function showNext() { switchImage((currentIndex + 1) % IMAGE_LIST.length); }

// 自动播放
function startAutoPlay() {
    autoPlayTimer = setInterval(showNext, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

// 事件绑定
document.addEventListener('DOMContentLoaded', initGallery);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// 窗口调整处理
window.addEventListener('resize', () => {
    document.querySelectorAll('.thumbnail-item').forEach(thumb => {
        thumb.style.transform = 'scale(1)';
    });
});
</script>