---
title: People
date: 2024-07-03
type: people
---

<div class="people-section">
    <h2>Principle Investigator</h2>
    {{ range where .Site.Pages "Section" "people" }}
        {{ if in .Params.user_groups "Principle Investigator" }}
            <div class="person">
                <img src="{{ .RelPermalink }}avatar.jpg" alt="{{ .Title }}">
                <h3>{{ .Title }}</h3>
                <p>{{ .Params.position }}</p>
            </div>
        {{ end }}
    {{ end }}

    <h2>Graduate Students</h2>
    {{ range where .Site.Pages "Section" "people" }}
        {{ if in .Params.user_groups "Graduate Students" }}
            <div class="person">
                <img src="{{ .RelPermalink }}avatar.jpg" alt="{{ .Title }}">
                <h3>{{ .Title }}</h3>
                <p>{{ .Params.position }}</p>
            </div>
        {{ end }}
    {{ end }}
</div>
