---
title: Gallery
date: 2023-06-19T12:00:00Z
---

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

    .gallery-main {
        width: 100%;
        max-width: 90vw;
        text-align: center;
        position: relative;
        margin-top: 1px;
    }

    .gallery-main img {
        max-width: 100%;
        max-height: 100vh;
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

    .gallery-thumbnails-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
    }

    .gallery-thumbnails {
        display: flex;
        justify-content: start;
        gap: 10px;
        white-space: nowrap;
        padding: 1px;
        box-sizing: border-box;
        transition: transform 0.3s ease-in-out;
    }

    .thumbnail-container {
        display: inline-block;
        cursor: pointer;
        position: relative;
    }

    .thumbnail-container img {
        max-width: 150px;
        max-height: 100px;
        width: auto;
        height: auto;
        transition: transform 0.3s, border 0.3s;
    }

    .thumbnail-container img:hover {
        transform: scale(1.1);
        border: none;
    }

    .scroll-zone {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100px;
        z-index: 1;
    }

    .scroll-zone.left {
        left: 0;
    }

    .scroll-zone.right {
        right: 0;
    }

    .scroll-zone:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>

<div class="gallery">
    <div class="gallery-main">
        <button class="gallery-nav left" onclick="showPreviousImage()">&#10094;</button>
        <img src="/images/冬至.jpg" alt="Main Image" id="mainImage">
        <button class="gallery-nav right" onclick="showNextImage()">&#10095;</button>
    </div>
    <div class="gallery-thumbnails-container">
        <div class="scroll-zone left" id="scrollLeft" style="height: 100px;"></div>
        <div class="gallery-thumbnails" id="thumbnails">
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
                <img src="/images/红林花海.jpg" alt="Thumbnail 红林花海">
            </div>
            <div class="thumbnail-container" onclick="showImage(6, true)">
                <img src="/images/羽毛球赛.jpg" alt="Thumbnail 羽毛球赛">
            </div>
            <div class="thumbnail-container" onclick="showImage(7, true)">
                <img src="/images/课题组合照.jpg" alt="Thumbnail 课题组合照">
            </div>
            <div class="thumbnail-container" onclick="showImage(8, true)">
                <img src="/images/毕业典礼合照.jpg" alt="Thumbnail 毕业典礼合照">
            </div>
            <div class="thumbnail-container" onclick="showImage(9, true)">
                <img src="/images/龙林毕业聚餐.jpg" alt="Thumbnail 龙林毕业聚餐">
            </div>
        </div>
        <div class="scroll-zone right" id="scrollRight" style="height: 100px;"></div>
    </div>
</div>

<script>
    const images = [
        { src: '/images/清远漂流.jpg'},
        { src: '/images/冬至.jpg' },
        { src: '/images/石门.jpg' },
        { src: '/images/石门1.jpg' },
        { src: '/images/石门2.jpg' },
        { src: '/images/红林花海.jpg' },
        { src: '/images/羽毛球赛.jpg' },
        { src: '/images/课题组合照.jpg' },
        { src: '/images/毕业典礼合照.jpg' },
        { src: '/images/龙林毕业聚餐.jpg' }
    ];

    let currentIndex = 1;
    let autoSwitchInterval;
    let scrollInterval;
    const transitionTime = 1000;
    const quickTransitionTime = 500;
    const scrollSpeed = 2;

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

        resetAutoSwitch();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex, true);
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex, true);
    }

    function autoSwitchImages() {
        autoSwitchInterval = setInterval(showNextImage, 5000);
    }

    function resetAutoSwitch() {
        clearInterval(autoSwitchInterval);
        autoSwitchImages();
    }

    function startScrolling(direction) {
        scrollInterval = setInterval(() => {
            const thumbnails = document.getElementById('thumbnails');
            thumbnails.scrollBy({ left: direction * scrollSpeed, behavior: 'smooth' });
        }, 20);
    }

    function stopScrolling() {
        clearInterval(scrollInterval);
    }

    document.addEventListener('DOMContentLoaded', () => {
        autoSwitchImages();

        const scrollLeftZone = document.getElementById('scrollLeft');
        const scrollRightZone = document.getElementById('scrollRight');

        scrollLeftZone.addEventListener('mouseenter', () => startScrolling(-1));
        scrollLeftZone.addEventListener('mouseleave', stopScrolling);
        scrollRightZone.addEventListener('mouseenter', () => startScrolling(1));
        scrollRightZone.addEventListener('mouseleave', stopScrolling);
    });
</script>
