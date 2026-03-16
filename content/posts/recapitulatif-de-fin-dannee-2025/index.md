---
title: "Récapitulatif de fin d'année 2025"
date: 2025-12-31T23:59:59+01:00
draft: false
tags: ["récap", "cloud", "devops", "sre", "opensource"]
coverAlt: "Photo de George Lemon depuis Unsplash"
---

L'année 2025 a été une période de consolidation technique, marquée par plusieurs chantiers d’automatisation et un engagement plus régulier dans l’open source.

### Technologies et outils

Durant l’année, plusieurs briques techniques ont structuré mon environnement de travail :

- **Containerisation & Virtualisation** : Docker (Compose, Swarm), KVM et Proxmox.
- **Infrastructure as Code** : utilisation de Terraform pour le provisioning d’infrastructure.
- **Observabilité** : stack Prometheus/Grafana complétée par le développement d’un notificateur en Go (`msteams-notifier`).
- **Automatisation** : création et publication de plusieurs rôles Ansible afin de standardiser certaines opérations récurrentes.

### Projets marquants

**Modernisation de l’écosystème Ci/CD via GitLab**

Pilotage d’une migration vers GitLab Ci incluant la refonte des permissions (ACL), le renforcement de la sécurité des pipelines et la mise en place d’une infrastructure de runners auto-hébergés spécialisés selon les types de projets (Frontend, Bun.js, Maven, etc.).

**Automatisation des déploiements sur Oracle WebLogic**

Conception et implémentation d’un pipeline d’automatisation dédié aux déploiements sur Oracle WebLogic.  
La solution combine des scripts Bash et des outils développés en Go, intégrés aux workflows GitLab Ci afin d’assurer des mises en production plus fiables et reproductibles.

### Contributions Open Source

- **tldr-pages** : contributions régulières au projet principal.
- **GNOME** : participation autour des problématiques DevOps, SRE et maintenabilité des outils GTK.
- **Autres projets** : interventions ponctuelles sur Docker, HashiCorp et Tabby.

### Retours d'expérience

- L’automatisation demeure un levier essentiel pour réduire les opérations manuelles et améliorer la fiabilité des systèmes en production.

- La simplicité dans la conception des pipelines et des architectures reste un facteur déterminant de maintenabilité, en particulier dans des environnements hétérogènes.

- L’open source demeure un pilier de l’écosystème d’infrastructure, offrant transparence, flexibilité et capacité d’adaptation face aux besoins évolutifs des systèmes.

### Conclusion

2k25 été une année marquée par la modernisation des pipelines CI/CD, l’automatisation des déploiements et une implication plus active dans l’OSS.

Ces expériences confirment l’importance de construire des systèmes fiables, simples et automatisés.

Cap sur 2k26.