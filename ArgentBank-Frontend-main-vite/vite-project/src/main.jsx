//Début code Johan

//Contient les fichiers d'importation pour faire fonctionner le "React", "React-DOM", etc
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./main.scss";

//Contient le fichier d'importation pour faire la liaison entre les documents "main.scss" et "main.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Fin code Johan
