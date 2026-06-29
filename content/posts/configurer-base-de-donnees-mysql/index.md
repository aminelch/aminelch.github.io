---
aliases:
- /posts/configurer-base-de-donnees-mysql/
coverAlt: 'Logo MySQL depuis <a href="https://www.mysql.com/about/legal/logos.html">Unsplash</a>

  '
coverCaption: 'Logo MySQL depuis <a href="https://www.mysql.com/about/legal/logos.html">mysql.com</a>

  '
date: 2025-09-02
tags:
- MySQL
- RDBMS
- DBA
title: Configurer une nouvelle base de données et un utilisateur dans MySQL
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