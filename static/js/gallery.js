document.addEventListener('DOMContentLoaded', function() {
  const lightbox = new PhotoSwipe({
    bgOpacity: 0.9,
    spacing: 30,
    loop: false
  });
  
  // 懒加载实现
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
});