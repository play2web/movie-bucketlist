import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import firebase from 'firebase';
import { firebaseConfig } from './databases';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);