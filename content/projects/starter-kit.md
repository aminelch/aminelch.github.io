---
title: Starter Kit
icon: starter-kit
slug: 'starter-kit'
date: 2023-01-04
tags: [bash, automatisation, scripting]
url: '/projects/starter-kit'

description: >
  StarterKit est un script Bash, conçu pour automatiser la mise en place d’une workstation vide en quelques minutes
---


**StarterKit** est un script [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) que j'ai développé au début de 
ma carrière en tant que développeur backend. Il est conçu pour automatiser la mise en place d’une workstation vide en 
quelques minutes. 
Il suit les standards [POSIX](https://www.techtarget.com/whatis/definition/POSIX-Portable-Operating-System-Interface) et exécute plusieurs tâches essentielles pour assurer un environnement prêt à l’emploi.

**Fonctionnalités principales** :

- Installation d’outils clés : Docker, Git et d’autres logiciels nécessaires.
- Configuration des clés SSH : Génération et ajout automatique et fixation des permissions.
- Installation et configuration de [Zsh](https://www.zsh.org/) :
  - Installation de Zsh et [Oh My Zsh](https://ohmyz.sh/).
  - Application d’un thème personnalisé développé en interne.
  - Configuration des plugins : zsh-autosuggestions, z,zsh-syntax-highlighting et git.
- Templates prêts à l’emploi :
  - Personnalisation avec le nom et l’email de l’employé
  - `.gitignore` adapté aux projets courants.
  - `.gitconfig` préconfiguré avec des alias, des options optimisées pour le pull, ainsi qu'une politique de rebase 
    par défaut et des options de fusion adaptées.
- Gestion des permissions : Ajustement des droits sur certains fichiers et dossiers. 
- Support SSL/TLS local : Installation d’un certificat d’autorité pour Firefox et Chrome.
