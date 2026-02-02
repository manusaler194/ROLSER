import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";

// 1. Creamos la raíz una sola vez
const root = ReactDOM.createRoot(document.getElementById("root"));

// 2. Renderizamos una sola vez envolviendo con Router
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
