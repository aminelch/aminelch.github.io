---
date: '2025-09-15'
title: "Guide pratique pour installer et sécuriser PostgreSQL sur Ubuntu"
description: "Guide pratique pour installer et sécuriser PostgreSQL sur Ubuntu"
tags: ["RDBMS","dba", "pgsql", "postgresql", "system administration","guide"]
coverAlt: Photo de PostgreSQL depuis <a href="https://wallpapercave.com/w/wp13366591">wallpapercave</a>

coverCaption: Photo de PostgreSQL depuis <a href="https://wallpapercave.com/w/wp13366591">wallpapercave</a>
---

Ce guide vous explique comment installer PostgreSQL sur Ubuntu et le configurer de manière sécurisée.

## 1. Mettre à jour le système

Avant d'installer PostgreSQL, assurez-vous que votre système est à jour en exécutant les commandes suivantes :

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Installer PostgreSQL

PostgreSQL est disponible dans les dépôts officiels d'Ubuntu. Pour l'installer, utilisez la commande suivante :

```bash
sudo apt install postgresql postgresql-contrib -y
```

Cela installera PostgreSQL ainsi que quelques extensions supplémentaires.

## 3. Vérifier l'état du service PostgreSQL

Une fois l'installation terminée, PostgreSQL démarre automatiquement. Vous pouvez vérifier son état avec la commande suivante :

```bash
sudo systemctl status postgresql
```

## 4. Accéder à PostgreSQL en tant qu'utilisateur `postgres`

PostgreSQL crée un utilisateur système `postgres` lors de l'installation. Connectez-vous à PostgreSQL avec cet utilisateur :

```bash
sudo -i -u postgres
psql
```

Cela vous donnera accès au shell PostgreSQL. Pour quitter le shell, tapez `\q`.

## 5. Sécuriser l'accès à PostgreSQL

### 5.1 Changer le mot de passe de l'utilisateur `postgres`

Il est important de sécuriser l'accès à PostgreSQL en changeant le mot de passe de l'utilisateur `postgres` :

```bash
psql
\password postgres
```

Vous serez invité à entrer un mot de passe robuste pour l'utilisateur `postgres`.

### 5.2 Modifier la configuration de connexion

PostgreSQL utilise le fichier `pg_hba.conf` pour contrôler l'authentification et l'accès réseau. Par défaut, PostgreSQL permet la connexion en local sans mot de passe (`peer`). Il est recommandé de configurer une authentification par mot de passe pour renforcer la sécurité.

Modifiez le fichier `pg_hba.conf` pour forcer l'authentification par mot de passe pour l'utilisateur `postgres` :

```bash
sudo nano /etc/postgresql/VERSION/main/pg_hba.conf
```

Assurez-vous que la ligne suivante est présente et décommentée :

```plaintext
local   all             postgres                                scram-sha-256
```

Cela obligera PostgreSQL à demander un mot de passe robuste pour toute connexion locale, en utilisant une méthode d'authentification plus sécurisée que MD5.

### 5.3 Restreindre l'accès aux connexions externes

Si vous autorisez l'accès externe à PostgreSQL, vous devrez configurer le fichier `postgresql.conf` et ajuster les règles dans `pg_hba.conf`.

Modifiez le fichier `postgresql.conf` pour que PostgreSQL écoute sur toutes les interfaces réseau (si nécessaire) :

```bash
sudo nano /etc/postgresql/VERSION/main/postgresql.conf
```

Cherchez la ligne `listen_addresses` et modifiez-la ainsi :

```plaintext
listen_addresses = '*'
```

**Attention :** Utiliser `listen_addresses = '*'` est fortement déconseillé en production car cela expose votre base de données à toutes les interfaces réseau. Il est préférable de spécifier des adresses IP internes spécifiques ou d'utiliser un proxy inverse/VPN pour un accès externe sécurisé.

Cela permettra à PostgreSQL d'écouter sur toutes les interfaces réseau. Si vous voulez restreindre l'accès à une adresse IP spécifique, vous pouvez modifier cette ligne en conséquence, par exemple :

```plaintext
listen_addresses = 'localhost,192.168.1.100'
```

Ensuite, modifiez le fichier `pg_hba.conf` pour autoriser l'accès à partir de certaines adresses IP, comme suit :

```bash
sudo nano /etc/postgresql/VERSION/main/pg_hba.conf
```

Pour autoriser l'accès depuis l'IP `192.168.1.100`, ajoutez la ligne suivante :

```plaintext
host    all             all             192.168.1.100/32           md5
```

Cela autorisera uniquement cette adresse IP à se connecter à PostgreSQL. Vous pouvez ajouter d'autres adresses IP selon vos besoins.

## 6. Configurer le pare-feu (UFW)

Si vous permettez l'accès externe à PostgreSQL, vous devez configurer un pare-feu pour autoriser les connexions sur le port 5432. Si vous utilisez UFW, vous pouvez autoriser l'accès avec la commande suivante :

```bash
sudo ufw allow from <trusted-ip> to any port 5432
```

Remplacez `<trusted-ip>` par l'adresse IP autorisée. Si vous ne souhaitez autoriser l'accès qu'à partir de `localhost`, aucune modification du pare-feu n'est nécessaire.

## 7. Activer les connexions sécurisées (SSL)

Il est recommandé d'utiliser des connexions chiffrées avec SSL, en particulier si vous autorisez l'accès externe. Pour activer SSL, modifiez le fichier `postgresql.conf` :

```bash
sudo vim /etc/postgresql/VERSION/main/postgresql.conf
```

Cherchez et décommentez les lignes suivantes :

```plaintext
ssl = on
ssl_cert_file = '/etc/ssl/certs/ssl-cert-snakeoil.pem'
ssl_key_file = '/etc/ssl/private/ssl-cert-snakeoil.key'
```

{{< alert >}}
**INFO:** Les certificats `ssl-cert-snakeoil.pem` et `ssl-cert-snakeoil.key` sont des certificats auto-signés fournis par défaut sur Ubuntu. Ils chiffrent la connexion mais ne permettent pas au client de vérifier l'identité du serveur. Pour un environnement de production, il est fortement recommandé d'utiliser des certificats émis par une autorité de certification (CA) de confiance.
{{< /alert >}}

Remplacez ces chemins par les fichiers de certificat et de clé valides pour votre configuration.

Pour les clients, il est important de configurer l'option `sslmode` dans leur chaîne de connexion (par exemple, `sslmode=require`, `sslmode=verify-ca`, `sslmode=verify-full`) pour s'assurer que les connexions sont sécurisées et que l'identité du serveur est vérifiée.

## 8. Surveiller l'activité de PostgreSQL

Vous pouvez surveiller les connexions actives à PostgreSQL avec la commande suivante :

```bash
psql -c "SELECT * FROM pg_stat_activity;"
```

Cela vous permettra de voir toutes les connexions en cours à la base de données.

**Journalisation et surveillance avancées :** Pour une meilleure visibilité et un dépannage efficace, configurez les paramètres de journalisation de PostgreSQL dans `postgresql.conf` (par exemple, `log_destination`, `logging_collector`, `log_min_duration_statement`) pour capturer des informations détaillées sur les requêtes lentes, les erreurs et les connexions. Pour les environnements de production, l'intégration avec des outils de surveillance externes (comme Prometheus, Grafana) est fortement recommandée.

## 9. Gérer les utilisateurs et le principe du moindre privilège

Il est crucial de ne pas utiliser l'utilisateur `postgres` (superutilisateur) pour les applications ou les utilisateurs quotidiens. Créez des rôles dédiés avec les privilèges minimaux nécessaires.

Pour créer un nouvel utilisateur (rôle) et une base de données :

```postgresql
sudo -i -u postgres
createuser --interactive
createdb -O <nom_utilisateur> <nom_base_de_donnees>
psql -c "GRANT ALL PRIVILEGES ON DATABASE <nom_base_de_donnees> TO <nom_utilisateur>;"
```

Ensuite, connectez-vous à `psql` en tant que `postgres` et définissez un mot de passe pour le nouvel utilisateur :

```postgresql
psql
\password <nom_utilisateur>
```

Assurez-vous que les applications se connectent avec cet utilisateur dédié et non avec `postgres`.

## 10. Réaliser des sauvegardes régulières

Pour protéger vos données, vous devez configurer des sauvegardes régulières avec `pg_dump`. Par exemple :

```bash
pg_dump -U postgres -F c -b -v -f "/path/to/backup/backup_name.dump" your_database_name
```

Vous pouvez automatiser cette tâche avec un script cron.

**Sauvegardes avancées :** Pour des environnements de production, envisagez des méthodes de sauvegarde physique comme `pg_basebackup` pour des sauvegardes complètes de cluster, et l'archivage des journaux de transactions (WAL) pour la récupération à un instant précis (PITR). Il est crucial de **tester régulièrement vos sauvegardes** pour s'assurer de leur intégrité et de leur capacité de restauration.

## 11. Mettre à jour régulièrement PostgreSQL

Il est essentiel de garder PostgreSQL à jour pour éviter les vulnérabilités de sécurité. Utilisez la commande suivante pour vérifier les mises à jour :

```bash
sudo apt update && sudo apt upgrade -y
```

## Conclusion

Voici un récapitulatif des meilleures pratiques pour sécuriser votre installation PostgreSQL sur Ubuntu :

1.  **Mettre à jour le système et PostgreSQL**.
2.  **Sécuriser l'utilisateur `postgres`** avec un mot de passe robuste.
3.  **Restreindre l'accès externe** en configurant correctement `pg_hba.conf` et `postgresql.conf`.
4.  **Configurer le pare-feu** pour limiter l'accès au port 5432.
5.  **Utiliser SSL** pour sécuriser les connexions externes.
6.  **Gérer les utilisateurs** avec le principe du moindre privilège.
7.  **Mettre en place des sauvegardes régulières**.
8.  **Mettre à jour PostgreSQL** régulièrement.

Suivre ces étapes vous permettra de maintenir une installation PostgreSQL robuste et sécurisée.
