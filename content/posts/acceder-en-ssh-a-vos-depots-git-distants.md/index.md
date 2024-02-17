---
author: Amine LOUHICHI
date: '2024-01-07T21:50:58+01:00'
draft: true
description: |
  Ghost delivers a great self-hosted blogging platform that deploys well in containers.
  Let's deploy it on CoreOS along with Caddy. ️📝
tags:
  - ssh
title: >
    Accéder en SSH à vos dépôts distants Git 🔐
coverAlt: >
    Lots of gold-colored beams in the ceiling of a building in Lisbon, Porgugal
    with a blue sky behind them
coverCaption: >
  Photo de Markus Winkler depuis <a href="https://www.pexels.com/photo/grayscale-photo-of-padlock-on-metal-fence-5848614">Pexels</a>
---
### Introduction

Les clés **SSH** sont utilisées pour authentifier les connexions
sécurisées. En suivant ce guide, vous serez en mesure de
créer et de commencer à utiliser une clé SSH. Git est
capable d'utiliser des clés SSH à la place de
l'authentification par mot de passe traditionnelle lors d'un
push ou d'un pull avec des dépôts distants.

### Comment générer des clés SSH ?
Il faut alors générer une paire de clé SSH via la commande: `ssh-keygen`

A ce moment là, deux clés:
- `id_rsa` : clé privé a conserver sur son PC et à ne surtout pas partager
- `id_rsa.pub` : clé publique à envoyer sur les sur les machines avec lesquels vous voulez communiquer en SSH

### Mise en place du SSH sur Gitlab
La première étape consiste à copier le contenu du la clé SSH publique.

```bash
$- cat ~/.ssh/id_rsa|xclip -selection clipboard
```
Si la commande [xclip](https://doc.ubuntu-fr.org/xclip) n’est pas déjà installée, vous pouvez utiliser n'importe quel
 éditeur de texte pour ouvrir le fichier et copier son contenu par la suite.

- Rendez vous dans la rubrique **Clés SSH**

- Collez la clé que vous avez copié dans la zone de texte **Key**, puis choisissez un titre pour identifier facilement
cette clé et à la fin définir la date à partir de laquelle la clé ne sera pas utilisée pour s'authentifier.

### Vérifier que vous pouvez connecter
- Ouvrez un terminal et exécutez cette commande:

```bash
$- ssh -T git@gitlab.com
```
Si c'est la première fois que vous vous connectez, vous devez vérifier l'authenticité de l'hôte GitLab.

Normalement vous aurez un message comme ceci

```
 The authenticity of host 'gitlab.com (xx.xx.xx.xx)' can't be established.
 ECDSA key fingerprint is SHA256:HbW3g8zUjNSksFbqTiUWPWg2Bq1x8xdGUrliXFzxxxx.
 Are you sure you want to continue connecting (yes/no)? yes
 Warning: Permanently added 'gitlab.nordnet.fr' (ECDSA) to the list of known hosts.
```

- Tapez oui et appuyez sur Entrée
- Exécutez à nouveau la commande

```bash
$- ssh -T git@gitlab.com`.
```
Vous devriez recevoir un message Welcome to GitLab, @username !
