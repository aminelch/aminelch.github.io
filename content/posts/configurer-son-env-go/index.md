---
date: 2024-12-29
draft: false
description: |
  Guide pour configurer de votre environnement GoLang.
tags:
  - golang
  - installer
  - automatisation
  - bash
title: >
  Bien configurer son environnement golang
coverAlt: >
    Photo de Kolade Chris depuis <a href="https://www.freecodecamp.org/news/content/images/size/w2000/2021/10/golang.png">freecodecamp</a>
coverCaption: >
    Photo de Kolade Chris depuis <a href="https://www.freecodecamp.org/news/content/images/size/w2000/2021/10/golang.png">freecodecamp</a>
---

### TLDR;

Depuis quelques mois, au gré de mes explorations des nouvelles technologies, j'ai découvert Go, un langage prometteur mettant en avant la simplicité, la performance et la gestion efficace de la concurrence. Très vite, je suis tombé amoureux de ce langage qui permet d'aller plus vite et de développer avec une efficacité imprévisible.
Aujourd'hui, et à travers ce billet, je vous guide sur la manière de configurer efficacement votre environnement GO.

#### Installation et configuration de Go

{{< alert >}}
**Note:** Pour ce billet, j'ai choisi la version 1.23.4 de Go.
{{< /alert >}}


Commençant par le téléchargement de l'archive depuis le site officiel de [GO↗](https://go.dev/dl/)

```bash
curl -LO https://go.dev/dl/go1.23.4.linux-amd64.tar.gz
```

Une fois l'archive téléchargée, décompressez-la à cet emplacement.

```bash
tar -C /usr/local -xvzf go1.23.4.linux-amd64.tar.gz
```

Pour que Go soit accessible par tous les utilisateurs, ajoutez son chemin au `$PATH` global :
- Ouvrez le fichier `/etc/profile` (ou un autre fichier global comme `/etc/zshenv` si vous utilisez zsh, par exemple).

- Ajoutez cette ligne : `export PATH=$PATH:/usr/local/go/bin`

- Rechargez la configuration : `source /etc/profile`

Cela garantit que la commande go est disponible dans tous les shells.


#### Tester l'installation de Go

```bash
go version
go version go1.23.4 linux/amd64
```

#### Script d'automatisation

Pour éviter ces configurations manuelles, vous pouvez utiliser le script que j'ai déjà préparé et qui automatise ces
étapes. Le script est disponible sur ce dépôt [GitLab↗](https://gitlab.com/cool-devops-stuff/automation-scripts/-/blob/main/go/configure-go.sh?ref_type=heads).

Commencez par le clonage de dépôt, puis exécutez le script comme ceci :

```bash
git git@gitlab.com:cool-devops-stuff/automation-scripts.git
cd automation-scripts/go
bash configure-go.sh
```
### Clusion

Configurer votre environnement Golang sur Linux est une étape essentielle pour tout développeur. Que vous optiez pour une configuration manuelle, l'utilisation d'un gestionnaire de paquets ou encore l'exécution d'un script, cet article vous guide à travers les deux approches.

Si vous avez des suggestions, n'hésitez pas à contribuer au dépôt [GitLab↗](https://gitlab.com/cool-devops-stuff/automation-scripts) ou si vous aimez ce petit script, merci de lui
donner une étoile ⭐.
