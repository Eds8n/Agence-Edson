# 🏢 Agence Personnelle Edson Eugene

**[ Visiter le site en ligne ici](https://edson-agence.vercel.app/)**

Une plateforme web moderne et réactive présentant les services, le portfolio et les expertises de mon agence web. Ce dépôt sert de vitrine pour présenter le code source et l'architecture de mon site officiel.

##  Fonctionnalités

* **Présentation des Services :** Découverte détaillée des offres de développement sur mesure et de consultation.
* **Portfolio Dynamique :** Mise en avant des projets réalisés avec un système de carrousel pour les galeries photos.
* **Support Multilingue :** Application disponible en Français et Anglais.
* **Prise de Contact Facile :** Formulaire de contact interactif intégré pour les clients potentiels.
* **Interface Adaptative :** Design entièrement responsive (mobile, tablette, bureau).

##  Technologies

* **Frontend :** React, JavaScript (Vanilla), HTML5, CSS
* **Outil de construction :** Vite
* **Internationalisation :** react-i18next
* **Messagerie :** EmailJS
* **Hébergement & Déploiement :** Vercel

##  Structure du Projet

```text
AGENCE EDSON/
├── node_modules/         # Dépendances du projet
├── public/               # Fichiers statiques et ressources publiques
│   ├── images/           # Images des projets du portfolio (coiffeur, Pattes & Co, resto)
│   ├── locales/          # Fichiers de traduction JSON (en, fr)
│   ├── favicon.png       # Icône du site
│   ├── favicon.svg       # Icône vectorielle du site
│   └── icons.svg         # Fichier d'icônes
├── src/                  # Code source de l'application React
│   ├── assets/           # Ressources internes (logos, etc.)
│   ├── App.css           # Styles spécifiques du composant principal
│   ├── App.jsx           # Composant principal (Logique de l'interface et du carrousel)
│   ├── i18n.js           # Configuration de l'internationalisation
│   ├── index.css         # Styles globaux de l'application
│   └── main.jsx          # Point d'entrée principal de l'application
├── .env                  # Variables secrètes (clés API pour EmailJS)
├── .gitignore            # Fichiers et dossiers ignorés par Git
├── eslint.config.js      # Configuration des règles de linter
├── index.html            # Fichier HTML racine
├── package-lock.json     # Arbre exact des versions des dépendances
├── package.json          # Configuration du projet, scripts et dépendances
└── README.md             # Documentation du projet
```

<img width="1901" height="908" alt="Capture d’écran 2026-07-20 012732" src="https://github.com/user-attachments/assets/aa3d9a05-552b-4302-92c7-899414f0b1b0" />
