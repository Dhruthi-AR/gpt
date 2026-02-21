# Kimi GPT Clone 🚀

A premium, full-stack GPT-style chat application powered by the **Kimi-K2.5** model via Hugging Face Spaces.

![Kimi GPT Preview](https://img.shields.io/badge/Model-Kimi--K2.5-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js)

## ✨ Features
- **Premium UI**: Modern dark-themed interface with glassmorphism and smooth animations using Framer Motion.
- **Kimi Integration**: Securely linked to a private Hugging Face Space running `moonshotai/Kimi-K2.5`.
- **Responsive Design**: Works seamlessly on mobile and desktop.
- **Secure Proxy**: Node.js backend to protect Hugging Face API keys.

---

## 🛠️ Architecture
1. **Frontend**: Built with React, Vite, Tailwind-inspired CSS, and Lucide icons.
2. **Backend**: Express.js server using `@gradio/client` to talk to the HF Space.
3. **AI Engine**: Hugging Face Space hosting the Kimi model.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A Hugging Face account and Access Token.

### 2. Installation
Clone the repository and install dependencies:
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install-all
```

### 3. Environment Setup
Create a `.env` file in the `server/` directory:
```env
HF_ACCESS_TOKEN=your_huggingface_token
PORT=5000
```

### 4. Running Locally
Run the following command in the root folder to start both frontend and backend:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to start chatting!

---

## 📂 Project Structure
```text
├── client/          # Vite + React Frontend
├── server/          # Node.js + Express Backend
├── package.json     # Root management
└── .gitignore       # Protected files
```

---

## 🤝 Credits
- **Model**: [Moonshot AI (Kimi)](https://huggingface.co/moonshotai)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---
Created by [Dhruthi-AR](https://github.com/Dhruthi-AR)
