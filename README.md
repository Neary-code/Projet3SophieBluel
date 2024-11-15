Portfolio de Sophie Bluel
Objectifs: Concevoir le site portfolio de l'architecte d'intérieur, Sophie Bluel.

Missions: En tant que Dev Front-end, on m'a assigné plusieurs tâches :

- Récupérer les travaux dynamiquement via l'api et pouvoir les trier par catégories via des filtres.
- Intégrer une page de connexion administrateur
- Ajouter une fenêtre modale où l'on pourra supprimer des travaux ou en ajouter via un formulaire.
- Récupération et affichage des travaux
- Le but étant de rendre l'affichage des travaux dynamique, il m'a fallu tout d'abord supprimer la gallerie statique présente dans le fichier HTML.

1 - Récupération et affichage des travaux
Récupération des données:
Utilisation de fetch pour récupérer les projets via l'API.
Données stockées pour gestion des filtres.
Affichage des projets :
Génération dynamique de la galerie avec displayProjects.
Insertion dans la page web en remplaçant le contenu statique.

2 - Gestion des filtres
Récupération des catégories via l'API.
Création dynamique des boutons avec map.
Gestion des événements clics pour filtrer avec filterProjects.

3 - Création de la page de login
Adaptation d'une page existante pour le login.
Gestion de l'authentification avec un token :
Stockage dans localStorage.
Redirection conditionnelle après connexion.

6 - Fenêtre modale pour la gestion des projets
- Ajout de projets :
Sélection de l’image.
Validation et envoi.
- Suppression de projets :
Confirmation via icône poubelle.
Suppression.

7 - Résultats et conclusion
Portfolio fonctionnel et dynamique.
Gestion des projets via la modale.
Sécurité et fluidité avec l'authentification.
Conclusion :
Projet accompli en respectant les objectifs.
Perspectives : Améliorations futures ou nouvelles fonctionnalités.
