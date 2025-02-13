# 🛡️ PhishAware

PhishAware est une application mobile d'apprentissage interactif permettant de sensibiliser les utilisateurs aux attaques de phishing. Elle propose des quiz, des exercices pratiques et des actualités sur les dernières menaces en ligne.

## 📌 Fonctionnalités
- 🎯 **Détection de phishing** : Quiz interactifs pour apprendre à repérer les tentatives de phishing.
- 📰 **Actualités** : Flux d'actualités sur les nouvelles menaces de phishing.
- 📍 **Localisation des événements** : Permet aux utilisateurs de publier et rejoindre des événements liés à la cybersécurité.
- 📱 **Compatible iOS & Android** : Développé avec React Native.

---

## 🚀 Installation & Configuration

### 1️⃣ Prérequis
- [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) et SDK Android (pour Android)

### 2️⃣ Installation du projet
Clone ce dépôt et installe les dépendances :
```bash
# Cloner le projet
git clone https://github.com/ton-github/phishaware.git
cd phishaware

# Installer les dépendances
npm install
```

### 3️⃣ Exécuter l'application
#### Android
```bash
npx react-native run-android
```
---

## 📁 Structure du projet
```
phishaware/
├── android/        # Projet Android
├── ios/            # Projet iOS
├── src/            # Code source de l'application
│   ├── components/ # Composants réutilisables
│   ├── screens/    # Écrans principaux
│   ├── services/   # Services API & utilitaires
├── App.tsx         # Point d'entrée de l'application
├── package.json    # Dépendances et scripts
├── README.md       # Documentation du projet
```

---

## 🛠 Gestion du Dépôt Git

Nous utilisons GitHub Issues pour suivre les nouvelles fonctionnalités et les bugs.

#### 📌 Branches principales :
- main → Version stable du projet.
- develop → Version en cours de développement.
- feature/nom_de_la_fonctionnalité → Pour les nouvelles fonctionnalités.
- fix/nom_du_bug → Pour les corrections de bugs.
- hotfix/nom_du_hotfix → Pour les corrections urgentes en production.

#### 📌 Workflow de développement :

### 1️⃣ Créer une branche pour une nouvelle fonctionnalité :

Avant de commencer, crée une issue sur GitHub, puis crée une branche correspondante.

```bash
git checkout develop  # Toujours partir de develop
git pull origin develop  # Mettre à jour develop
git checkout -b feature/nom_de_la_fonctionnalité
```

### 2️⃣ Ajouter des modifications et commit :

```bash
git add .
git commit -m "Ajout de [Nom de la fonctionnalité]"
```


### 3️⃣ Mettre à jour la branche avant de fusionner :

```bash
git checkout develop
git pull origin develop
git checkout feature/nom_de_la_fonctionnalité
git merge develop
```

### 4️⃣ Pousser la branche et créer une Pull Request :
```bash
git push origin feature/nom_de_la_fonctionnalité
```

#### 📌 Ensuite, ouvre une Pull Request (PR) sur GitHub pour fusionner dans develop.

### 5️⃣ Fusionner la fonctionnalité dans develop après validation :

```bash
git checkout develop
git merge feature/nom_de_la_fonctionnalité
git push origin develop
```

### 🔥 Ne pas oublier de supprimer la branche après fusion :

```bash
git branch -d feature/nom_de_la_fonctionnalité
git push origin --delete feature/nom_de_la_fonctionnalité
```
