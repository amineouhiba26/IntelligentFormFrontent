# 🚀 Quick Start Guide

## ⚡ Démarrage Rapide en 3 Minutes

### Prérequis
- ✅ MongoDB installé et en cours d'exécution
- ✅ Node.js et npm installés
- ✅ Python 3.8+ installé

---

## 📝 Étape 1: Configuration (2 minutes)

### 1.1 Clé API Groq (OBLIGATOIRE)

```bash
# Aller dans le dossier backend
cd formulaire-intelligent

# Copier le template
cp .env.example .env

# Éditer le fichier .env
# Remplacer 'your_groq_api_key_here' par votre vraie clé
```

**Obtenir une clé gratuite**: https://console.groq.com

Votre `.env` doit ressembler à :
```env
GROQ_API_KEY=gsk_votre_vraie_clé_ici
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=formMagique
```

### 1.2 Vérifier MongoDB

```bash
# Vérifier que MongoDB est en cours d'exécution
brew services list | grep mongodb

# Si pas démarré :
brew services start mongodb-community
```

---

## 🎯 Étape 2: Démarrage (1 minute)

### Terminal 1 - Backend

```bash
cd formulaire-intelligent
./start.sh
```

Attendez de voir :
```
✅ Connected to MongoDB at mongodb://localhost:27017
📦 Using database: formMagique
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2 - Frontend

```bash
# Depuis la racine du projet
npm run dev
```

Attendez de voir :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

## ✅ Étape 3: Vérification

### 3.1 Backend
Ouvrez http://localhost:8000/docs

Vous devriez voir la documentation Swagger avec tous les endpoints.

### 3.2 Frontend
Ouvrez http://localhost:5173

Vous devriez voir une belle interface avec :
- Un champ de saisie pour votre intention
- Un design moderne avec gradients
- Un bouton "Edit Fields" en haut à droite

### 3.3 Test Complet

1. Dans le frontend, tapez : **"Je veux faire un don"**
2. Cliquez sur le bouton de soumission
3. Un formulaire de don devrait apparaître
4. Remplissez les champs et soumettez
5. Vous devriez voir une page de confirmation

---

## 🎉 C'est Tout !

Votre application est maintenant fonctionnelle !

### Prochaines étapes

- Testez différentes intentions :
  - "Je veux devenir bénévole"
  - "J'ai besoin d'informations"
  - "Comment vous contacter ?"

- Consultez les soumissions dans MongoDB :
  ```bash
  mongosh
  use formMagique
  db.submissions.find().pretty()
  ```

- Explorez l'API : http://localhost:8000/docs

---

## 🆘 Problèmes ?

### Le backend ne démarre pas

**Erreur : "MongoDB connection failed"**
```bash
brew services restart mongodb-community
```

**Erreur : "GROQ_API_KEY not found"**
- Vérifiez que `.env` existe dans `formulaire-intelligent/`
- Vérifiez que la clé est bien définie

### Le frontend affiche une erreur

**"Failed to fetch"**
- Vérifiez que le backend est bien démarré sur port 8000
- Vérifiez les logs du backend

### Pas de styles CSS

- Redémarrez le serveur frontend : `npm run dev`
- Vérifiez que `src/index.css` contient les directives Tailwind

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- [README.md](README.md) - Guide complet
- [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Résumé du projet
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Détails techniques

---

**Bon développement ! 🚀**
