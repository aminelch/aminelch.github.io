---
aliases:
- /posts/config-commune-bash-zsh/
coverAlt: 'Illustration de mon terminal.'
coverCaption: 'Illustration de mon terminal.'
date: 2025-09-27
description: Comment avoir une configuration unifiée entre Zsh et Bash
tags: [dotfiles, shell, zsh, terminal, bash, linux, devops]
title: Unifier la configuration de son terminal (Bash & Zsh)
---

On passe beaucoup de temps à personnaliser son terminal : alias, PATH, variables d’environnement, agent SSH… Tout marche bien, **jusqu’au moment où on change de shell**.

Résultat : doublons, variables perdues, alias qui disparaissent… voire même des comportements différents entre Bash et Zsh (par exemple un script qui marche dans l’un mais pas dans l’autre). Voici ce que j’ai rencontré récemment :

```bash
echo $PATH | tr ':' '\n'
/home/amine/.cargo/bin
/home/amine/.local/bin
/usr/local/go/bin
/home/amine/.local/share/JetBrains/Toolbox/scripts
/usr/local/go/bin
/usr/local/go/bin
```

Un PATH illisible avec des doublons. 😅

## Centraliser la configuration

1.  **Variables et PATH** → dans un fichier commun (`~/.profile`) sourcé par tous les shells.
2.  **Alias et fonctions** → dans un fichier séparé (`~/.alias`) sourcé aussi par Bash et Zsh.

**Exemple de fichier `.alias` :**

```bash
# ~/.alias
alias ll='ls -lah'
alias gst='git status'
alias k='kubectl'
alias tf='terraform'
```

## Gérer le PATH sans doublons

```bash
# Prevent duplicates when adding directories to PATH
add_to_path() {
    [ -d "$1" ] || return
    case ":$PATH:" in
        *":$1:"*) ;;         # already present
        *) PATH="$PATH:$1" ;; # otherwise add
    esac
}

add_to_path "$HOME/.local/bin"
add_to_path "$HOME/.cargo/bin"
add_to_path "/usr/local/go/bin"

export PATH
```

Cette fonction garde ton PATH propre, même après plusieurs rechargements du shell.

> **Note :** Cette fonction ajoute le chemin à la **fin** de la variable `PATH`. Si vous avez besoin de le prioriser (par exemple pour `pyenv` ou `nvm`), vous pouvez l'ajouter au début en remplaçant `PATH="$PATH:$1"` par `PATH="$1:$PATH"`.
>
> **Astuce Zsh :** Si vous utilisez Zsh, vous pouvez également utiliser l'instruction native `typeset -U path` dans votre `~/.zshrc`. Elle lie la variable `$PATH` au tableau `$path` et supprime automatiquement tous les doublons. La fonction `add_to_path` reste cependant indispensable pour conserver la compatibilité avec Bash.

## Comment chaque shell charge la config

Bash et Zsh ne chargent pas leurs fichiers de configuration de la même manière, et distinguent principalement deux types de sessions :

1.  **Shell de connexion (Login Shell)** : Démarré lors d'une connexion (ex: SSH).
    *   **Bash** cherche et exécute le premier fichier trouvé dans cet ordre : `~/.bash_profile`, `~/.bash_login`, puis `~/.profile`.
    *   **Zsh** exécute `~/.zprofile`.

2.  **Shell interactif (Non-Login Shell)** : Démarré après la connexion (ex: nouvel onglet du terminal).
    *   **Bash** exécute `~/.bashrc`.
    *   **Zsh** exécute `~/.zshrc`.

C'est pour cette raison qu'on place les **exports de variables (`PATH`, etc.) dans `~/.profile`** (compatible avec les deux) et les **alias/fonctions dans un fichier `.alias`** qui sera "sourcé" par `~/.bashrc` et `~/.zshrc`.

## Mise en pratique : comment sourcer ces fichiers

Pour appliquer cette configuration, voici ce qu'il faut ajouter dans vos fichiers de configuration respectifs :

### Dans `~/.bashrc` et `~/.zshrc` (Shell interactif)

Ajoutez cette ligne pour charger vos alias communs :

```bash
# Charger les alias et fonctions communs
[ -f "$HOME/.alias" ] && . "$HOME/.alias"
```

### Dans `~/.bash_profile` (Bash) et `~/.zprofile` (Zsh) (Shell de connexion)

Ajoutez cette ligne pour charger votre profil commun (qui contient les variables d'environnement et le `PATH`) :

```bash
# Charger le profil commun
[ -f "$HOME/.profile" ] && . "$HOME/.profile"
```

De cette manière, peu importe le shell démarré ou le type de session, votre configuration sera toujours chargée correctement et sans doublons.

## Les bénéfices

*   **Cohérence** : mêmes alias, mêmes variables, mêmes chemins partout.
*   **Simplicité** : un seul fichier à maintenir.
*   **Portabilité** : transfert facile vers une nouvelle machine (Linux, macOS…).
*   **Productivité** : un terminal prêt à l’emploi, zéro surprise.

👉 En centralisant vos fichiers (`.profile`, `.alias`), vous préparez une configuration commune **portable entre OS et entre shells**. Résultat : un environnement cohérent et facilement exportable, que vous soyez sous Bash ou Zsh, sur une machine existante ou toute nouvelle. 

Vous pouvez retrouver l'intégralité de mes configurations et de mes alias directement sur mon [dépôt dotfiles](https://gitlab.com/aminelch/dotfiles).
