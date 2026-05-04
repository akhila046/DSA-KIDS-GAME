<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fredoka+One&size=40&duration=3000&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=DSA+Kids+Learning+Game+🎮;Learn+DSA+Through+Play!;Master+Algorithms+with+Fun!" alt="Typing SVG" />

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-6C63FF?style=for-the-badge)](https://akhila046.github.io/DSA-KIDS-GAME/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/akhila046/DSA-KIDS-GAME)
[![Deploy](https://img.shields.io/github/actions/workflow/status/akhila046/DSA-KIDS-GAME/deploy.yml?style=for-the-badge&label=Deploy&logo=github-actions)](https://github.com/akhila046/DSA-KIDS-GAME/actions)

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Optional-FFCA28?style=flat-square&logo=firebase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0055?style=flat-square&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

<br/>

> 🚀 **A fully interactive, gamified platform that teaches Data Structures & Algorithms to kids and beginners through games, animations, and challenges.**

<br/>

---

</div>

## 📸 Preview

<div align="center">

| 🏠 Home Page | 🗺️ Dashboard |
|:---:|:---:|
| Hero section with animated cards | Level selection with progress tracking |

| 🎮 Stack Game | 📝 Quiz |
|:---:|:---:|
| Plate stacking with LIFO visualization | Timed MCQs with instant feedback |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Game-Based Learning
- **📦 Arrays** — Index box explorer
- **🔗 Linked Lists** — Node chain builder
- **🍽️ Stacks** — Plate stacking (LIFO)
- **🎟️ Queues** — Ticket line (FIFO)
- **🌳 Trees** — BST visualizer with SVG
- **🕸️ Graphs** — BFS & DFS explorer

</td>
<td width="50%">

### 🏆 Gamification
- ⭐ Points system per action
- 🏅 Badges for completed levels
- 📊 Progress tracking dashboard
- 🥇 Global leaderboard (top 20)
- 🎊 Confetti on level completion
- 📈 XP-based rank (Beginner → Advanced)

</td>
</tr>
<tr>
<td width="50%">

### 📝 Quiz System
- 5 timed MCQs per topic (20s each)
- Instant correct/wrong feedback
- Explanations for every answer
- Score added to total points
- Topics: all 6 DSA concepts

</td>
<td width="50%">

### 🎨 UI/UX
- 🌙 Dark / ☀️ Light mode toggle
- Smooth Framer Motion animations
- Fully responsive (mobile + desktop)
- Colorful game-like interface
- Google Fonts (Fredoka One + Nunito)

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|:---:|:---:|
| ⚛️ Frontend | React 18 + JSX |
| ⚡ Build Tool | Vite 5 |
| 🎬 Animations | Framer Motion |
| 🔥 Backend (optional) | Firebase Auth + Firestore |
| 💾 Offline Storage | localStorage |
| 🚀 Deployment | GitHub Pages + GitHub Actions |
| 🎨 Styling | Pure CSS with CSS Variables |

</div>

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### 1. Clone the repo
```bash
git clone https://github.com/akhila046/DSA-KIDS-GAME.git
cd DSA-KIDS-GAME
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🔥 Firebase Setup (Optional)

The app works fully offline using `localStorage`. To enable cloud sync and global leaderboard:

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password) and **Firestore**
4. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📁 Project Structure

```
DSA-KIDS-GAME/
├── 📄 index.html
├── ⚙️ vite.config.js
├── 📦 package.json
└── src/
    ├── 🚀 main.jsx
    ├── 🗺️ App.jsx
    ├── styles/
    │   └── global.css
    ├── firebase/
    │   └── config.js
    ├── context/
    │   ├── AuthContext.jsx       # Auth + localStorage fallback
    │   └── ThemeContext.jsx      # Dark/Light mode
    ├── components/
    │   ├── Games/
    │   │   ├── ArrayGame.jsx     # 📦 Index explorer
    │   │   ├── StackGame.jsx     # 🍽️ Plate stacking
    │   │   ├── QueueGame.jsx     # 🎟️ Ticket line
    │   │   ├── TreeGame.jsx      # 🌳 BST visualizer
    │   │   ├── LinkedListGame.jsx# 🔗 Node chain
    │   │   └── GraphGame.jsx     # 🕸️ BFS/DFS explorer
    │   ├── Quiz/
    │   │   ├── Quiz.jsx          # Timed quiz engine
    │   │   └── quizData.js       # 30 questions (5 per topic)
    │   └── UI/
    │       └── Navbar.jsx
    └── pages/
        ├── Home.jsx
        ├── Dashboard.jsx
        ├── GameLevel.jsx
        ├── Leaderboard.jsx
        ├── Profile.jsx
        ├── Login.jsx
        └── Signup.jsx
```

---

## 🎯 How to Play

```
1. 🔐 Sign up for a free account (or play as guest)
2. 🗺️ Choose a DSA topic from the Dashboard
3. 🎮 Play the interactive game to earn points
4. 📝 Take the quiz to test your knowledge
5. 🏆 Check the leaderboard to see your rank
6. 🏅 Collect badges as you complete levels
```

---

## 📚 DSA Concepts Covered

| Topic | Game | Key Concept | Operations |
|:---:|:---:|:---:|:---:|
| 📦 Arrays | Index Explorer | Random access O(1) | Insert, Delete, Search |
| 🔗 Linked Lists | Node Chain | Dynamic size | Add Head/Tail, Remove |
| 🍽️ Stacks | Plate Stacking | LIFO | Push, Pop, Peek |
| 🎟️ Queues | Ticket Line | FIFO | Enqueue, Dequeue, Front |
| 🌳 Trees | BST Visualizer | Sorted structure | Insert, Search, Inorder |
| 🕸️ Graphs | Network Explorer | Traversal | BFS, DFS |

---

## 🌐 Deployment

This project auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

```
Push to main → GitHub Actions builds → Deploys to GitHub Pages
```

**Live URL:** https://akhila046.github.io/DSA-KIDS-GAME/

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify and distribute.

---

<div align="center">

Made with ❤️ by [akhila046](https://github.com/akhila046)

⭐ **Star this repo if you found it helpful!** ⭐

<br/>

[![Live Demo](https://img.shields.io/badge/🎮_Play_Now-DSA_Kids_Game-6C63FF?style=for-the-badge)](https://akhila046.github.io/DSA-KIDS-GAME/)

</div>
