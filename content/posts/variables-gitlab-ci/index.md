---
date: '2025-02-05'
draft: false
title: >
  Portée des Variables dans GitLab CI/CD
tags: [gitlab, gitlab-ci, pipeline, intégration-continue, gitlab-ci/cd]
coverAlt: >
    Photo depuis <a href="https://about.gitlab.com/images/opengraph/gitlab-blog-cover.png">Gitlab</a>
coverCaption: >
    Photo depuis <a href="https://about.gitlab.com/images/opengraph/gitlab-blog-cover.png">Gitlab</a>
---

# Portée des Variables dans GitLab CI/CD

GitLab CI/CD permet de définir des variables utilisables dans les pipelines. Ces variables peuvent avoir différentes portées et comportements selon leur configuration.

## 1. Types de Variables

### 1.1 Variables d'Environnement Standard

- Définies dans `Settings > CI/CD > Variables`.
- Disponibles pour tous les jobs du pipeline.
- Peuvent être marquées comme protégées, masquées ou exposant des références de variables.

### 1.2 Variables Protégées

- Disponibles uniquement sur les branches et tags protégés.
- Si un job s'exécute sur une branche non protégée, la variable sera inaccessible.

### 1.3 Variables Masquées

- Utilisées pour stocker des secrets (tokens, mots de passe, clés API, etc.).
- Masquées dans les logs des pipelines (remplacées par `[MASKED]` si elles respectent les règles de masquage).

### 1.4 Variables avec "Expand variable reference"

Si activé, une valeur contenant `$` sera interprétée comme une autre variable.

**Exemple :**

```yaml
variables:
  MY_VAR: "$CI_COMMIT_REF_NAME"
```

Ici, `MY_VAR` prendra la valeur de `CI_COMMIT_REF_NAME`.

Si désactivé, `MY_VAR` contiendra littéralement `$CI_COMMIT_REF_NAME`.

## 2. Portée des Variables Prédéfinies

GitLab fournit des variables prédéfinies accessibles dans les jobs CI/CD.

| Variable              | Description                                      | Exemple                          |
|-----------------------|--------------------------------------------------|----------------------------------|
| `$CI_COMMIT_REF_NAME`  | Nom de la branche ou du tag.                     | `master`, `v1.0`, etc.           |
| `$CI_COMMIT_SHA`       | Hash du commit actuel.                           | `a3f7bba12d`                     |
| `$CI_PROJECT_NAME`     | Nom du projet GitLab.                            | `my-project`                     |

## 3. Exemples d'Utilisation des Variables

### 3.1 Utilisation dans un Job

Voici un exemple d'utilisation d'une variable dans un job GitLab CI/CD :

```yaml
stages:
  - build

build:
  script:
    - echo "Building on branch $CI_COMMIT_REF_NAME"
    - echo "Commit SHA: $CI_COMMIT_SHA"
```

### 3.2 Vérification de la Présence d'une Variable

Si tu veux vérifier si une variable est définie avant de l'utiliser, tu peux utiliser cette méthode :

```yaml
stages:
  - deploy

deploy:
  script:
    - |
      if [ -z "$MY_VAR" ]; then
        echo "MY_VAR is not defined"
      else
        echo "MY_VAR is $MY_VAR"
      fi
```

## 4. Debugging

Lorsqu'un pipeline ne fonctionne pas comme prévu, il peut être utile de vérifier les variables d'environnement. Pour cela, tu peux exécuter la commande suivante pour afficher toutes les variables disponibles :

```bash
printenv | sort
```

