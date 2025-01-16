// Ваши данные конфигурации Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC-qUDRrh9Y-nrsKqZVe_I1qMpidgUp9Bg",
    authDomain: "crm-odobren.firebaseapp.com",
    projectId: "crm-odobren",
    storageBucket: "crm-odobren.firebasestorage.app",
    messagingSenderId: "596817282176",
    appId: "1:596817282176:web:9dda09082b32eeeaca5265"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Инициализация Firestore
const db = firebase.firestore();
