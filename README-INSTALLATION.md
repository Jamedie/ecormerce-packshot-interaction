# Installation après un clone

Ce guide contient les étapes nécessaires pour installer, lancer et déployer le projet après un nouveau clone, sans enregistrer les secrets dans Git.

## Prérequis

- Git
- Node.js 22
- npm
- Un compte ayant accès au projet Firebase `jimmy-webar`

Vérifier Node.js :

```powershell
node --version
```

La version doit commencer par `v22`.

## 1. Cloner et installer

```powershell
git clone https://github.com/Jamedie/ecormerce-packshot-interaction.git
cd ecormerce-packshot-interaction
npm install
cd functions
npm install
cd ..
```

Le site et les fonctions Firebase ont chacun leur propre `package.json`.

## 2. Se connecter à Firebase

```powershell
npx firebase-tools login
npx firebase-tools use jimmy-webar
```

Le projet par défaut est déjà déclaré dans `.firebaserc`.

## 3. Vérifier les secrets de production

La fonction `sendEmail` utilise deux secrets stockés dans Google Cloud Secret Manager :

- `GMAIL_EMAIL`
- `GMAIL_PASSWORD`

Vérifier qu'ils existent :

```powershell
npx firebase-tools functions:secrets:get GMAIL_EMAIL
npx firebase-tools functions:secrets:get GMAIL_PASSWORD
```

S'ils existent déjà et que ton compte Firebase y a accès, il n'est pas nécessaire de les recréer après chaque clone.

Pour créer un secret manquant ou publier une nouvelle version :

```powershell
npx firebase-tools functions:secrets:set GMAIL_EMAIL
npx firebase-tools functions:secrets:set GMAIL_PASSWORD
```

La CLI demande les valeurs de manière interactive. Ne jamais mettre une valeur secrète directement dans la commande.

## 4. Configurer les secrets pour l'émulateur local

Ne pas créer `functions/.env` avec `GMAIL_EMAIL` ou `GMAIL_PASSWORD`. Firebase les interpréterait comme des variables ordinaires pendant le déploiement, ce qui entrerait en conflit avec Secret Manager.

Pour tester localement, créer un fichier `functions/.secret.local` :

```dotenv
GMAIL_EMAIL=adresse-de-test@example.com
GMAIL_PASSWORD=mot-de-passe-application-local
```

Ce fichier est ignoré par Git et doit rester uniquement sur la machine locale.

Vérifier avant d'y placer une vraie valeur :

```powershell
git check-ignore functions/.secret.local
```

La commande doit afficher `functions/.secret.local`.

Sans ce fichier, l'émulateur peut tenter d'accéder aux secrets de production avec les identifiants Google locaux.

## 5. Lancer le site

Depuis la racine :

```powershell
npm run dev
```

Vite affiche l'URL locale dans le terminal.

## 6. Lancer la fonction localement

Dans un second terminal, depuis la racine :

```powershell
npx firebase-tools emulators:start --only functions
```

L'émulateur utilise les valeurs de `functions/.secret.local` lorsqu'il existe.

## 7. Construire et déployer

Construire le site :

```powershell
npm run build
```

Déployer uniquement la fonction :

```powershell
npx firebase-tools deploy --only functions:sendEmail
```

Déployer uniquement le site :

```powershell
npm run deploy
```

Déployer le site et la fonction :

```powershell
npm run build
npx firebase-tools deploy --only hosting,functions:sendEmail
```

Le déploiement ne doit pas afficher :

```text
functions: Loaded environment variables from .env.
```

Si ce message apparaît :

```powershell
Remove-Item -LiteralPath ".\functions\.env"
```

## 8. Changer le mot de passe Gmail

1. Créer un nouveau mot de passe d'application sur <https://myaccount.google.com/apppasswords>.
2. Publier une nouvelle version du secret :

```powershell
npx firebase-tools functions:secrets:set GMAIL_PASSWORD
```

3. Redéployer la fonction :

```powershell
npx firebase-tools deploy --only functions:sendEmail
```

4. Mettre à jour `functions/.secret.local` uniquement si ce compte est aussi utilisé pour les tests locaux.

Google ne permet pas de réafficher un mot de passe d'application après sa création. S'il est perdu, il faut le révoquer et en créer un nouveau.

## Dépannage

### Runtime Node.js désactivé

`functions/package.json` doit contenir :

```json
"engines": {
  "node": "22"
}
```

### Conflit entre secret et variable ordinaire

Erreur :

```text
Secret environment variable overlaps non secret environment variable
```

Supprimer `functions/.env`, puis redéployer. Si une ancienne fonction conserve encore ces variables :

```powershell
npx firebase-tools functions:delete sendEmail --region us-central1
npx firebase-tools deploy --only functions:sendEmail
```

Cette dernière opération entraîne une courte interruption du service.

### Journal de déploiement

`firebase-debug.log` peut contenir des informations sensibles. Ne pas le partager et le supprimer après diagnostic :

```powershell
Remove-Item -LiteralPath ".\firebase-debug.log" -ErrorAction SilentlyContinue
```
