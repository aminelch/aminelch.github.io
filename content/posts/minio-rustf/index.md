---
title: "MinIO Community Edition change la donne, RustFS m'a séduit"
date: 2025-12-31T23:59:59+01:00
draft: false
tags: ["récap", "cloud", "devops", "sre", "opensource", "rustfs", "minio", "infrastructure", "terraform", "object-storage", "lab", "poc", "adr"]
description: "mlorem ipsum"

coverCaption: >
  Illustration générée par [ChatGPT OpenAI](https://openai.com/policies/terms-of-use), utilisée dans un contexte éditorial technique.
---

# MinIO Community Edition change la donne, RustFS m'a séduit

*Ou comment j'ai exploré le stockage objet S3-compatible sans me faire piéger par une licence... ni par une trajectoire produit trop orientée abonnement*

## Pourquoi j'ai regardé ailleurs que S3

S3 est devenu un standard de fait. Les SDK, les outils de sauvegarde, les orchestrateurs et même certaines bases de données savent aujourd'hui parler son API.

Mais dans mon cas, le besoin était différent :

- stockage objet auto-hébergé ;
- déploiement sur une infrastructure privée ;
- absence de dépendance à un fournisseur cloud ;
- maîtrise des coûts et des contraintes de licence.

Deux candidats se sont rapidement imposés : **MinIO Community Edition**, incontournable depuis plusieurs années dans l'écosystème du stockage objet, et [RustFS](https://rustfs.com/), un projet plus récent qui attire l'attention grâce à son approche basée sur [Rust](https://rust-lang.org/).

J'aime explorer les technologies émergentes. La veille fait partie intégrante du métier d'architecte et d'ingénieur plateforme.

J'ai donc monté un petit lab pour comparer les deux approches.

## Construction du lab

Pour éviter de simplement lancer deux conteneurs sur ma machine et tirer des conclusions trop rapides, j'ai construit un environnement dédié.

Le point d'entrée est un fichier `main.tf` qui orchestre la création de mon infrastructure de test avec Terraform.

Sous le capot, la virtualisation repose sur [**KVM**](https://ubuntu.com/blog/kvm-hyphervisor), une technologie que j'apprécie particulièrement pour sa simplicité, ses performances et son intégration native dans l'écosystème Linux.

Avec le recul, j'aurais probablement dû partir sur une approche basée sur [Vagrant](/p/jaime-vagrant/)
 pour ce type de lab. Vagrant apporte une couche d'abstraction intéressante pour créer rapidement des environnements reproductibles, surtout lorsqu'on manipule plusieurs machines virtuelles.

Mais cette approche **Terraform + KVM** me permet de garder une vision plus proche de l'infrastructure réelle et de mieux comprendre chaque brique.

## Déploiement de MinIO Community Edition

L'un des points intéressants avec **MinIO Community Edition** est la diversité des modèles de déploiement disponibles.

Selon le contexte, plusieurs approches sont possibles :

- **Docker / Docker Compose** : parfait pour un environnement de test, un POC ou un petit déploiement interne ;
- **installation native** : exécution du binaire directement sur une machine Linux avec gestion via systemd ;
- **Kubernetes** : déploiement dans un cluster avec les outils adaptés à l'écosystème cloud-native ;
- **architectures distribuées** : plusieurs nœuds pour assurer la haute disponibilité et la résilience.

Cette flexibilité explique en partie pourquoi MinIO est devenu une référence dans les architectures S3 compatibles auto-hébergées.

## Déploiement express

Les deux solutions tournent rapidement.

**MinIO Community Edition** : une commande, une console web complète, des buckets disponibles en quelques secondes. L'expérience est mature.

**RustFS** : aujourd'hui, il possède son image officielle et une interface web sobre — gestion des buckets, des clés et consultation des objets. Pas de surcharge, mais l'essentiel est là.

Je lance les deux sur ma machine de test (vieux Dell, SSD, 16 Go de RAM). Je balance 5 000 fichiers de 10 Mo chacun. Je mesure.

## Les chiffres parlent

| Critère | MinIO Community Edition | RustFS |
| ------------------------- | ------------------------- | ------------------------- |
| **Licence** | AGPL v3 | Apache 2.0 |
| **Modèle produit** | Communauté solide, mais orientation de plus en plus nette vers les abonnements payants | Projet plus simple à lire juridiquement |
| **Interface web** | Oui, très complète | Oui, sobre et efficace |
| **Compatibilité S3** | Très mature | Très bonne compatibilité |
| **RAM au repos** | ~450 Mo | ~82 Mo |
| **Latence PUT (moyenne)** | 180 ms | 70 ms |
| **Requêtes lecture/sec** | ~400 | ~720 |

RustFS est plus léger et montre de très belles performances. C'est aussi une illustration intéressante de ce que l'écosystème [Rust](https://rust-lang.org/) peut apporter.

## Le vrai sujet : la licence

{{< alert >}}
**INFO:** {{ Les performances évoluent && Les fonctionnalités aussi. }}
{{< /alert >}}

Mais l'article de [Linuxiac](https://linuxiac.com/minio-steering-users-toward-paid-subscriptions/) sur MinIO m'a surtout rappelé un point important : au-delà de la licence, l'éditeur pousse de plus en plus clairement les utilisateurs vers des abonnements payants.

Quand la documentation, le support et le discours produit orientent progressivement les équipes vers l'offre commerciale, il faut regarder le sujet avec un peu plus de recul.

Et surtout, le [contrat propriétaire](https://www.min.io/legal/customer-license-and-subscription-agreement) associé à cette trajectoire est l'antithèse d'une licence [open source](https://en.wikipedia.org/wiki/Open-source_license) : il vous refuse l'accès au code source, interdit toute modification, redistribution, rétro-ingénierie et même tout benchmarking public sans autorisation préalable⁉️.

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTFmcjZkbTV6cjFlMWFmeWR6eDJqazEyODF1ejMxd3Z6cTVoZXpxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ni4cpi0uUkd6U/giphy.gif)

En l'acceptant, vous souscrivez à des obligations asymétriques lourdes : déclarations d'usage obligatoires, audits à vos frais en cas d'écart, suspension unilatérale du service, et clause pénale dissuasive vous forçant à payer l'intégralité de la durée restante en cas de résiliation pour manquement.

MinIO peut aussi modifier unilatéralement les conditions à tout moment et exploiter certains logs pour améliorer son produit, tandis que sa responsabilité reste strictement plafonnée au montant des frais payés.

**Concrètement, vous abandonnez les droits fondamentaux du logiciel libre — étudier, modifier, partager — pour une relation commerciale verrouillée, où vous êtes le seul à supporter les contraintes et les coûts.**

MinIO Community Edition reste une solution techniquement solide mais trop limitée. En revanche, pour une équipe qui cherche une brique durable, communautaire et prévisible, <u>la trajectoire commerciale mérite d'être regardée de près</u>.

Le sujet n'est donc plus uniquement technique.

Dans un environnement professionnel, il faut aussi analyser :

- les droits accordés par la licence
- les possibilités de modification et de redistribution
- les contraintes liées à l'utilisation commerciale
- la dépendance potentielle envers un éditeur
- l'orientation du produit vers une offre payante, qui peut peser sur la feuille de route et le coût total de possession.

[RustFS](https://rustfs.com/) est distribué sous licence [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).

Pour beaucoup d'équipes, cette différence simplifie considérablement l'analyse juridique et la projection à long terme.

Une mauvaise décision sur ce point peut impacter un projet plusieurs mois après son lancement.

La veille technologique ne consiste pas seulement à comparer des benchmarks. elle consiste aussi à comprendre les implications des logiciels que nous intégrons dans nos architectures.

## Mon choix

Le besoin était orienté vers un maximum de liberté et une réduction du risque juridique.

Le choix s'est donc porté sur [RustFS](https://rustfs.com/).

Ça tourne en production depuis trois semaines. Trois nœuds, réplication automatique, backup distant(partiellement). L'expérience est positive😍.

![](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWczaTA0dnRlYjNlbjJ5ZjlqaW51NDRvdzhidjRibnFxd2QyaWd3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohnEqJ1XOfvWaSk7e/giphy.gif)

MinIO Community Edition reste une machine de guerre pour de nombreux environnements et bénéficie d'une forte maturité.

Mais aujourd'hui, pour un nouveau projet [OSS](https://en.wikipedia.org/wiki/Open-source_software) ou une plateforme qui cherche une approche plus permissive, RustFS mérite clairement d'être étudié.

Même si j'ai un faible pour [Go](https://go.dev/)🔥, j'admire ce que [Rust](https://rust-lang.org/) apporte en termes de performance et de gestion mémoire.

Continuer à explorer ces technologies, monter des labs et comprendre les compromis derrière chaque choix, c'est une partie essentielle du métier DevOps.

## À toi le clavier

La tech avance trop vite pour rester figé sur une seule solution.

C'est aussi ça le plaisir de ce métier : tester, casser, reconstruire, comparer, comprendre ce qui se cache derrière les outils qu'on utilise au quotidien.

Si toi aussi tu as cette petite obsession de tester de nouvelles briques, de construire des environnements et de comprendre ce qu'il y a sous le capot, partage ton expérience.

Moi, je retourne finaliser mon ADR. Hâte de le diffuser sur le canal une fois terminé.

— Un DevOps qui préfère ouvrir un terminal plutôt qu'attendre un retour d'expérience
