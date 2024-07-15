---
title: People
date: 2024-07-03
type: landing
sections:
  - block: markdown
    content:
      title: The Team
      text: |
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <style>
          .container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: flex-start;
          }
          .person {
            flex: 1 1 calc(20% - 20px);
            max-width: calc(20% - 20px);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 20px;
          }
          .person img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            margin-bottom: 10px;
          }
          .person p {
            margin: 0;
          }
          .person .name {
            font-size: 14px;
          }
          .person .details {
            font-size: 12px;
          }
          .person .email, .person .scholar {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5px;
            cursor: pointer;
          }
          .person .email .fa-envelope, .person .scholar .fa-graduation-cap {
            margin-right: 5px;
          }
          .person .email span, .person .scholar span {
            display: none;
            font-size: 12px;
          }
          .person .email:hover span, .person .scholar:hover span {
            display: inline;
          }
          @media (max-width: 1200px) {
            .person {
              flex: 1 1 calc(25% - 20px);
              max-width: calc(25% - 20px);
            }
          }
          @media (max-width: 992px) {
            .person {
              flex: 1 1 calc(33.33% - 20px);
              max-width: calc(33.33% - 20px);
            }
          }
          @media (max-width: 768px) {
            .person {
              flex: 1 1 calc(50% - 20px);
              max-width: calc(50% - 20px);
            }
          }
          @media (max-width: 576px) {
            .person {
              flex: 1 1 100%;
              max-width: 100%;
            }
          }
        </style>
        <script>
          function copyToClipboard(email) {
            navigator.clipboard.writeText(email).then(function() {
              alert('Email copied to clipboard: ' + email);
            }, function(err) {
              console.error('Could not copy text: ', err);
            });
          }
        </script>
        
        <div class="group-photo">
          <img src="/images/课题组合照.jpg" alt="Group Photo">
        </div>

        ---

        ## Principle Investigator

        <div class="container">
          <div class="person">
            <a href="/people/Xu/"><img src="/people/Xu/avatar.jpg" alt="Shidang Xu 许适当"></a>
            <p class="name"><a href="/people/Xu/">Shidang Xu 许适当</a></p>
            <p class="details">Professor in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('xusd@scut.edu.cn')">
              <i class="fas fa-envelope"></i><span>xusd@scut.edu.cn</span>
            </div>
            <div class="scholar" onclick="window.open('https://scholar.google.com/citations?user=HiGQESUAAAAJ&hl=zh-CN&oi=ao')">
              <i class="fas fa-graduation-cap"></i><span>Google Scholar</span>
            </div>
          </div>
        </div>
---
