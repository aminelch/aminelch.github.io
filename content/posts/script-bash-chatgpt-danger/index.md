---
aliases:
- /posts/script-bash-chatgpt-danger/
coverAlt: 'Photo de [Berke Citak](https://unsplash.com/@berctk) sur [Unsplash](https://unsplash.com/)

  '
coverCaption: 'Photo de [Berke Citak](https://unsplash.com/@berctk) libre en [License](https://unsplash.com/license)

  '
date: 2025-09-01
description: 'J’ai testé le pair scripting avec ChatGPT ; certains scripts Bash peuvent
  réellement briser votre OS si exécutés sans vigilance

  '
tags:
- linux
- sysadmin
- bash
- chatgpt
- ia
title: 'Le pair scripting avec ChatGPT peut brisé ton OS!

  '
---

> Un script Bash peut sembler anodin jusqu’au moment où il menace de rendre ton système **inutilisable**.

Un soir, un peu par curiosité, j’ai demandé à ChatGPT de m’aider à écrire un script pour modifier le shell par défaut de tous les utilisateurs sur une Debian. Rien de bien sorcier, pensais-je.

Le résultat ? Un script simple, efficace et terriblement **dangereux**.
Pourquoi ? Parce qu’il appliquait la modification à tous les comptes y compris le compte `root`` compris, mais aussi les comptes système. Autrement dit, un copier/coller un peu trop confiant, et je me retrouvais avec un root inutilisable, des comptes système cassés.

C’est à ce moment-là que j’ai compris que l'IA peut être un excellent compagnon de pair programming, mais elle ne connaît ni ton contexte, ni tes contraintes de sécurité.

![](prompt-gpt1.png)
![](prompt-gpt2.png)

<!-- La vraie valeur, c’est l’humain qui revoit, corrige et ajoute les garde-fous. -->
Dans mon cas, j’ai modifié le script pour :

- Exclure le compte `root`,
- Ignorer les faux shells (`/usr/sbin/nologin`, `/bin/false`),
- Cibler uniquement les vrais utilisateurs.

Finalement, parce qu’entre nous, si quelqu’un doit casser `/etc/passwd`, je préfère que ce soit moi 😎 au moins je saurai à qui m’en prendre. 😅