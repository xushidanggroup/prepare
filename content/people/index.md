---
title: The Team
date: 2024-07-03
---

<style>
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .people-section {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    .person-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150px;
    }

    .person-container img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
        transition: transform 0.3s;
    }

    .person-container img:hover {
        transform: scale(1.1);
    }

    .person-name, .person-role {
        text-align: center;
        margin-top: 10px;
    }
</style>

<div class="people-section">
    {{ range .Pages }}
        <div class="person-container">
            <img src="{{ .RelPermalink }}avatar.jpg" alt="{{ .Title }}">
            <div class="person-name">{{ .Title }}</div>
            <div class="person-role">{{ .Params.role }}</div>
        </div>
    {{ end }}
</div>
