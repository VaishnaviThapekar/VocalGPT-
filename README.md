# VocalGPT : Talk with AI

A voice-enabled AI chatbot built with **React.js**, **Cohere AI**, and the **Web Speech API**. It supports both voice and text input/output with a sleek Bootstrap interface and real-time AI responses.

## 🚀 Features

- 🎤 **Voice Input** using Web Speech API
   
- 🔊 **Voice Output** via SpeechSynthesis  

- 🧠 **AI Responses** powered by Cohere (`command-r-plus` model)  

- 💬 Smart text + voice chat interface  

- 🎨 Modern, colorful UI with Bootstrap  

- 🧹 History clears on page refresh

## 🛠️ Tech Stack

- **React.js**
- **Cohere API**
- **Bootstrap 5**
- **Axios**
- **Web Speech API

## 📦 Installation

### 1. Clone the repository

git clone https://github.com/VaishnaviThapekar/VocalGPT-

### 2. Install dependencies

npm install

### 3. Add your Cohere API key

Open src/Chatbot.js and replace:

const cohereApiKey = "YOUR_COHERE_API_KEY";
with your real key from cohere.com.

### 4. Run the app

npm start
The app will run at http://localhost:3000

🧠 Example API Call (Cohere)

const response = await axios.post(
  "https://api.cohere.ai/v1/chat",
  {
    message: userMessage,
    model: "command-r-plus"
  },
  {
    headers: {
      Authorization: `Bearer ${cohereApiKey}`,
      "Content-Type": "application/json"
    }
  }
);

🙋‍♀️ Author

Made with ❤️ by Vaishnavi
📬 Connect, contribute, and improve together!
