---
title: "My First Post"
date: 2023-12-08
draft: false
description: |
  Comment résoudre l'erreur "rsync: connection unexpectedly closed ..." ?
tags:
  - rsync
  - linux
title: >
    Comment résoudre l'erreur "rsync: connection unexpectedly closed ..." ?
---

<h3>Contexte</h3>
Lors de l’utilisation de la commande rsync, il est possible d’obtenir le message d’erreur suivant :

```bash
rsync: connection unexpectedly closed (0 bytes received so far) [sender]
rsync error: unexplained error (code 255) at io.c(228) [sender=3.2.3]
```


Avant de solutionner ce problème, il est important de connaître quelques points sur [rsync](https://rsync.samba.org/):

- La synchronisation est unidirectionnelle, c’est-à-dire qu’elle copie les fichiers de la source en direction de la
destination.
- **rsync** peut utiliser le protocole ssh pour agir sur le serveur distant ou bien le démon rsync.

<h4>Explication</h4>

La commande [rsync](https://rsync.samba.org/) n'a pas trouvé le binaire rsync dans sur le serveur à distant.

<h4>Solution</h4>
Il est nécessaire de spécifier explicitement le chemin de la commande rsync sur le serveur distant. Celui-ci sera
utilisé par la commande de base.

- la commande `whereis` permet de localiser les fichiers binaires, source et manuel de la page pour une commande

```bash
$- whereis rsync
rsync: /usr/bin/rsync /usr/share/rsync /usr/share/man/man1/rsync.1.gz
```

```bash
$- rsync --rsync-path=/usr/bin/rsync  -raAXvhP "~/backup" "remote-host:/home/amine/backup" --delete-before
```
