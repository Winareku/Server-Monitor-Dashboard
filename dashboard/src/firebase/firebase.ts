import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAeyv0RK92ewU5CsHLZRUfrUcdbBUV0Rs",
  authDomain: "server-monitor-dashboard-cba09.firebaseapp.com",
  databaseURL: "https://server-monitor-dashboard-cba09-default-rtdb.firebaseio.com",
  projectId: "server-monitor-dashboard-cba09",
  storageBucket: "server-monitor-dashboard-cba09.firebasestorage.app",
  messagingSenderId: "558530653841",
  appId: "1:558530653841:web:bbb4e994bb8a6abc729930",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
