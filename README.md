# 🥗 FoodCal AI — Food Recognition & Nutrition Estimation System

FoodCal AI is an advanced full-stack AI-powered web application that identifies food from images and provides detailed nutritional analysis. It leverages the **Gemini 1.5 Flash Vision API** for accurate image understanding and generates nutrition data such as calories, protein, carbs, fats, fiber, and sugar.

> Built for real-world food tracking, fitness enthusiasts, and diet planning.

---

## 🌟 Features

- 🔍 Upload any food image and get the **dish name + detailed nutrition breakdown**
- 🧠 AI-powered image analysis using **Gemini Vision model**
- 🍽 Smart **text-based food description** support
- 🧮 Macronutrient insights (calories, protein, carbs, fats, fiber, sugar)
- ⚡ Clean, interactive **React frontend with TailwindCSS**
- 🔗 Deployed backend using **FastAPI** with Gemini AI API
- 📝 Smart serving suggestions (bulking, cutting, maintenance)

---

## 🧱 Tech Stack

| Frontend                 | Backend             | AI/ML Services           |
|--------------------------|---------------------|--------------------------|
| React + TypeScript       | FastAPI (Python)    | Gemini 1.5 Flash Vision  |
| Tailwind CSS             | PIL, Base64, CORS   | Google Generative AI     |
| Vite                     | Uvicorn Server      |                          |

---

## 🚀 Getting Started (Run Locally)
1️⃣ Clone the Repository
git clone https://github.com/lavishsingh12/PRODIGY_ML_05.git
cd PRODIGY_ML_05
2️⃣ Run the Backend (FastAPI)

Install Python dependencies
pip install -r requirements.txt

Start FastAPI server
uvicorn app:app --reload

📌 Note: Replace the api_key in app.py with your Gemini API key

3️⃣ Run the Frontend (React)

cd foodcal-ai-visualizer
npm install
npm run dev

🔗 Access the App
Frontend: http://localhost:8080
Backend : http://localhost:8000

## 🌐 Live Demo
Coming Soon...
Will be deployed on Render or Vercel

## 👤 Author
Lavish Singh Rajawat
https://www.linkedin.com/in/lavishsingh12

## 📜 License
This project is licensed under the MIT License — feel free to use and contribute.
