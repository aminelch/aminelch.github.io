---
date: 2025-05-31
draft: false
description: |
  "Retour"
tags: [tldr-pages, cli-tools, linux, system-administration, devops, opensource, fsf]
title: >
  Un compagnon moderne aux pages man en mode CLI
coverAlt: >
    Illustration issue du dépôt GitHub officiel du projet TLDR-pages – publiée sous licence [MIT](https://github.com/tldr-pages/tldr/blob/main/LICENSE.md)
coverCaption: >
    Illustration issue du dépôt GitHub officiel du projet TLDR-pages – publiée sous licence [MIT](https://github.com/tldr-pages/tldr/blob/main/LICENSE.md)
---

**T**ravailler en ligne de commande implique fréquemment de consulter les pages `man`. Bien que ceci est un indispensables, ces dernières peuvent s'avérer trop techniques ou détaillées lorsqu'on recherche simplement un exemple d'utilisation rapide.

C’est là que **TLDR-pages** entre en jeu : une documentation communautaire plus simple, adaptée à un large spectre d’utilisateurs, des experts aux novices.

Dans ce billet orienté [CLI](/tags/cli-tools/), je vous propose une plongée dans TLDR-pages.
Nous verrons comment l’installer proprement, que vous soyez sur une Debian minimaliste ou un Arch full-custom, avant de passer à des cas d’usage concrets en terminal.


## Qu'est-ce que TLDR-pages ?

[TLDR-pages](https://tldr.sh/) (**Too Long; Didn't Read**) est une collection de pages d'aide pour commandes CLI. Chaque pages propose :

* Des exemples concrets et concis pour les outils les plus courants, sans avoir à parcourir l'intégralité d'une page de manuel
* Les cas d'utilisation les plus fréquents
* Une alternative légère aux pages [man]( https://man7.org/linux/man-pages/) traditionnelles

**Voici un aperçu de ce que donne `tldr ssh` :**

![](tldr.png)

## Installation

Parmi les nombreux clients disponibles pour TLDR-pages, le client Python ([tldr-python-client](https://github.com/tldr-pages/tldr-python-client)) est particulièrement pratique pour les systèmes [Unix](https://unix.org/)/[Linux](https://www.linuxfoundation.org/) où l'interpréteur [Python](https://www.python.org/) est généralement préinstallé par défaut.

1. ### Installation simple et répandue avec Python 

```bash
pip install tldr
```

2. ### Méthode alternative avec Node.js

```bash
npm install -g tldr
```

{{< alert >}}
**SUCCESS:** Pour consulter la liste complète des clients TLDR disponibles, rendez-vous à cette adresse: [tldr-pages/tldr#clients](https://github.com/tldr-pages/tldr#clients)
{{< /alert >}}

## Commandes utiles

Voici quelques options utiles que vous pouvez utiliser avec la commande tldr :

```bash
# Mettre à jour la base de données des pages locales
$ tldr --update

# Rechercher une commande contenant un mot-clé
$ tldr --search archive

# Afficher la page d'aide d'une commande spécifique
$ tldr tar

# Afficher la page d'une commande avec une plateforme cible (par exemple, linux)
$ tldr --platform linux cp
```
## Conclusion

**TLDR-pages** est devenu pour moi [un réflexe quotidien](/projects/contributions-opensource/#tldr-pages): il simplifie l’accès à la documentation CLI avec des exemples clairs, à jour et directement exploitables. C’est un compagnon naturel aux pages [man]( https://man7.org/linux/man-pages/).

Je fais d’ailleurs partie de l’[équipe de développement du projet](https://github.com/tldr-pages/tldr/blob/main/MAINTAINERS.md), ce qui me permet d’y apporter des retours fondés sur une utilisation régulière en contexte réel.