
Usar o npm

Usar a tag <script>
Se você já estiver usando o npm e um bundler de módulos, como webpack ou Rollup, execute o seguinte comando para instalar o SDK mais recente (Saiba mais):

npm install firebase
Depois inicialize o Firebase e comece a usar os SDKs dos produtos.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASooNqoqQG2lThuRvV-AL1ekcq3ctaRiw",
  authDomain: "barbechatbot.firebaseapp.com",
  projectId: "barbechatbot",
  storageBucket: "barbechatbot.firebasestorage.app",
  messagingSenderId: "51035787161",
  appId: "1:51035787161:web:b9bdb77ac521c6df3c8d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);