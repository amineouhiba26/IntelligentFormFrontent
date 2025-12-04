# ⚡ Quick Setup Instructions

## 🚨 IMPORTANT: Configuration Requise

Avant de démarrer le backend, vous devez configurer votre clé API Groq.

### Étape 1: Créer le fichier .env

Dans le dossier `formulaire-intelligent/`, créez un fichier `.env` :

```bash
cd formulaire-intelligent
cp .env.example .env
```

### Étape 2: Obtenir une clé API Groq

1. Allez sur https://console.groq.com
2. Créez un compte gratuit
3. Générez une nouvelle clé API
4. Copiez la clé

### Étape 3: Configurer le fichier .env

Éditez le fichier `formulaire-intelligent/.env` et remplacez `your_groq_api_key_here` par votre vraie clé :

```env
GROQ_API_KEY=gsk_votre_vraie_clé_ici
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=formMagique
FRONTEND_ORIGIN=http://localhost:5173
```

### Étape 4: Vérifier MongoDB

Assurez-vous que MongoDB est en cours d'exécution :

```bash
# Vérifier le statut
brew services list | grep mongodb

# Si MongoDB n'est pas démarré
brew services start mongodb-community
```

### Étape 5: Démarrer le Backend

```bash
cd formulaire-intelligent
./start.sh
```

Le script va :
- ✅ Créer l'environnement virtuel Python
- ✅ Installer les dépendances
- ✅ Vérifier MongoDB
- ✅ Démarrer le serveur sur http://localhost:8000

### Étape 6: Démarrer le Frontend

Dans un nouveau terminal :

```bash
npm run dev
```

Le frontend sera accessible sur http://localhost:5173

## ✅ Vérification

1. **Backend** : Ouvrez http://localhost:8000/docs
   - Vous devriez voir la documentation Swagger

2. **Frontend** : Ouvrez http://localhost:5173
   - Vous devriez voir l'interface du formulaire

3. **MongoDB** : 
   ```bash
   mongosh
   use formMagique
   db.submissions.find()
   ```

## 🎯 Vous êtes prêt !

Le projet est maintenant configuré et fonctionnel ! 🎉

Pour plus de détails, consultez le [README.md](../README.md)
