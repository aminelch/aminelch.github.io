---
title: Bien configurer son SSH🔐
draft: false
date: 2022-03-11
tags:
  - ssh
description: |
    une démarche enrichie pour configurer SSH afin d'assurer une communication sécurisée entre deux serveurs
coverAlt: >
    Photo de Growtika depuis <a href="https://unsplash.com/photos/white-clouds-and-blue-skies-DbwYNr8RPbg">Unsplash</a>
coverCaption: >
    Photo de Growtika depuis <a href="https://unsplash.com/photos/white-clouds-and-blue-skies-DbwYNr8RPbg">Unsplash</a>
---
### Introduction


Voici une démarche enrichie pour configurer SSH afin d'assurer une communication sécurisée entre deux serveurs.


### 1 : Générer une paire de clés SSH sur le serveur A

Sur le serveur A, génère une paire de clés SSH avec la commande suivante :

```bash
ssh-keygen -t rsa
```
Accepte les valeurs par défaut et laisse la passphrase vide pour une connexion sans mot de passe.

### 2 : Copier la clé publique sur le serveur B
Utilise la commande suivante pour copier la clé publique du serveur A vers le serveur B :

```bash
ssh-copy-id user@serverB
```
Si vous un clef en particulier à ajouter

```bash
ssh-copy-id -i ~/.ssh/clef.pub user@serverB
```

Remplace user par le nom d'utilisateur sur le serveur B et serverB par l'adresse IP ou le nom de domaine du serveur B.
Cela ajoutera la clé publique à `~/.ssh/authorized_keys` sur le serveur B.


### 3 : Configurer le fichier ~/.ssh/config sur le serveur A
Pour simplifier les connexions SSH, configure le fichier `~/.ssh/config` sur le serveur A :

```bash
vim ~/.ssh/config
```

Ajoute la configuration suivante :

```text
Host HerinuxServer
    HostName 10.0.10.18
    User user
    IdentityFile ~/.ssh/id_rsa
```

- `Host HerinuxServer` : Ce paramètre définit un alias ou un nom court que vous pouvez utiliser pour vous connecter à  ce serveur.
- `HostName` : C'est l'adresse IP ou le nom de domaine du serveur auquel vous voulez vous connecter.
- `User` : Ce paramètre spécifie le nom d'utilisateur avec lequel vous souhaitez vous connecter au serveur.
- `IdentityFile` : Ce paramètre indique le chemin vers la clé privée SSH utilisée pour l'authentification

### 4 : Vérifier la connexion SSH

Teste la connexion pour t'assurer que tout fonctionne correctement :

```bash
ssh HerinuxServer
```
Si tout est configuré correctement, tu devrais te connecter au serveur B sans avoir à entrer un mot de passe.
