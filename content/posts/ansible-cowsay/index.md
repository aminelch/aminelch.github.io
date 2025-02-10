---
date: '2025-02-10'
draft: false
description: |
  Je partage 
title: >
  🐮 Un peu de fun dans vos playbooks Ansible
tags: [ansible, automatisation, cowsay, configuration, playbook]
---

Lors de mes explorations avec [Ansible](https://docs.ansible.com/ansible/latest/getting_started/index.html), cet outil magique d'automatisation, j'ai découvert une fonctionnalité amusante qui peut égayer l'exécution de vos playbooks. Par défaut, Ansible utilise [Cowsay](https://en.wikipedia.org/wiki/Cowsay) pour afficher certains messages, généralement avec une vache 🐮. 

**Mais saviez-vous qu'il est possible de diversifier ces affichages ?**

## 🎨 Personnaliser l'affichage avec Ansible

Ansible offre plusieurs options pour personnaliser l'affichage de Cowsay :

- **Sélectionner un motif spécifique** : Vous pouvez choisir un motif particulier en définissant la variable d'environnement `ANSIBLE_COW_SELECTION` avec le nom du motif souhaité. Par exemple :

  ```bash
  ANSIBLE_COW_SELECTION=dragon ansible-playbook -i inventory.yml run_single_role.yml
  ```

  Cela affichera un dragon au lieu de la vache par défaut.

- **Randomiser l'affichage** : Pour varier les motifs à chaque exécution, définissez `ANSIBLE_COW_SELECTION` sur `random` :

  ```bash
  ANSIBLE_COW_SELECTION=random ansible-playbook -i inventory.yml run_single_role.yml
  ```

  Avec cette option, Ansible choisira un motif aléatoire à chaque exécution, ajoutant une touche de surprise à vos automatisations.

- **Limiter les motifs autorisés** : Si vous souhaitez restreindre les motifs utilisés par Cowsay, vous pouvez définir une liste blanche en utilisant la variable d'environnement `ANSIBLE_COW_ACCEPTLIST`. Par exemple, pour n'autoriser que les motifs `tux` et `moose` :

  ```bash
  ANSIBLE_COW_ACCEPTLIST="tux,moose" ansible-playbook -i inventory.yml run_single_role.yml
  ```

- **Désactiver Cowsay** : Si vous préférez désactiver complètement Cowsay, définissez la variable `ANSIBLE_NOCOWS` sur `1` :

  ```bash
  ANSIBLE_NOCOWS=1 ansible-playbook -i inventory.yml run_single_role.yml
  ```

En explorant ces options, vous pouvez personnaliser l'affichage de vos playbooks Ansible et rendre vos sessions d'automatisation plus agréables et divertissantes.

<!-- <div style="text-align:center">
  <img src="/p/ansible-cowsay/playbook.png" alt="" style="width:100%;">
</div>
<br> -->

### 🚀 Mon rôle Ansible pour la configuration SSH

En parallèle de mes expérimentations avec [Ansible](https://docs.ansible.com/ansible/latest/getting_started/index.html) et [Cowsay](https://en.wikipedia.org/wiki/Cowsay), j'ai également travaillé sur un rôle Ansible dédié à la configuration de [SSH](https://en.wikipedia.org/wiki/Secure_Shell), notamment pour sécuriser l'accès en désactivant la connexion directe de l'utilisateur root. Vous pouvez le retrouver ici : 🔗 [SSH Config](https://github.com/aminelch/ssh_config)

## Sources
- [Ansible FAQ](https://docs.ansible.com/ansible/latest/reference_appendices/faq.html#how-do-i-disable-cowsay)
- [Ansible Configuration Settings](https://docs.ansible.com/ansible/latest/reference_appendices/config.html#ansible-cow-acceptlist)