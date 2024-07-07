---
title: "Contact"
date: 2024-07-07
---

<style>
.contact-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.contact-details {
    max-width: 45%;
}
.contact-map {
    max-width: 50%;
    overflow: hidden; /* Ensure overflow is hidden for zoom effect */
    position: relative;
}
.contact-map img {
    width: 100%;
    height: auto;
    transition: transform 0.25s ease; /* Smooth zoom transition */
    cursor: zoom-in; /* Change cursor on hover */
}
.contact-map img.zoomed {
    transform: scale(2); /* Scale image to 2x on click */
    cursor: zoom-out; /* Change cursor on zoomed state */
}
.additional-image {
    margin-top: 20px;
    text-align: center;
}
.additional-image img {
    max-width: 100%;
    height: auto;
}
</style>

<div class="contact-container">
    <div class="contact-details">
        <p><strong>Primary contact:</strong> Shidang Xu</p>
        <p><strong>Email:</strong> xusd@scut.edu.cn</p>
        <p><strong>Phone:</strong> 13717051839</p>
        <p><strong>Address:</strong> No. 777, Xingye Avenue, Guangzhou, 510006</p>
        <p><strong><a href="https://calendly.com/xushidang" target="_blank">Book an appointment</a></strong></p>
    </div>
    <div class="contact-map">
        <img src="/images/毕业典礼合照.jpg" alt="Map" id="mapImage">
    </div>
</div>

<div class="additional-image">
    <img src="/images/红林花海.jpg" alt="SCUT">
</div>

<script>
document.getElementById('mapImage').addEventListener('click', function() {
    this.classList.toggle('zoomed');
});
</script>
