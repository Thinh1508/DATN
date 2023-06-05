import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAeHN3eok2zhxyDa7_i_5gy0OHQr9P4fFA",
  authDomain: "atvstp-9795e.firebaseapp.com",
  projectId: "atvstp-9795e",
  storageBucket: "atvstp-9795e.appspot.com",
  messagingSenderId: "76205425111",
  appId: "1:76205425111:web:06f33171d2906ee1ee4b92",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const storage = getStorage()
