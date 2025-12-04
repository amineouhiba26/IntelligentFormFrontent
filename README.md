# 🌟 Formulaire Moderne - Guide de Démarrage Complet

Projet de formulaire dynamique intelligent pour la Nuit de l'Info 2025.

## 📋 Vue d'ensemble

Ce projet comprend :
- **Frontend** : Application React + Vite avec Tailwind CSS
- **Backend** : API FastAPI avec IA (Groq) et MongoDB
- **Base de données** : MongoDB pour la persistance des données

## 🚀 Installation Rapide

### Prérequis

1. **Node.js** (v16+) et npm
2. **Python** (v3.8+)
3. **MongoDB** (local ou distant)
4. **Clé API Groq** (gratuite sur [groq.com](https://groq.com))

### Étape 1 : Installer MongoDB

#### Sur macOS (avec Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Sur Linux
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### Vérifier que MongoDB fonctionne
```bash
mongosh
# Vous devriez voir une invite MongoDB
# Tapez 'exit' pour quitter
```

### Étape 2 : Configuration du Backend

```bash
cd formulaire-intelligent

# Créer un environnement virtuel Python
python3 -m venv venv
source venv/bin/activate  # Sur macOS/Linux
# ou
venv\Scripts\activate  # Sur Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
```

**Éditer le fichier `.env` dans `formulaire-intelligent/`** :
```env
GROQ_API_KEY=votre_clé_api_groq_ici
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=formMagique
FRONTEND_ORIGIN=http://localhost:5173
```

> 💡 **Obtenir une clé API Groq** : Créez un compte gratuit sur [console.groq.com](https://console.groq.com) et générez une clé API.

### Étape 3 : Configuration du Frontend

```bash
# Retourner au répertoire racine
cd ..

# Installer les dépendances npm
npm install

# Le fichier .env est déjà créé avec les bonnes valeurs
```

## 🎯 Démarrage du Projet

### Option 1 : Démarrage Automatique (Recommandé)

#### Terminal 1 - Backend
```bash
cd formulaire-intelligent
./start.sh
```

Le script `start.sh` va :
- ✅ Créer l'environnement virtuel si nécessaire
- ✅ Installer les dépendances
- ✅ Vérifier que MongoDB fonctionne
- ✅ Démarrer le serveur FastAPI sur http://localhost:8000

#### Terminal 2 - Frontend
```bash
npm run dev
```

Le frontend sera accessible sur http://localhost:5173

### Option 2 : Démarrage Manuel

#### Terminal 1 - Backend
```bash
cd formulaire-intelligent
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

## 🧪 Vérification de l'Installation

### 1. Vérifier le Backend
Ouvrez http://localhost:8000/docs dans votre navigateur.
Vous devriez voir la documentation Swagger de l'API.

### 2. Vérifier le Frontend
Ouvrez http://localhost:5173 dans votre navigateur.
Vous devriez voir l'interface du formulaire avec un design moderne.

### 3. Vérifier MongoDB
```bash
mongosh
use formMagique
db.submissions.find()
# Devrait afficher un tableau vide [] au début
```

## 📚 Utilisation

### Flux de l'Application

1. **Page d'accueil** : L'utilisateur entre une phrase décrivant son intention
   - Exemple : "Je voudrais faire un don"
   
2. **Détection de mission** : L'IA analyse la phrase et détecte la mission
   - Contact, Don, Bénévolat, ou Information
   
3. **Formulaire dynamique** : Un formulaire adapté s'affiche
   - Champs personnalisés selon la mission
   
4. **Soumission** : Les données sont envoyées au backend
   - Sauvegarde dans MongoDB
   - Message de confirmation personnalisé

### Exemples de Prompts

- "Je veux faire un don de 50€"
- "J'aimerais devenir bénévole"
- "Comment puis-je vous contacter ?"
- "J'ai besoin d'informations sur vos programmes"

## 🔧 Configuration Avancée

### Variables d'Environnement Backend

| Variable | Description | Défaut |
|----------|-------------|--------|
| `GROQ_API_KEY` | Clé API Groq | - |
| `MODEL_NAME` | Modèle IA | `llama-3.1-70b-versatile` |
| `MONGODB_URL` | URL MongoDB | `mongodb://localhost:27017` |
| `MONGODB_DB_NAME` | Nom de la DB | `formMagique` |
| `FRONTEND_ORIGIN` | URL frontend | `http://localhost:5173` |

### Variables d'Environnement Frontend

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:8000/api` |

## 📊 Endpoints API

### Backend (http://localhost:8000)

- `GET /health` - Vérification de santé
- `POST /api/classify` - Classification de mission
- `POST /api/generate` - Génération de formulaire
- `POST /api/submit` - Soumission de formulaire
- `GET /api/submissions` - Liste des soumissions
- `GET /api/submissions/stats` - Statistiques
- `DELETE /api/submissions/{id}` - Supprimer une soumission

Documentation complète : http://localhost:8000/docs

## 🗄️ Structure de la Base de Données

### Collection `submissions`

```json
{
  "_id": "ObjectId",
  "mission": "donation",
  "values": {
    "nom": "Jean Dupont",
    "email": "jean@example.com",
    "montant": 50
  },
  "username": "Jean Dupont",
  "language": "fr",
  "confirmation_message": "Merci Jean ! Votre don de 50€...",
  "submitted_at": "2025-12-04T22:00:00Z",
  "ip_address": "127.0.0.1",
  "user_agent": "Mozilla/5.0..."
}
```

## 🐛 Dépannage

### Le backend ne démarre pas

**Erreur : "MongoDB connection failed"**
```bash
# Vérifier que MongoDB est en cours d'exécution
brew services list | grep mongodb
# ou
ps aux | grep mongod

# Redémarrer MongoDB
brew services restart mongodb-community
```

**Erreur : "GROQ_API_KEY not found"**
- Vérifiez que le fichier `.env` existe dans `formulaire-intelligent/`
- Vérifiez que `GROQ_API_KEY` est défini avec une clé valide

### Le frontend ne se connecte pas au backend

**Erreur : "Failed to fetch"**
1. Vérifiez que le backend est en cours d'exécution sur http://localhost:8000
2. Vérifiez le fichier `.env` à la racine du projet
3. Vérifiez la console du navigateur pour plus de détails

### Les styles CSS ne s'affichent pas

**Page en HTML brut**
- Le fichier `src/index.css` doit contenir les directives Tailwind
- Redémarrez le serveur de développement : `npm run dev`

### MongoDB : "Database not found"

C'est normal ! La base de données `formMagique` sera créée automatiquement lors de la première soumission.

## 📁 Structure du Projet

```
formModerne/
├── formulaire-intelligent/     # Backend FastAPI
│   ├── app/
│   │   ├── routers/           # Routes API
│   │   ├── services/          # Logique métier
│   │   ├── schemas/           # Schémas Pydantic
│   │   ├── constants/         # Constantes
│   │   ├── config.py          # Configuration
│   │   ├── database.py        # Connexion MongoDB
│   │   ├── models.py          # Modèles de données
│   │   └── main.py            # Point d'entrée
│   ├── requirements.txt       # Dépendances Python
│   ├── .env                   # Variables d'environnement
│   ├── start.sh               # Script de démarrage
│   └── README.md              # Documentation backend
│
├── src/                       # Frontend React
│   ├── components/            # Composants React
│   ├── lib/                   # Utilitaires et API
│   │   ├── api.js            # Client API
│   │   └── detect-mission.js # Détection de mission
│   ├── App.jsx               # Composant principal
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux
│
├── public/                    # Fichiers statiques
├── package.json              # Dépendances npm
├── vite.config.js            # Configuration Vite
├── tailwind.config.js        # Configuration Tailwind
├── .env                      # Variables d'environnement frontend
└── README.md                 # Ce fichier
```

## 🎨 Technologies Utilisées

### Frontend
- **React** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icônes

### Backend
- **FastAPI** - Framework web Python
- **Motor** - Driver MongoDB async
- **Groq** - API IA pour classification
- **Pydantic** - Validation de données
- **Uvicorn** - Serveur ASGI

### Base de données
- **MongoDB** - Base de données NoSQL

## 📝 Développement

### Ajouter une nouvelle mission

1. **Backend** : Modifier `app/constants/missions.py`
2. **Frontend** : Mettre à jour `src/lib/missions-schema.json`
3. **Détection** : Ajouter des mots-clés dans `src/lib/detect-mission.js`

### Modifier les champs du formulaire

Éditer le fichier `src/lib/missions-schema.json` pour chaque mission.

## 🚀 Déploiement

### Backend
- Déployer sur **Railway**, **Render**, ou **Heroku**
- Configurer les variables d'environnement
- Utiliser MongoDB Atlas pour la base de données

### Frontend
- Déployer sur **Vercel**, **Netlify**, ou **Cloudflare Pages**
- Mettre à jour `VITE_API_URL` avec l'URL de production du backend

## 📄 Licence

Projet développé pour la Nuit de l'Info 2025.

## 🆘 Support

Pour toute question ou problème :
1. Vérifiez la section Dépannage ci-dessus
2. Consultez les logs du backend et du frontend
3. Vérifiez que tous les services (MongoDB, Backend, Frontend) sont en cours d'exécution

---

**Bon développement ! 🎉**
