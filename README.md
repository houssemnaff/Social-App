# Social App 🌐

**Social App** est une application de réseau social moderne qui permet aux utilisateurs de se connecter, partager des posts, interagir avec des commentaires, et gérer leur réseau d'amis. Ce projet est développé avec React pour le frontend et Node.js pour le backend, avec une architecture sécurisée utilisant JWT pour l'authentification.

## Fonctionnalités principales 🚀

### Utilisateurs 👤
- Inscription et connexion avec authentification sécurisée (JWT).
- Mise à jour des profils utilisateur (photo de profil, informations personnelles).
- Recherche et ajout d'amis.
- Liste d'amis avec options pour supprimer ou accepter des demandes.

### Posts 📝
- Création de posts avec texte et images.
- Consultation d'une timeline affichant les posts des amis.
- Like et dislike des posts.

### Commentaires 💬
- Ajouter des commentaires sur les posts.
- Suppression ou modification des commentaires.

### Notifications 🔔
- Notifications pour les likes, commentaires et nouvelles demandes d'amis.

### Sécurité 🔒
- Authentification et autorisation sécurisées avec JWT.
- Protection des routes sensibles via des middlewares.
- Validation des entrées côté serveur et client.

## Technologies utilisées 🛠️

### Frontend :
- **React.js** : Interface utilisateur réactive et dynamique.
- **React Router** : Gestion des routes.
- **Axios** : Pour les requêtes HTTP au backend.
- **Material-UI / Tailwind CSS** : Design moderne et réactif.

### Backend :
- **Node.js** : Serveur backend.
- **Express.js** : Création des APIs RESTful.
- **MongoDB** : Base de données NoSQL pour stocker les informations des utilisateurs, des posts, et des commentaires.
- **Mongoose** : ODM pour MongoDB.
- **JSON Web Tokens (JWT)** : Authentification sécurisée.
- **bcrypt.js** : Hachage des mots de passe.

### Outils supplémentaires :
- **Cloudinary** : Pour l'hébergement des images.
- **Postman** : Pour tester les APIs.
- **Dotenv** : Gestion des variables d'environnement.


