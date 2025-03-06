<style>
    h1 {
    text-align: center;
    margin-bottom: 2rem;
    }

    .gallery {
    width: 100%;
    max-width: 100%;
    padding: 0 5%;
    margin: 0 auto;
    }

    .gallery-thumbnails {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    overflow-x: auto;
    width: 100%;
    }

    .gallery-main {
    width: 90%;
    max-width: 1600px;
    margin: 30px auto;
    position: relative;
    }

    @media (min-width: 1920px) {
    .gallery-main {
        width: 85%;
    }
    
    .gallery-thumbnails {
        justify-content: center;
    }
    }

    @media (max-width: 768px) {
    .gallery-main {
        width: 95%;
    }
    }

    .thumbnail-container {
        display: inline-block;
        cursor: pointer;
        position: relative;
        transition: transform 0.3s;
    }

    .thumbnail-container img {
        max-width: 150px;
        max-height: 100px;
        width: auto;
        height: auto;
        border: 2px solid transparent;
        transition: transform 0.3s;
    }

    .thumbnail-container.active img {
        transform: scale(1.15);
        border-color: #2196F3;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .gallery-main {
        width: 100%;
        max-width: 100%;
        text-align: center;
        position: relative;
        margin-top: 20px;
        min-height: 500px; /* 确保主图区域可见 */
    }

    .gallery-main img {
        max-width: 100%;
        max-height: 80vh;
        height: auto;
        border: none;
        transition: opacity 1s ease-in-out;
    }

    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 2em;
        padding: 5px 15px;
        cursor: pointer;
        z-index: 1;
    }

    .gallery-nav.left { left: 5px; }
    .gallery-nav.right { right: 5px; }

    /* 滚动条样式 */
    .gallery-thumbnails::-webkit-scrollbar {
        height: 8px;
    }
    .gallery-thumbnails::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }
    .gallery-thumbnails::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .gallery-thumbnails::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
</style>

<div class="gallery">
    <h1>Gallery</h1>
    <div class="gallery-thumbnails" id="thumbnailContainer"></div>
    <div class="gallery-main">
        <button class="gallery-nav left" onclick="showPreviousImage()">&#10094;</button>
        <img src="" alt="Main Image" id="mainImage" style="opacity:0;">
        <button class="gallery-nav right" onclick="showNextImage()">&#10095;</button>
    </div>
</div>

<script>
// 全局变量
let currentIndex = 0;
let autoSwitchInterval;

// 配置参数
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

// 生成图片对象
const images = imageFiles.map(fileName => ({
    src: `${imageBasePath}${fileName}`,
    alt: fileName.replace(/_/g, ' ').replace(/\..+$/, '')
}));

// 生成缩略图
function generateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';
    
    images.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-container';
        thumbnail.innerHTML = `<img src="${img.src}" alt="Thumbnail ${img.alt}">`;
        thumbnail.onclick = () => showImage(index, true);
        container.appendChild(thumbnail);
    });
}

// 更新激活状态
function updateActiveThumbnail(index) {
    document.querySelectorAll('.thumbnail-container').forEach((container, i) => {
        container.classList.toggle('active', i === index);
    });
}

// 图片切换核心函数
async function showImage(index, quick = false) {
    if (index < 0 || index >= images.length) return;
    
    const mainImage = document.getElementById('mainImage');
    mainImage.style.transition = `opacity ${quick ? 500 : 1000}ms`;
    mainImage.style.opacity = 0;

    // 使用实际图片路径加载
    const actualSrc = await new Promise(resolve => {
        const img = new Image();
        img.src = images[index].src;
        img.onload = () => resolve(img.src);
        img.onerror = () => resolve('/images/fallback.jpg');
    });

    setTimeout(() => {
        mainImage.src = actualSrc;
        mainImage.alt = images[index].alt;
        mainImage.style.opacity = 1;
        currentIndex = index;
        updateActiveThumbnail(index);
    }, quick ? 500 : 1000);

    resetAutoSwitch();
}

// 导航功能
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex, true);
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex, true);
}

// 自动切换控制
function resetAutoSwitch() {
    clearInterval(autoSwitchInterval);
    autoSwitchInterval = setInterval(showNextImage, 5000);
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showPreviousImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    generateThumbnails();
    if (images.length > 0) {
        showImage(0, false);
    }
});
</script>