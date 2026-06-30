---
title: Automatisation des déploiements des applications Java EE sur Oracle WebLogic
icon: weblogic-automation
slug: 'automatisation-weblogic'
date: 2025-10-10
tags: [ "devsecops", "terraform", "IaC", "weblogic", "oracle", "java-ee", "devops", "ci-cd", "gitlab-ci", "automation", "deployment", "go", "architecture", "legacy-systems" ]
url: '/projects/automatisation-weblogic'
description: >
   Mise en œuvre d'une passerelle de déploiement sécurisée en Go pour orchestrer la livraison d'applications Java EE sur Oracle WebLogic depuis GitLab CI.
---

Ce projet présente la conception et la mise en œuvre d'une solution d'automatisation des déploiements pour des applications Java EE critiques sur **Oracle WebLogic Server**, comblant le fossé entre des pipelines modernes (GitLab CI) et une infrastructure traditionnelle.

Voici un aperçu rapide du cadre technique de cette réalisation avant d'en détailler le contexte et la problématique :

## Cadre Technique

| Catégorie | Technologies utilisées |
| :--- | :--- |
| **Langages** | Go (binaire `weblogic-deployer`), Bash (MVP), Java EE |
| **Automation & CI/CD** | GitLab CI, Maven (Build & Profils) |
| **Infrastructure (Simulation)** | Terraform, VMs CentOS |
| **Middleware cible** | Oracle WebLogic Server |
| **Sécurité & Réseau** | SSH (Tunneling), TLS, Isolation VLAN |


## Contexte du Projet

Ce projet concerne l’automatisation des déploiements d’applications Java EE critiques sur [Oracle WebLogic Server](https://www.oracle.com/java/weblogic/). L'intervention s'est déroulée dans un environnement hybride, combinant des pipelines CI/CD modernes via GitLab CI et une infrastructure d'entreprise traditionnelle basée sur des clusters WebLogic. 

L’objectif principal était de réduire la friction entre les pratiques DevOps modernes et les contraintes opérationnelles d'une plateforme legacy.

## Problématique

Avant cette intervention, l’ensemble du processus reposait sur des déploiements manuels effectués directement via la console d'administration WebLogic. Cette approche traditionnelle posait plusieurs limites majeures au quotidien :

1. **Temps de déploiement élevé** : Chaque release demandait des manipulations répétitives et chronophages.
2. **Mobilisation des équipes** : Les administrateurs système devaient être sollicités à chaque livraison, limitant l'autonomie des développeurs.
3. **Risque d’erreurs humaines** : Les configurations manuelles (ciblage des serveurs, déploiement des bibliothèques) manquaient de reproductibilité.
4. **Absence de traçabilité** : Aucun lien direct n'existait entre les commits Git, les artefacts construits et l'état réel des différents environnements.

{{< mermaid >}}
flowchart TD
    subgraph BuildPhase[Phase Build]
        Dev[Team Dev / Ops]
        Build[Maven build]
        Artifact[WAR / EAR artifact]
    end
    subgraph TransferPhase[Phase Transfert]
        SCP[SCP / FTP manual upload]
    end
    subgraph WebLogicPhase[Phase Administration WebLogic]
        Login[Admin Console Login]
        Deploy[Manual Deployment]
        Config[Manual configuration]
        Restart[Restart servers]
    end
    subgraph ValidationPhase[Phase Validation]
        Check[Manual testing]
        Done[Production release completed]
    end
    Dev --> Build --> Artifact --> SCP --> Login --> Deploy --> Config --> Restart --> Check --> Done
    classDef build fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#1e293b
    classDef transfer fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px,color:#1e293b
    classDef weblogic fill:#fff9c4,stroke:#f57f17,stroke-width:2px,color:#1e293b
    classDef validation fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#1e293b
    classDef done fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px,stroke-dasharray:5 5,color:#1e293b
    class Dev,Build,Artifact build
    class SCP transfer
    class Login,Deploy,Config,Restart weblogic
    class Check validation
    class Done done
{{< /mermaid >}}

« **Schéma 1** – Processus de déploiement manuel traditionnel »

## Contraintes Techniques

Pour moderniser ce flux, il a fallu composer avec un ensemble de contraintes techniques et de sécurité strictes, inhérentes à l'architecture d'entreprise existante :

### Architecture & Réseau
* **Isolation réseau stricte** : Le cluster WebLogic est isolé au sein d'un réseau dédié (ex. **VLAN 34**), tandis que les runners GitLab CI et autres outils d'administration résident sur un sous-réseau distinct (ex. **VLAN d'administration 192.168.44.0/24**). Aucun routage direct n'est autorisé entre ces deux zones pour les ports d'administration WebLogic.
* **Infrastructure non modifiable** : Impossible de modifier la topologie des serveurs ou d'installer des agents tiers sur les serveurs WebLogic de production.

### CI/CD & Outillage
* **Runners légers** : Les agents GitLab CI ne disposent pas du JDK ni des outils Oracle (le client de script `WLST` n'y est pas installé).
* **Maintenance minimale** : Interdiction d'alourdir ou de modifier les images des runners de build avec des composants Oracle propriétaires.

### Sécurité
* **Zéro secret en clair** : Interdiction absolue de faire transiter des identifiants d'administration WebLogic en clair ou de les stocker dans le dépôt Git.
* **Flux contrôlés** : Obligation d'emprunter des canaux sécurisés et audités pour initier les déploiements.

---

## Architecture de la Solution

Pour contourner ces obstacles, une nouvelle architecture de déploiement a été mise en place. Elle s'appuie sur un outil sur mesure faisant office de passerelle (*deployment gateway*) entre le pipeline de CI et le serveur d'administration WebLogic.

{{< mermaid >}}
flowchart TD
    %% Définition des sous-graphiques
    subgraph TestEnv["Environnement de test (Éphémère)"]
        direction TB
        TF["main.tf<br/>(Terraform + libvirt)<br/><b>Exécution autonome</b><br/>(hors GitLab CI)"]
        TF -->|provisionne| VM["VMs CentOS"]
        VM -->|héberge| WLS_Test["WebLogic Server<br/>(Admin + Managed Servers)"]
    end

    subgraph ProdEnv["Environnement réel (Production)"]
        direction TB
        WLS_Prod["WebLogic Servers<br/>(Admin + Managed Servers)<br/><i>Infrastructure permanente</i>"]
    end

    subgraph CI["GitLab CI (Pipeline d'orchestration)"]
        direction TB
        J1["1. deploy-test<br/><b>weblogic-deployer</b> (Go)"]
        J2["2. deploy-weblogic<br/><b>weblogic-deployer</b> (Go)<br/><i>Déploiement vers le réel</i>"]
    end

    %% Binaire Go central
    BIN["<b>weblogic-deployer</b><br/>(Binaire Go)<br/>Toute la logique métier<br/>(WLST, REST, scripts)"]

    %% Flux des déploiements
    J1 -->|déploie la configuration| WLS_Test
    J2 -->|déploie la <b>même</b> configuration| WLS_Prod

    %% Validation avant production
    J1 -.->|Validation des tests OK| J2

    %% Le binaire est utilisé par les deux jobs
    J1 -.- BIN
    J2 -.- BIN

    %% Styles optionnels pour améliorer la lisibilité
    classDef ci fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#1e293b;
    classDef test fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#1e293b;
    classDef prod fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#1e293b;
    classDef bin fill:#fce4ec,stroke:#c62828,stroke-width:2px,stroke-dasharray: 5 5,color:#1e293b;
    class J1,J2 ci;
    class TF,VM,WLS_Test test;
    class WLS_Prod prod;
    class BIN bin;
{{< /mermaid >}}

« **Schéma 2** – Pipeline de déploiement automatisé avec passerelle Go »

---

## Choix d'Implémentation

La réalisation de cette architecture s'est faite à travers le développement d'un utilitaire dédié et une phase de validation rigoureuse en environnement simulé.

### L'outil : `weblogic-deployer`
Plutôt que d'essayer d'intégrer les outils d'administration lourds d'Oracle dans le pipeline, j'ai développé un outil CLI autonome en Go nommé `weblogic-deployer`. Il s'inspire de la philosophie de Docker et Terraform :
* **Binaire statique unique** : Compilé sans dépendance externe, il s'exécute directement sur n'importe quel runner GitLab CI minimal (ex. Alpine).
* **Configuration TOML** : Le comportement est piloté de manière claire via un fichier de configuration structuré.

Voici un extrait type de la configuration utilisée :

```toml
# ~/.config/weblogic-deployer/config.toml
[connection]
admin_url = "t3s://weblogic-admin.internal:7002"
username = "deployer_service"
timeout = "5m"

[deployment]
target = "dev-server"
app_name = "auth-api"
retries = 3

[tunnel]
enabled = true
bastion_host = "bastion.internal"
bastion_user = "ssh-weblogic-deployer"

[logging]
level = "info"
file = "/var/log/weblogic-deployer/deploy.log"
```

### Validation via Environnement de simulation
Pour concevoir et tester la solution sans risquer d'impacter les serveurs actifs, la topologie WebLogic a été entièrement simulée localement. 
* Les VMs CentOS ont été provisionnées de manière déclarative avec **Terraform** via le provider **libvirt**.
* Un premier **MVP sous forme de scripts Bash** a permis de valider rapidement les appels d'API d'administration et la logique d'orchestration, avant de pérenniser le tout en Go.

### Orchestration CI/CD et Runner Dédié
L'exécution de la tâche `deploy-weblogic` au sein du pipeline GitLab CI s'appuie sur un **runner auto-hébergé (self-hosted)** dédié. Ce runner, ciblé à l'aide d'un tag spécifique dans le fichier `.gitlab-ci.yml`, est pré-configuré et possède tous les éléments nécessaires (droits réseau vers le bastion SSH, configurations locales) pour mener à bien l'exécution de `weblogic-deployer`.

```yaml
# Exemple d'intégration dans .gitlab-ci.yml
deploy-weblogic:
  stage: deploy
  tags:
    - weblogic-secure-runner  # Runner auto-hébergé dédié
  script:
    - weblogic-deployer deploy --app target/auth-api.war
  only:
    - main
    - develop
```

## Considérations de sécurité

Parce que l'outil manipule des environnements critiques, la sécurité a été intégrée dès la phase de conception :
* **Mécanisme SSH et Tunneling** : L'outil `weblogic-deployer` utilise une connexion SSH pour s'interfacer de manière sécurisée avec le cluster WebLogic, permettant d'initier un tunnel pour traverser la DMZ sans exposer le serveur d'administration. La connexion applique une vérification stricte de l'empreinte du serveur (`StrictHostKeyChecking yes`) afin de bloquer immédiatement la session en cas de modification suspecte de la clé d'hôte (protection MitM).
* **Sécurisation stricte des clés SSH** : Les clés privées nécessaires à la connexion sont stockées dans les variables d'environnement de GitLab CI/CD. Elles sont configurées comme **protégées (protected variables)**, ce qui restreint leur accès unique au mainteneur du projet et limite leur utilisation aux branches et tags protégés (comme `main` ou les tags de release).
* **Aucun secret exposé** : Les identifiants d'administration sensibles et tokens d'accès ne sont jamais écrits en clair et ne transitent pas par le dépôt de code.
* **Surface d'attaque réduite** : L'absence de composants Java/Oracle propriétaires sur les runners de build limite grandement l'exposition aux vulnérabilités logicielles sur les agents de CI.

## Résultats

La mise en production de cette solution a transformé la gestion opérationnelle des applications :

* **Suppression des tâches manuelles** : Plus aucune intervention sur la console WebLogic n'est requise pour les livraisons.
* **Gain de temps drastique** : Le processus de déploiement, qui nécessitait auparavant de longues minutes de manipulations, s'exécute désormais automatiquement via le job `deploy-weblogic` en seulement **≃ 40 secondes**.
* **Standardisation et traçabilité** : Chaque déploiement est identique, audité dans GitLab et associé à une version précise du code source.

## REX

Ce projet démontre qu'il est possible d'apporter la rigueur des pratiques DevOps (IaC, l'automatisation, CD) sur des architectures legacy sans devoir engager de lourds chantiers de refonte applicative.

La création d'une passerelle légère dédiée (le pattern *deployment gateway*) s'avère souvent être la solution la plus pragmatique et sécurisée pour valoriser l'existant.