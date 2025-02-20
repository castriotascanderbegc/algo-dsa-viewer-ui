# 📂 DSA Problem Viewer - Frontend

This repository contains the **frontend** for the **Data Structures and Algorithms Problem Viewer**, built using **React** and **Vite**. It provides an interactive UI to browse, search, and view my personal solutions to **Data Structures and Algorithms (DSA)** problems fetched from my personal **GitHub repository** `algorithms-and-data-structures`.

---

## 🚀 **Objective**

The **DSA Problem Viewer** allows users to:

- **Search** for specific DSA problem solutions.
- **Filter** problems by data structures (e.g., Arrays, Graphs, Trees).
- **View** code with syntax highlighting.
- **Interact** seamlessly with the backend for dynamic data fetching.

---

## ⚙️ **Tech Stack**

- **React** — Frontend UI library.
- **Vite** — Fast build tool and dev server.
- **Axios** — For making API calls to the backend.
- **TailwindCSS** — Utility-first CSS framework for styling.
- **react-syntax-highlighter** — Code syntax highlighting.

---

## 🗂️ **Project Structure**

```
algo-dsa-viewer-ui/
├── node_modules/
├── public/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── SearchBar.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── FileList.jsx
│   │   └── CodeViewer.jsx
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # TailwindCSS imports
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔄 **Frontend-Backend API Flow**

1. **User Interaction:**
   - The user searches, filters, or selects a DSA problem from the UI.

2. **API Requests:**
   - The frontend makes API calls to the **backend** at `http://localhost:8000`.

3. **Backend Processing:**
   - The backend fetches data from the **GitHub API** and returns results.

4. **UI Rendering:**
   - The frontend renders file lists and code content with syntax highlighting.

---

## 🧪 **Running the Frontend Locally**

### 1️⃣ **Clone the Repo:**

```bash
git clone https://github.com/yourusername/algo-dsa-viewer-ui.git
cd algo-dsa-viewer-ui
```

### 2️⃣ **Install Dependencies:**

```bash
npm install
```

### 3️⃣ **Run the App:**

```bash
npm run dev
```

The app should be running at:

```bash
http://localhost:5173
```

Make sure the backend is running at `http://localhost:8000`.

---

## 🖥️ **Key Features**

- 🔍 Search for specific DSA problems.
- 🏷️ Filter problems by data structures.
- 📄 View code with syntax highlighting.
- ⚡ Real-time interaction with the backend.

---

## 🛠️ **Tech Highlights**

- 💨 Vite for ultra-fast builds.
- 🎨 TailwindCSS for clean and responsive UI.
- 📡 Axios for seamless API integration.
- 🧑‍💻 Syntax Highlighting for code viewing.

---

## 📂 **Related Repositories**

- 🔗 Backend Repo: [DSA Backend](https://github.com/yourusername/dsa-backend)

---

## 💡 **Future Improvements**

- Implement light/dark themes.
- Add user authentication and favorites.
- Enhance UI/UX with animations.






