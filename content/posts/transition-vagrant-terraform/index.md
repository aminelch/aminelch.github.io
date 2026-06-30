---
aliases:
- /posts/transition-vagrant-terraform/
coverCaption: 'Illustration générée par [ChatGPT OpenAI](https://openai.com/policies/terms-of-use),
  utilisée dans un contexte éditorial technique.

  '
date: 2026-06-29
description: 'Retour d''expérience sur ma transition de Vagrant à Terraform : pourquoi
  je délaisse le Ruby au profit du HCL pour la gestion et l''automatisation de mon
  homelab et de mes infrastructures.'
draft: false
tags:
- IaC
- Vagrant
- Terraform
- HashiCorp
title: 'Adieu Vagrant, bonjour Terraform : Pourquoi j''ai changé d''outil d''IaC'
---

# Adieu Vagrant, bonjour Terraform : Pourquoi j'ai changé d'outil d'IaC

Je vais commencer par une confession : oui... une petite partie de la raison est que je n'aime pas vraiment Ruby. 😅 

Mais ce n'est clairement pas la cause principale de ce changement.

En réalité, j'ai beaucoup apprécié **Vagrant**. C'est un outil qui m'a accompagné pendant plusieurs années et m'a énormément appris sur l'**Infrastructure as Code (IaC)**. Je l'ai utilisé pour construire des laboratoires, tester mes *playbooks* Ansible, reproduire des architectures réseau et préparer différents environnements de développement.

J'ai même pris le temps de contribuer au projet en proposant un [*Pull Request*](https://github.com/hashicorp/vagrant/pull/13604) sur GitHub. Pour moi, c'est le meilleur indicateur qu'un projet m'a réellement apporté de la valeur : quand on commence à y contribuer, c'est qu'on a envie de lui rendre un peu de ce qu'il nous a offert.

Et honnêtement, je continue de penser que Vagrant reste un excellent outil.


## Vagrant, le pilier de mon homelab

Je me rappelle encore de mes débuts. C’était l'époque où je lançais l'interface de [VirtualBox](https://www.virtualbox.org/) pour créer mes premières machines virtuelles. Clic après clic, je configurais manuellement les cartes réseau, je créais des pools de stockage pour y associer des disques virtuels, et j'installais mes OS. C'était la toute première fois que je provisionnais des ressources et, même si tout était entièrement manuel et graphique, c'était une révélation.

Pour automatiser cette couche locale et dépasser ces clics manuels, j'ai fini par construire un véritable *homelab*. Pour l'orchestrer, j'ai conçu un script d'initialisation fait maison qui se charge de tout le montage de l'infrastructure : la configuration des cartes réseau, le démarrage ordonné des machines virtuelles (VM) via Vagrant, puis le lancement des playbooks Ansible pour le *provisioning* final. C'est un outil clé en main qui me permet de recréer l'intégralité du laboratoire en quelques minutes.

![Exécution du script de déploiement automatique du homelab](vm-provision.png)



{{< alert >}}
Ce lab m'a énormément servi pour apprendre plusieurs choses comme Ansible, les réseaux, Linux etc.
{{< /alert >}}

## Au-delà de la machine virtuelle : l'évolution de mes besoins

Quand j'ai commencé à travailler davantage sur des environnements cloud, je me suis rendu compte que je ne pensais plus uniquement en termes de machines virtuelles isolées. Je voulais décrire et piloter une **infrastructure complète** :
- Des réseaux virtuels et des sous-réseaux (VPC, subnets)
- Du stockage managé ou distribué
- Des clusters Kubernetes
- Des équilibreurs de charge (*load balancers*)
- Des bases de données managées

Bref, toutes les briques complexes qui composent une plateforme moderne. C'est là que **Terraform** est entré en jeu.


Au-delà de ma préférence personnelle pour le [HCL](https://developer.hashicorp.com/terraform/language/syntax/configuration) (HashiCorp Configuration Language) par rapport au [Ruby](https://www.ruby-lang.org/en/), c'est la philosophie sous-jacente qui change tout.

* [Vagrant](https://developer.hashicorp.com/vagrant)**(Impératif/Scripté)** : On décrit l'infrastructure à travers des scripts et des boucles en Ruby. On doit parfois gérer la logique de programmation pour configurer les machines.
* **Terraform (Déclaratif)** : On décrit directement l'état souhaité de l'infrastructure. On ne dit pas à Terraform *comment* créer les ressources, on lui dit simplement *ce que l'on veut*. Terraform se charge ensuite de calculer le graphe des dépendances, de déterminer l'ordre de création et d'appliquer les changements nécessaires.

### Comparaison rapide : Vagrant vs Terraform

Pour illustrer cette différence, voici comment on définit une ressource simple (une machine virtuelle) dans les deux mondes :

```ruby
# Vagrantfile (Ruby)
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.define "web-server" do |web|
    web.vm.network "private_network", ip: "192.168.56.10"
    web.vm.provider "virtualbox" do |v|
      v.memory = 2048
      v.cpus = 2
    end
  end
end
```

```hcl
# main.tf (HCL - Exemple pour déployer une instance EC2 sur AWS)
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Ubuntu LTS
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
  }
}
```

Avec Terraform, tout est déclaré dans des fichiers HCL lisibles, versionnés dans Git et facilement réutilisables sous forme de **modules**. Je peux faire évoluer cette infrastructure en modifiant simplement la description de son état, sans avoir à réécrire la logique d'exécution.


## Un workflow unique, peu importe le fournisseur

Avec Vagrant, j'automatisais essentiellement mes labs locaux (VirtualBox, Libvirt, VMware).

Avec Terraform, je décris une infrastructure de manière standardisée et **indépendante de la plateforme**. Que ma cible soit Proxmox dans mon *homelab*, [AWS](https://aws.amazon.com/fr/), [libvirt](https://libvirt.org/), [OpenStack](https://www.openstack.org/) ou même un cluster [Kubernetes](https://kubernetes.io/), je conserve exactement :
1. La même philosophie de conception.
2. Le même workflow (`terraform init`, `plan`, `apply`).
3. Les mêmes mécanismes de collaboration (gestion du *state*).

Chaque modification passe par Git (GitOps), les changements sont passés en revue via des *Pull Requests*, les modules sont partagés et l'ensemble est rigoureusement reproductible.


Je ne considère pas cette transition comme un abandon définitif de Vagrant.

Vagrant m'a appris les bases de l'IaC bien avant que je ne me plonge dans le cloud. Si demain j'ai besoin de monter en quelques secondes une VM locale jetable pour tester un script rapide ou un rôle Ansible, il y a de fortes chances que je lance un simple `vagrant up`.

Mais pour construire, maintenir et faire évoluer des infrastructures durables et structurées, **Terraform** s'est imposé comme une évidence. C'est l'outil qui correspond le mieux à mes objectifs actuels d'apprentissage et de professionnalisation dans l'écosystème DevOps.

Et puis... ne plus avoir à débugger du Ruby pour configurer mes VMs, c'est quand même un sacré bonus ! 🚀

Et je ne vais pas mentir...

Le fait de remplacer progressivement le Ruby par du HCL ne me rend pas triste. 😄