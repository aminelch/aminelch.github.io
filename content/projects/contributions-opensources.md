---
title: Mes contributions OpenSource
icon: contribution
slug: 'mes-contributions-opensource'
draft: false
date: 2025-03-11
tags: [opensource, github, contributions, cli-tools, devops, tldr-pages, bug-fix]
url: '/projects/contributions-opensource'
description: >
    Une collection de mes contributions aux projets open source, incluant des pull requests, des traductions, et des améliorations pour des projets communautaires.
---

Une collection de contributions que j'ai apportées aux projets open source🚀.

# Pull requests (PR)

### awesome-zsh-plugins
Le projet [awesome-zsh-plugins](https://github.com/unixorn/awesome-zsh-plugins) regroupe une vaste collection de plugins pour étendre [Zsh](https://zsh.sourceforge.io/). J’y ai contribué en développant [zenquotes](https://github.com/aminelch/zenquotes), un plugin affichant des citations inspirantes dans le terminal via l’API [zenquotes.io](https://zenquotes.io/). Il est désormais listé sur la page des [plugins](https://github.com/unixorn/awesome-zsh-plugins?tab=readme-ov-file#plugins).

- [PR#1972](https://github.com/unixorn/awesome-zsh-plugins/pull/1972) - ➕ Add zenquotes plugin

### Hashicorp Vagrant
[Vagrant](https://developer.hashicorp.com/vagrant) est un outil open-source développé par HashiCorp qui permet de créer, configurer et gérer des environnements de développement virtualisés de manière simple et reproductible.

- [PR#13604](https://github.com/hashicorp/vagrant/pull/13604) - ✍ vagrant validate: Add an example demonstrating how to validate a Vagrantfile while ignoring provider-specific configurations

### tldr-pages

Le projet [TLDR-PAGES](https://tldr.sh/) est une collection de pages d'aide à la communauté pour les outils de ligne de commande, qui vise à être un complément plus simple et plus accessible [aux pages de manuel Unix/Linux](https://linux.die.net/man) traditionnelles.

- [PR#15650](https://github.com/tldr-pages/tldr/pull/15650) - ➕ vagrant-box: add page

- [PR#15939](https://github.com/tldr-pages/tldr/pull/15939) - ➕ vagrant-halt: add page

- [PR#15682](https://github.com/tldr-pages/tldr/pull/15682) - ➕ vagrant-plugin: add page

- [PR#15900](https://github.com/tldr-pages/tldr/pull/15900) - ➕ vagrant-validate: add page 

- [PR#15650](https://github.com/tldr-pages/tldr/pull/15650) - 🌐 vagrant, vagrant-plugin: add French translation

- [PR#15828](https://github.com/tldr-pages/tldr/pull/15828) - ➕ composer audit: add page

- [PR#15938](https://github.com/tldr-pages/tldr/pull/15938) - ✍  phpstan: edit page

- [PR#16214](https://github.com/tldr-pages/tldr/pull/16214) - ➕ chkfont: add page

- [PR#16212](https://github.com/tldr-pages/tldr/pull/16212) - ➕ figlist: add page

- [PR#16193](https://github.com/tldr-pages/tldr/pull/16193) - ➕ ansible-lint: add page

À la suite de ces contributions, j’ai eu le plaisir d’être ajouté en tant que Repository Collaborator sur le dépôt principal, ce qui me permet désormais de relire, valider et accompagner d'autres contributeurs sur le projet — dans la limite du temps que je peux y consacrer entre mes différentes occupations🤖.

Mon nom figure désormais parmi les collaborateurs officiels sur cette page: 

💠 [MAINTAINERS.md](https://github.com/tldr-pages/tldr/blob/main/MAINTAINERS.md#repository-collaborators)

### tabby

[Tabby](https://tabby.sh/) (anciennement Terminus) est un émulateur de terminal hautement configurable, ainsi qu'un client SSH et port série pour Windows, macOS et Linux.

- [PR#10283](https://github.com/Eugeny/tabby/pull/10283) - ➕ Add Tokyonight color scheme

### Congo

[Congo](https://jpanther.github.io/congo/) Un template puissant et léger pour [Hugo](https://gohugo.io/) construit avec Tailwind CSS.

- [PR#986](https://github.com/jpanther/congo/pull/986) - 🐛 Fix: Correct absolute path for shebang in shell script

### Autres

- [PR#1](https://github.com/mercuryseries/panterest/pull/1) - 🐛 Fix: Layout path for the 404 error template

# Issues
- [Issue#5792](https://github.com/docker/cli/issues/5792) - 🐞 Issue with the `username` option in docker login  
  when using `--password-stdin`

La commande docker login échouait lors de l'utilisation de certains paramètres.

Le correctif a été ajouté [le 25 avril 2025](https://github.com/docker/cli/issues/5792#issuecomment-2830715671) et publié le 19 mai 2025 dans Docker CLI [v28.2.0-rc.1](https://github.com/docker/cli/releases/tag/v28.2.0-rc.1)


- [Issue#4](https://github.com/JetBrains/fleet-theme-plugin-template/issues/4) - 🐞 [Fleet Plugin Template] Plugin dependencies fail to download – 403 Forbidden

Le plugin ne parvient pas à se charger en raison d’une erreur 403 Forbidden lors de la tentative de téléchargement 
des dépendances depuis le dépôt de plugins de [JetBrains](https://www.jetbrains.com/).

Pour un suivi détaillé et complet, cette issue est consultable sur [YouTrack](https://youtrack.jetbrains.com/issue/FL-32047/Marketplace-does-not-support-in-jar-names).

