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

**Voici un aperçu de ce que donne `tldr tar` :**

```shell
➜ ~ tldr tar

tar

Utilitaire d'archivage.
Souvent combiné avec une méthode de compression, telle que gzip ou bzip2.
Plus d'informations : https://www.gnu.org/software/tar.

- Crée une archive à partir de fichiers :
  tar cf chemin/vers/cible.tar chemin/vers/fichier1 chemin/vers/fichier2 ...

- Crée une archive gzip à partir de fichiers :
  tar czf chemin/vers/cible.tar.gz chemin/vers/fichier1 chemin/vers/fichier2 ...

- Crée une archive gzip à partir d'un répertoire en utilisant son chemin relatif :
  tar czf chemin/vers/cible.tar.gz --directory=chemin/vers/répertoire .

- Extrait une archive (compressée) dans le dossier courant en affichant la liste des fichiers traités :
  tar xvf chemin/vers/source.tar[.gz|.bz2|.xz]

- Extrait une archive (compressée) dans un répertoire cible :
  tar xf chemin/vers/source.tar[.gz|.bz2|.xz] --directory=répertoire

- Crée une archive compressée, en utilisant le suffixe de l'archive pour déterminer le programme de compression :
  tar caf chemin/vers/cible.tar.xz chemin/vers/fichier1 chemin/vers/fichier2 ...

- Liste les fichiers contenus dans une archive tar :
  tar tvf chemin/vers/source.tar

- Extrait les fichiers correspondant au motif :
  tar xf source.tar --wildcards "*.html"
```

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