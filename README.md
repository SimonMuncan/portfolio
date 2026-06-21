# Simon Muncan — Portfolio

Personal portfolio website built with React, Vite, and Tailwind CSS. Hosted on Firebase Hosting.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- Lucide React (icons)
- Firebase Hosting

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Firebase

1. Install the Firebase CLI and log in:

```bash
npm install -g firebase-tools
firebase login
```

2. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com), then update `.firebaserc` with your project ID.

3. Deploy:

```bash
npm run build
firebase deploy
```
