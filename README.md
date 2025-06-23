<!-- prettier-ignore-start -->
<div align="center">

# 🤖 Jarvis AI — Your Personal Coding Assistant  
Live → **<https://jarvis-ai-chat-bot.vercel.app>**

![Next .js](https://img.shields.io/badge/Next.js-15.x-000?style=for-the-badge&logo=nextdotjs)
![OpenRouter API](https://img.shields.io/badge/OpenRouter-DeepSeek_R1-purple?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)

</div>

---

## ✨ Why Jarvis ?

> “Don’t fear AI — **use** AI.”  
> Build, debug & learn **in minutes**, not hours.

Jarvis AI is a beautifully-animated coding companion powered by **DeepSeek R1** (via OpenRouter) & built with **Next.js 15 / React 19**.  
Ask anything: from algorithm explanations 🧩 to full-stack snippets 🏗️, Jarvis replies with syntax-highlighted code & pro tips.

---

## 🔥 Live Demo

| Desktop | Mobile |
|---------|--------|
| ![Desktop screenshot](docs/screenshot-desktop.png) | ![Mobile screenshot](docs/screenshot-mobile.png) |

> **Try it now:** <https://jarvis-ai-chat-bot.vercel.app>

---

## 🚀 Tech Stack

| Layer            | Stack / Library                              |
|------------------|----------------------------------------------|
| Front-end UI     | **Next.js 15**, React 19, Tailwind CSS 3.x   |
| AI backend       | `ai@4` SDK + `@ai-sdk/openai` (OpenRouter)   |
| Model            | `deepseek/deepseek-r1-0528:free` (32k ctx)   |
| Hosting / Edge   | **Vercel** (ISR, edge runtime)               |
| Icons / Charts   | Lucide-React, Recharts                       |

---

## ✨ Key Features

- 💬 **Real-time streaming** answers (no page reloads).  
- 🐛 *Bug-Buster* prompt examples – click & send instantly.  
- 🎨 Fully-responsive glassmorphism UI with smooth scrolling.  
- 🗄️ Clipboard copy, clear chat, connection-status badge.  
- 🔐 Secure: API key kept server-side (never exposed).

---

## ⚙️ Local Setup

```bash
# 1. Clone
git clone https://github.com/Balmukund-01/Jarvis-AI-ChatBot.git
cd Jarvis-AI-ChatBot
```
# 2. Install deps
```
npm install   # or pnpm install
```
# 3. Env variables
```
cp .env.local.example .env.local
```
# then add your key ↓
```
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxx
```
# 4. Run dev server
```
npm run dev
# visit http://localhost:3000
```
✈️ Deploy on Vercel
Import the repo → Vercel.
```
Add env variable OPENROUTER_API_KEY.
```
Click Deploy – done in ~60 s.

🤝 Contributing
PRs are welcome!
Found a bug / have an idea? → open an issue or ping me on LinkedIn.

📜 License
MIT © 2025 Mukund Shukla

<!-- prettier-ignore-end -->
