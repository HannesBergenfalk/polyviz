import { initializeApp, getApps } from "firebase/app"

// https://firebase.google.com/docs/emulator-suite/connect_firestore#android_apple_platforms_and_web_sdks
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCfQM6dki-sD46EXYzWNh3eXc22A1lBfic",
  authDomain: "polyviz-fb.firebaseapp.com",
  projectId: "polyviz-fb",
  storageBucket: "polyviz-fb.appspot.com",
  messagingSenderId: "327169062587",
  appId: "1:327169062587:web:2e9076c4e6dfd6b6079b9e",
}

function initializeServices() {
  const isConfigured = getApps().length > 0
  const firebaseApp = initializeApp(firebaseConfig)
  const firestore = getFirestore(firebaseApp)
  return { firebaseApp, firestore, isConfigured }
}

function connectToEmulators({ firestore }) {
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080)
  }
}

export function getFirebase() {
  const services = initializeServices()
  if (!services.isConfigured) {
    connectToEmulators(services)
  }
  return services
}
