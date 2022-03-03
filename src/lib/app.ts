import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBzbLDdqWRL-zvw3UiTvvQufiEjLNNqUUc",
  authDomain: "captaincodeman-experiment.firebaseapp.com",
  databaseURL: "https://captaincodeman-experiment.firebaseio.com",
  projectId: "captaincodeman-experiment",
  storageBucket: "captaincodeman-experiment.appspot.com",
  messagingSenderId: "341877389348",
  appId: "1:341877389348:web:7c926f1f20ca49476b00b1"
};

export const app = initializeApp(firebaseConfig)
