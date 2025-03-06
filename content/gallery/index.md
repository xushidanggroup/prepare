<style>
    h1 {
        text-align: center;
        margin-bottom: 1px;
    }

    .gallery {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .gallery-thumbnails {
        display: flex;
        justify-content: start;
        gap: 10px;
        overflow-x: auto;
        white-space: nowrap;
        width: 100%;
        padding: 1px;
        box-sizing: border-box;
    }

    .thumbnail-container {
        display: inline-block;
        cursor: pointer;
        position: relative;
        pointer-events: none;
    }

    .thumbnail-container img {
        max-width: 150px;
        max-height: 100px;
        width: auto;
        height: auto;
        transition: transform 0.3s, border 0.3s;
        pointer-events: auto;
    }

    .thumbnail-container img:hover {
        transform: scale(1.1);
        border: none;
    }

    .gallery-main {
        width: 100%;
        max-width: 95vw;
        text-align: center;
        position: relative;
        margin-top: 20px;
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
        padding: 5px;
        cursor: pointer;
        z-index: 1;
    }

    .gallery-nav.left {
        left: 5px;
    }

    .gallery-nav.right {
        right: 5px;
    }

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
    <div class="gallery-thumbnails">
        <div class="thumbnail-container" onclick="showImage(0, true)">
            <img src="/images/清远漂流.jpg" alt="Thumbnail 清远漂流">
        </div>
        <div class="thumbnail-container" onclick="showImage(1, true)">
            <img src="/images/冬至.jpg" alt="Thumbnail 冬至">
        </div>
        <div class="thumbnail-container" onclick="showImage(2, true)">
            <img src="/images/石门.jpg" alt="Thumbnail 石门">
        </div>
        <div class="thumbnail-container" onclick="showImage(3, true)">
            <img src="/images/石门1.jpg" alt="Thumbnail 石门1">
        </div>
        <div class="thumbnail-container" onclick="showImage(4, true)">
            <img src="/images/石门2.jpg" alt="Thumbnail 石门2">
        </div>
        <div class="thumbnail-container" onclick="showImage(5, true)">
            <img src="/images/石门音乐.jpg" alt="Thumbnail 石门音乐">
        </div>
        <div class="thumbnail-container" onclick="showImage(6, true)">
            <img src="/images/红林花海.jpg" alt="Thumbnail 红林花海">
        </div>
        <div class="thumbnail-container" onclick="showImage(7, true)">
            <img src="/images/羽毛球赛.jpg" alt="Thumbnail 羽毛球赛">
        </div>
        <div class="thumbnail-container" onclick="showImage(8, true)">
            <img src="/images/课题组合照.jpg" alt="Thumbnail 课题组合照">
        </div>
        <div class="thumbnail-container" onclick="showImage(9, true)">
            <img src="/images/毕业典礼合照.jpg" alt="Thumbnail 毕业典礼合照">
        </div>
        <div class="thumbnail-container" onclick="showImage(10, true)">
            <img src="/images/龙林毕业聚餐.jpg" alt="Thumbnail 龙林毕业聚餐">
        </div>
        <div class="thumbnail-container" onclick="showImage(11, true)">
            <img src="/images/大南山_1.jpg" alt="Thumbnail 大南山_1">
        </div>
        <div class="thumbnail-container" onclick="showImage(12, true)">
            <img src="/images/大南山_2.jpg" alt="Thumbnail 大南山_2">
        </div>
        <div class="thumbnail-container" onclick="showImage(13, true)">
            <img src="/images/大南山_3.jpg" alt="Thumbnail 大南山_3">
        </div>
        <div class="thumbnail-container" onclick="showImage(14, true)">
            <img src="/images/大南山_4.jpg" alt="Thumbnail 大南山_4">
        </div>
        <div class="thumbnail-container" onclick="showImage(15, true)">
            <img src="/images/大南山_5.jpg" alt="Thumbnail 大南山_5">
        </div>
        <div class="thumbnail-container" onclick="showImage(16, true)">
            <img src="/images/大南山_6.jpg" alt="Thumbnail 大南山_6">
        </div>
    </div>
    <div class="gallery-main">
        <button class="gallery-nav left" onclick="showPreviousImage()">&#10094;</button>
        <img src="/images/清远漂流.jpg" alt="Main Image" id="mainImage">
        <button class="gallery-nav right" onclick="showNextImage()">&#10095;</button>
    </div>
</div>

<script>
    const images = [
        { src: '/images/清远漂流.jpg'},
        { src: '/images/冬至.jpg' },
        { src: '/images/石门.jpg' },
        { src: '/images/石门1.jpg' },
        { src: '/images/石门2.jpg' },
        { src: '/images/石门音乐.jpg' },
        { src: '/images/红林花海.jpg' },
        { src: '/images/羽毛球赛.jpg' },
        { src: '/images/课题组合照.jpg' },
        { src: '/images/毕业典礼合照.jpg' },
        { src: '/images/龙林毕业聚餐.jpg' },
        { src: '/images/大南山_1.jpg' },
        { src: '/images/大南山_2.jpg' },
        { src: '/images/大南山_3.jpg' },
        { src: '/images/大南山_4.jpg' },
        { src: '/images/大南山_5.jpg' },
        { src: '/images/大南山_6.jpg' },
    ];

    let currentIndex = 0;
    let autoSwitchInterval;
    const transitionTime = 1000; // 1 second
    const quickTransitionTime = 500; // 0.5 second
    const autoSwitchDelay = 5000; // 自动切换间隔（5秒）

    // 显示指定图像并应用平滑过渡
    function showImage(index, quick = false) {
        currentIndex = index;
        const mainImage = document.getElementById('mainImage');

        if (quick) {
            mainImage.style.transition = `opacity ${quickTransitionTime}ms ease-in-out`;
        } else {
            mainImage.style.transition = `opacity ${transitionTime}ms ease-in-out`;
        }

        mainImage.style.opacity = 0;

        setTimeout(() => {
            mainImage.src = images[index].src;
            mainImage.style.opacity = 1;
        }, quick ? quickTransitionTime : transitionTime);

        resetAutoSwitch();  // 用户点击时重启计时器
    }

    // 显示下一个图像
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex, true);
    }

    // 显示上一个图像
    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex, true);
    }

    // 启动自动切换图像
    function autoSwitchImages() {
        autoSwitchInterval = setInterval(showNextImage, autoSwitchDelay); // 每5秒自动切换
    }

    // 重置自动切换计时器
    function resetAutoSwitch() {
        clearInterval(autoSwitchInterval);  // 清除当前的定时器
        autoSwitchImages();  // 重新启动自动切换
    }

    // 页面加载完成后启动自动切换
    document.addEventListener('DOMContentLoaded', () => {
        autoSwitchImages();  // 页面加载后启动自动切换
    });
</script>