---
title: "Group Gallery"
date: 2025-03-06T16:18:37+08:00
type: gallery
---

<!-- 画廊主容器（新增 ARIA 标签与键盘导航支持） -->
<section class="gallery-container" aria-label="团队活动相册轮播图">
  <div class="gallery-main">
    <button class="gallery-nav left" onclick="handleNavClick(-1)" aria-label="上一张图片">&#10094;</button>
    
    <!-- 使用 Hugo Pipes 优化主图加载 -->
    {{ $mainImage := resources.Get "images/红林花海2024.9.18.jpg" | fingerprint }}
    <img id="mainImage" 
         src="{{ $mainImage.RelPermalink }}" 
         alt="团队在红林花海的活动合照：蓝天白云下，全体成员身着休闲装在花田中比心"
         class="active"
         onerror="handleImageError(this)">

    <button class="gallery-nav right" onclick="handleNavClick(1)" aria-label="下一张图片">&#10094;</button>
  </div>

  <!-- 缩略图容器（支持触屏横向滚动） -->
  <div class="gallery-thumbnails" role="group" aria-label="画廊缩略图导航">
    <!-- 使用 Hugo range 遍历所有 images 文件夹图片 -->
    {{ $images := resources.Match "images/gallery/*" }}
    {{ range $index, $img := $images }}
      {{ $thumbnail := $img.Fill "150x150 Center" | fingerprint }}
      <div class="thumbnail-container" 
           role="button" 
           tabindex="0"
           aria-label="跳转到第 {{ add $index 1 }} 张图片"
           onclick="showImage({{ $index }})"
           onkeydown="if(event.key === 'Enter') showImage({{ $index }})">
        <img src="{{ $thumbnail.RelPermalink }}" alt="{{ $img.Name | humanize }} 缩略图">
      </div>
    {{ end }}
  </div>
</section>

<!-- 优化后的 CSS 样式 -->
<style>
.gallery-container {
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
}

.gallery-main {
  position: relative;
  padding: 0 40px;
}

#mainImage {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 50%;
  transition: background 0.3s;
  z-index: 10;
}

.gallery-nav:hover {
  background: rgba(0,0,0,0.8);
}

.gallery-nav.left { left: 10px; }
.gallery-nav.right { right: 10px; }

.gallery-thumbnails {
  display: flex;
  gap: 10px;
  padding: 20px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS 滚动优化 */
  scroll-behavior: smooth;
}

.thumbnail-container {
  flex: 0 0 auto;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail-container:hover, 
.thumbnail-container:focus {
  border-color: #007bff;
}

.thumbnail-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

/* 无障碍焦点状态 */
.thumbnail-container:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
</style>

<!-- 增强版 JavaScript 逻辑 -->
<script>
let currentImageIndex = 0;
let autoSwitchInterval = null;
const autoSwitchDelay = 8000; // 8秒切换
const images = Array.from(document.querySelectorAll('.thumbnail-container'));

// 初始化加载后自动播放
document.addEventListener('DOMContentLoaded', () => {
  startAutoSwitch();
});

function startAutoSwitch() {
  if (autoSwitchInterval) clearInterval(autoSwitchInterval);
  autoSwitchInterval = setInterval(() => showNextImage(), autoSwitchDelay);
}

function handleNavClick(offset) {
  const newIndex = (currentImageIndex + offset + images.length) % images.length;
  showImage(newIndex);
  startAutoSwitch(); // 每次交互后重置定时器
}

function showImage(index) {
  const newMainImage = images[index].querySelector('img').cloneNode();
  newMainImage.src = newMainImage.src.replace('150x150', '1200x500'); // 动态加载大图
  
  // 平滑过渡动画
  const mainImage = document.getElementById('mainImage');
  mainImage.style.opacity = 0;
  setTimeout(() => {
    mainImage.src = newMainImage.src;
    mainImage.alt = newMainImage.alt.replace('缩略图', '');
    mainImage.style.opacity = 1;
    currentImageIndex = index;
    updateActiveThumbnail();
  }, 300);
}

function updateActiveThumbnail() {
  images.forEach((img, index) => {
    img.classList.toggle('active', index === currentImageIndex);
    img.style.opacity = index === currentImageIndex ? 1 : 0.6;
  });
}

function showNextImage() {
  handleNavClick(1);
}

// function handleImageError(img) {
//   console.error('图像加载失败:', img.src);
//   img.src = '{{ "images/placeholder.jpg" | absURL }}';
//   img.alt = '图片暂时无法加载，请稍后刷新尝试';
// }
</script>
