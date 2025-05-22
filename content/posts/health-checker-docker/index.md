---
date: 2025-05-20
draft: false
description: |
  "Découvrez pourquoi les health checks sont essentiels dans vos conteneurs Docker"
tags: [Docker, Docker Compose, HealthCheck, Containers, Devops,SiteReliability, Observability, Monitoring]
title: >
  Pourquoi définir un Health Check dans vos services Docker?
coverAlt: >
    Illustration générée via DALL·E 3 – libre de droits selon [les conditions OpenAI](https://openai.com/policies/terms-of-use)
coverCaption: >
    Illustration générée via DALL·E 3 – libre de droits selon [les conditions OpenAI](https://openai.com/policies/terms-of-use)
---

Un conteneur qui tourne, ce n’est pas forcément un service qui fonctionne.

Aujourd’hui, dans ce billet technique, nous allons découvrir ce qu’est un **health check** dans [Docker](https://www.docker.com/), pourquoi il est crucial dans le contexte de conteneurisation, et comment l’utiliser efficacement dans vos projets.

## Qu’est-ce qu’un Health Check Docker ?

Un **health check** est une commande exécutée périodiquement par [Docker](https://www.docker.com/) pour vérifier l'état de santé réel du service exécuté dans un conteneur.

Défini dans un `Dockerfile` ou un `docker-compose.yml`, il permet de **valider le comportement attendu d’un service**, comme la réponse d’une API, la disponibilité d’un port ou la présence d’un fichier indicateur.

## Pourquoi utiliser un Health Check ?

### 1. Un conteneur peut être "up" mais inopérant

[Docker](https://www.docker.com/) vérifie uniquement si le processus principal tourne. Mais une application peut être figée, crashée partiellement ou incapable de répondre, tout en laissant son conteneur actif.

**Avec un health check, vous détectez ces états intermédiaires.**

### 2. Redémarrage automatique des services défaillants

Combiné à [une politique de redémarrage](https://github.com/compose-spec/compose-spec/blob/main/deploy.md#restart_policy) (`restart: always` ou `on-failure`), Docker peut relancer automatiquement un conteneur si son état de santé devient `unhealthy`.

Cela améliore la résilience en assurant un redémarrage automatique sans intervention humaine.

### 3. Orchestration maîtrisée avec Docker Compose

[Docker Compose](https://docs.docker.com/compose/) permet de déclarer des dépendances conditionnées à la santé des services :
```yaml
depends_on:
  backend:
    condition: service_healthy
```

Cela garantit que le `frontend` ne démarre que lorsque le `backend` est vraiment prêt.

### 4. Meilleure observabilité

L’état de santé devient accessible via :
```bash
docker inspect --format='{{json .State.Health}}' <container_id>
```

Il peut être affiché dans les outils comme Portainer, ou intégré à votre supervision.

### 5. Documentation vivante des attentes fonctionnelles

Définir un health check, c’est aussi **formaliser les critères de bon fonctionnement** de votre service : un port ouvert, une réponse HTTP 200, un socket actif, etc.

Cela renforce la lisibilité et la maintenabilité de vos images Docker.

## Exemple : un health check HTTP d’un service web

Dans un `Dockerfile` :
```Dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://local.dev:8080/health || exit 1
```

Dans un `docker-compose.yml` :

```yaml
services:
  web:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://local.dev:8080/health"]
      interval: 30s
      timeout: 5s
      retries: 3
```

Nativement, dans un script bash :

```bash 
#!/usr/bin/env bash

URL="http://local.dev:8080/health" # URL à tester
TIMEOUT=5
INTERVAL=30
LOGFILE="/var/log/healthcheck.log"

log() {
  local message=$1
  echo "$(date '+%Y-%m-%d-%H-%M-%S') - $message" >> "$LOGFILE"
}

while true; do
  output=$(curl -sfS -m $TIMEOUT "$URL" 2>&1 | tee -a "$LOGFILE")
  status=${PIPESTATUS[0]}

  if [ $status -eq 0 ]; then
    log "Service is healthy"
  else
    log "Service is unhealthy"
  fi

  sleep $INTERVAL
done
```
{{< alert >}}
**INFO:** Le script bash présenté est conçu pour tourner en boucle infinie et effectuer des vérifications régulières de la santé du service docker.
{{< /alert >}}

Pour démarrer le script et le faire tourner en arrière-plan, vous pouvez utiliser :

```bash
nohup ./healthcheck.sh > /dev/null 2>&1 &
```
📔 [Page de manuel de la commande nohup](https://www.gnu.org/software/coreutils/manual/html_node/nohup-invocation.html)

## Références

- [Dockerfile Reference — HEALTHCHECK](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [Docker Best Practices — Use a Healthcheck](https://docs.docker.com/develop/dev-best-practices/#use-a-healthcheck)