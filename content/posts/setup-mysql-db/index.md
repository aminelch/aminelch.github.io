---
title: Configurer une nouvelle base de données et un utilisateur dans MySQL
date: 2025-09-02
tags: ["MySQL", "RDBMS", "DBA"]
coverAlt: >
    Logo MySQL depuis <a href="https://www.mysql.com/about/legal/logos.html">Unsplash</a>
coverCaption: >
    Logo MySQL depuis <a href="https://www.mysql.com/about/legal/logos.html">Unsplash</a>
---


```bash
sudo mysql
```

```mysql
CREATE DATABASE my_database;

CREATE USER 'user'@'localhost' IDENTIFIED BY 'PASSWORD';

GRANT ALL PRIVILEGES ON my_database.* TO 'user'@'localhost';

flush privileges;
```