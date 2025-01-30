import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// import reportWebVitals from './reportWebVitals';

import HIKES_DATA from './data/hikes.json'

const firebaseConfig = {
  apiKey: "AIzaSyCQZupadA0Ca1v6CVH7WVEjebdLiu0BM9Q",
  authDomain: "project-josephy02.firebaseapp.com",
  databaseURL: "https://project-josephy02-default-rtdb.firebaseio.com",
  projectId: "project-josephy02",
  storageBucket: "project-josephy02.appspot.com",
  messagingSenderId: "988395427961",
  appId: "1:988395427961:web:3d1a2654346d1d4f369ca8",
  measurementId: "G-638LP60DYZ"
};


initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App hikes={HIKES_DATA} />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
