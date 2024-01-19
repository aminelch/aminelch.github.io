---
author: Amine LOUHICHI
date: '2024-01-07T21:50:58+01:00'
draft: true
description: |
  Ghost delivers a great self-hosted blogging platform that deploys well in containers.
  Let's deploy it on CoreOS along with Caddy. ️📝
tags:
  - ssh
title: >
    Accéder en SSH à vos dépôts distants Git 🔐
coverAlt: >
    Lots of gold-colored beams in the ceiling of a building in Lisbon, Porgugal
    with a blue sky behind them
coverCaption: >
  Photo de Markus Winkler depuis <a href="https://www.pexels.com/photo/grayscale-photo-of-padlock-on-metal-fence-5848614">Pexels</a>
---

Les clés **SSH** sont utilisées pour authentifier les connexions
sécurisées. En suivant ce guide, vous serez en mesure de
créer et de commencer à utiliser une clé SSH. Git est
capable d'utiliser des clés SSH à la place de
l'authentification par mot de passe traditionnelle lors d'un
push ou d'un pull avec des dépôts distants.

### Comment générer des clés SSH ?
Il faut alors générer une paire de clé SSH via la commande: `ssh-keygen`

As most folks know, by default, MySQL limits the size of a MyISAM table at 4GB. Where does this limit come from? It's the maximum of a 32-bit address:

> 2<sup>32</sup> = 4,294,967,296 bytes = 4GB

How is this 4GB allocated? Well here's the math:

> row count X row length = 4GB max

Basically, if your rows don't contain much information, you can cram a lot of rows into a table. On the flip side, if you don't plan on having too many rows, you can cram a lot of information in each row.

Here's where things get ugly. If you have a MyISAM table and you exceed the maximum data length for the table, it may or may not tell you that you've exceeded the limit (depending on the version). If it doesn't tell you, your data will actually become corrupt.

So, how can you find out what a table's limit is? Run `show table status like 'tablename'` and check the value for `Max_data_length`. The default, of course, is `4294967295`.

How can the `Max_data_length` be increased? Just run something like `alter table tablename max_rows = 200000000000 avg_row_length = 50`. This example would increase your `Max_data_length` to 1,099,511,627,775.
