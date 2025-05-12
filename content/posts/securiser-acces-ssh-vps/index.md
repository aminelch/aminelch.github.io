---
date: 2025-02-12
draft: false
description: |
  "Retour d’expérience sur la mise en place d’une configuration SSH sécurisée dès la première connexion à un VPS"
tags: [ansible, automatisation, ssh, sécurité, vps]
title: >
  SSH, récit d’un accès maîtrisé.
coverAlt: >
    Illustration générée via DALL·E 3 – libre de droits selon [les conditions OpenAI](https://openai.com/policies/terms-of-use)
coverCaption: >
    Illustration générée via DALL·E 3 – libre de droits selon [les conditions OpenAI](https://openai.com/policies/terms-of-use)
---

Il y a quelques jours, j’ai dû préparer un petit [VPS](https://safozi.com/serveur-virtuel-prive/vps) fraîchement provisionné. Le genre de serveur nu, livré brut, sans âme, avec un `root` tout-puissant prêt à accueillir le chaos.  
Un peu comme un appartement flambant neuf, les clés posées sur la porte.

En tant qu'architecte responsable (et légèrement parano 😎), ma priorité est de poser des bases solides pour l'infrastructure, en sécurisant notamment des éléments critiques comme l’accès SSH. J'ai donc pris soin de verrouiller l’entrée principale et d’installer un digicode, avant que les administrateurs systèmes et ingénieurs DevOps n’adaptent et implémentent la configuration.

## Une routine, mais jamais banale

Sécuriser l’accès SSH, c’est souvent la toute première ligne de défense, et pourtant la plus négligée. Trop de serveurs sont mis en ligne avec des accès permissifs, parfois même avec l’authentification par mot de passe activée — un véritable tapis rouge pour les attaques automatisées.

Bien que cette routine soit essentielle, elle n’est jamais banale. Chaque mauvaise configuration est une opportunité offerte à un [botnet](https://en.wikipedia.org/wiki/Botnet#Telnet). Dans le domaine de la cybersécurité, ce n’est pas l’exploit sophistiqué qui vous attrape, c’est plutôt l’erreur humaine, ou pire : la négligence.

## Récapitulatif des éléments essentiels de la configuration par défaut

| Élément                  | Détail                                                        |
|--------------------------|---------------------------------------------------------------|
| **Service SSH**           | SSH (Secure Shell)                                           |
| **Port par défaut**       | 22                                                           |
| **Paquet à installer**    | openssh-server                                               |
| **Fichier de configuration** | `/etc/ssh/sshd_config` et `/etc/ssh/sshd_config.d`                                   |

## Un rôle Ansible pour les gouverner tous

Dans mon cas, je n’ai pas tout fait à la main. J’ai utilisé un rôle Ansible que j’ai développé moi-même, [ssh_config](https://github.com/aminelch/ssh_config).  
Ce rôle applique des règles simples mais fondamentales :

1. Interdire la connexion directe en tant que `root`.
2. Valider la configuration avant de redémarrer le service SSH (histoire de ne pas se verrouiller hors du serveur par accident).
3. Appliquer des réglages sécurisés dès le départ, sans y penser à chaque fois.

Ce rôle s’inscrit donc dans une stratégie de défense en profondeur. Il n’est pas là pour tout faire à votre place, mais pour vous éviter les erreurs classiques et garantir un socle sain, prêt à être complété.

Voici une liste non exhaustive des directives que vous pouvez ajuster pour renforcer encore davantage la configuration :

| Directive                | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| **PermitRootLogin**       | Contrôle si la connexion directe en tant que `root` est autorisée.          |
| **PasswordAuthentication**| Permet ou empêche l'authentification par mot de passe.                       |
| **PubkeyAuthentication**  | Active ou désactive l'authentification par clé publique.                    |
| **AllowUsers**            | Spécifie les utilisateurs autorisés à se connecter via SSH.                 |
| **AllowGroups**           | Spécifie les groupes d'utilisateurs autorisés à se connecter via SSH.      |
| **DenyUsers**             | Définit une liste d'utilisateurs interdits de se connecter via SSH.        |
| **DenyGroups**            | Définit une liste de groupes interdits de se connecter via SSH.            |
| **MaxAuthTries**          | Limite le nombre de tentatives d'authentification échouées avant déconnexion.|
| **MaxSessions**           | Limite le nombre de sessions simultanées autorisées pour une même connexion.|
| **UsePAM**                | Active ou désactive l'utilisation du module PAM (Pluggable Authentication Modules). |

Pour plus d'informations détaillées, consultez la documentation complète de [sshd_config](https://man.openbsd.org/sshd_config).

## Démo 

Pour illustrer cette configuration en action, j’ai utilisé une machine de test basée sur [debian-systemd](https://gitlab.com/cool-devops-stuff/debian-systemd), que je maintiens sous forme d’une image docker.
Le provisionnement est entièrement automatisé grâce à mon utilitaire nommé [deploy.sh](https://gitlab.com/cool-devops-stuff/deploy.sh).

Cet utilitaire me permet de lancer rapidement un environnement de test reproductible, idéal pour valider mes rôles Ansible en toute sécurité.

1. Préparation de l'envrionnement de test

```bash 
$- deploy -c 1; deploy -i 

================================== Container Info ==================================
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│ 🐋 Container Name  │ ⏳ Started at       │ 🌐 IP Address      │ 📊 Status          │
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ eminix-debian-1       │ 2025-02-09 20:41:08  │ 172.17.0.2           │ running             │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

{{< alert >}}
**INFO:** L'option `-c` permet de créer nombre arbitraire des conteneurs(ici un seul conteneur), tandis que `-i` affiche un tableau récapitulatif de l’état des conteneurs.
{{< /alert >}}

2. Affichage de la configuration par défaut

```bash
$- ssh eminix@172.17.0.2 -t grep --color=always  -i Permitroot /etc/ssh/sshd_config

PermitRootLogin yes
# the setting of "PermitRootLogin yes".
Connection to 172.17.0.2 closed.
```

3. Lancement du rôle

```bash
$- ansible-playbook -i inventory-dev.yml  run_single_role.yml
 ________________________________________________________
< TASK [ssh_config : Ensure PermitRootLogin is disabled] >
 --------------------------------------------------------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/`\
    \___)=(___/


changed: [test1]
 ___________________________________________________________
< RUNNING HANDLER [ssh_config : Validate SSH configuration] >
 -----------------------------------------------------------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/`\
    \___)=(___/


ok: [test1]
 ____________
< PLAY RECAP >
 ------------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/`\
    \___)=(___/
test1                       : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0  
```

{{< alert >}}
**INFO:** La commande `ansible-playbook -i inventory-dev.yml run_single_role.yml` exécute un playbook qui applique le rôle `ssh_config` — que nous venons de détailler — sur les hôtes définis dans l’inventaire `inventory-dev.yml`
{{< /alert >}}

4. Vérification de la nouvelle config

```bash
$- ssh eminix@172.17.0.2 -t grep --color=always  -i 'Permitroot /etc/ssh/sshd_config'
PermitRootLogin no
# the setting of "PermitRootLogin yes".
Connection to 172.17.0.2 closed. 
```

## En conclusion

Sécuriser un serveur n'est pas une tâche à prendre à la légère. Cela implique de mettre en place des configurations solides dès le début pour éviter toute vulnérabilité. Comme illustré dans ce buillet, l’utilisation d'un outil comme [Ansible](https://docs.ansible.com/ansible/latest/index.html) permet d’automatiser ces bonnes pratiques.