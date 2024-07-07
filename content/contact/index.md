---
title: "Contact"
date: 2024-07-07
---

<style>
.navbar {
    position: fixed; /* 或者 relative，根据你的需求 */
    top: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.navbar-menu {
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
}

.navbar-menu li {
    display: inline;
}

.navbar-menu a {
    display: block;
    padding: 15px;
    text-decoration: none;
    color: #333;
}

body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    max-width: 100%;
    color: #333;
    line-height: 1.6;
}
h1, h2, h3, h4, h5, h6 {
    color: #222;
    margin-bottom: 20px;
}
.contact-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}
.contact-details, .contact-map {
    flex: 1 1 45%;
    margin: 10px;
    box-sizing: border-box;
}
.contact-details p, .contact-details a {
    font-size: 16px;
}
.contact-map iframe {
    width: 100%;
    height: 300px;
    border: 0;
}
.campus-image {
    margin-top: 20px;
    text-align: center;
    width: 100%;
}
.campus-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
@media (max-width: 768px) {
    .contact-details, .contact-map {
        flex: 1 1 100%;
    }
}
</style>

<h1>Contact Us</h1>

<div class="contact-container">
    <div class="contact-details">
        <p><strong>Primary contact:</strong> Shidang Xu</p>
        <p><strong>Email:</strong> <a href="mailto:xusd@scut.edu.cn">xusd@scut.edu.cn</a></p>
        <p><strong>Phone:</strong> 13717051839</p>
        <p><strong>Address:</strong> No. 777, Xingye Avenue, Guangzhou, 510006</p>
        <p><strong><a href="https://calendly.com/xushidang" target="_blank">Book an appointment</a></strong></p>
    </div>
    <div class="contact-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.938297122623!2d113.4086811!3d23.0101661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403abfa009032d7%3A0xc48aa276ff6bccb0!2z5Lit5Zu95a2m5ZyL5ZOB5biC5bel5YWt5ZOB5qWa6YOo5ZyS!5e0!3m2!1szh-CN!2sus!4v1625240411027!5m2!1szh-CN!2sus" allowfullscreen="" loading="lazy"></iframe>
    </div>
</div>

<div class="campus-image">
    <img src="./图书馆鸟瞰.png" alt="图书馆鸟瞰">
</div>
