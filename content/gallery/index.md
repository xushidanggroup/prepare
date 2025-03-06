---
title: "Gallery"
date: 2024-06-04
type: "landing"
sections:
  - block: markdown
    content:
      text: |
        <script>
        // 声明全局变量
        let currentIndex = 0; // ✨ 新增：明确定义当前索引
        let autoSwitchInterval;

        // 自动配置图片列表
        const imageBasePath = '/images/';
        const imageExtensions = ['.jpg', '.jpeg', '.png'];

        // 🐛 修复：使用更安全的文件名处理方式
        const imageFiles = [
            '冬至',
            '大南山_1',
            '大南山_2',
            '大南山_3',
            '大南山_4',
            '大南山_5',
            '大南山_6'
        ];

        // ✨ 改进：更健壮的路径生成逻辑
        const images = imageFiles.map(fileName => {
            // 分离文件名和扩展名
            const [baseName, ...rest] = fileName.split('.');
            const extension = rest.length > 0 ? `.${rest.pop()}` : 
                imageExtensions.find(ext => {
                    // 检查文件实际是否存在（需要服务器端配合）
                    const img = new Image();
                    img.src = `${imageBasePath}${baseName}${ext}`;
                    return img.width > 0;
                }) || '.jpg';
            
            return {
                src: `${imageBasePath}${baseName}${extension}`,
                alt: baseName.replace(/_/g, ' ')
            };
        });

        // ✨ 新增：缩略图激活状态样式
        function updateActiveThumbnail(index) {
            document.querySelectorAll('.thumbnail-container').forEach((container, i) => {
                container.classList.toggle('active', i === index);
            });
        }

        // 🐛 修复：补充缺失的自动切换函数
        function resetAutoSwitch() {
            clearInterval(autoSwitchInterval);
            autoSwitchInterval = setInterval(showNextImage, 5000);
        }

        function autoSwitchImages() {
            resetAutoSwitch();
        }

        // ✨ 改进：带错误处理的图片加载
        function loadImageWithFallback(src) {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => resolve('/images/fallback.jpg'); // 备用图片路径
            });
        }

        // ✨ 优化后的图片切换函数
        async function showImage(index, quick = false) {
            // 边界检查
            if (index < 0 || index >= images.length) return;
            
            const mainImage = document.getElementById('mainImage');
            mainImage.style.opacity = 0;

            // 预加载图片
            const actualSrc = await loadImageWithFallback(images[index].src);
            
            setTimeout(() => {
                mainImage.src = actualSrc;
                mainImage.alt = images[index].alt;
                mainImage.style.opacity = 1;
                currentIndex = index;
                updateActiveThumbnail(index); // ✨ 更新激活状态
            }, quick ? 500 : 1000);

            resetAutoSwitch();
        }

        // ✨ 新增：键盘导航支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
        });

        // 初始化画廊
        document.addEventListener('DOMContentLoaded', () => {
            generateThumbnails();
            if (images.length > 0) {
                // ✨ 新增：加载首张图片后显示
                loadImageWithFallback(images[0].src).then(src => {
                    mainImage.src = src;
                    mainImage.style.opacity = 1;
                });
                updateActiveThumbnail(0);
            }
            autoSwitchImages();
        });
        </script>

        <style>
        /* ✨ 新增激活状态样式 */
        .thumbnail-container.active img {
            transform: scale(1.15);
            border: 3px solid #2196F3;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        </style>
---
