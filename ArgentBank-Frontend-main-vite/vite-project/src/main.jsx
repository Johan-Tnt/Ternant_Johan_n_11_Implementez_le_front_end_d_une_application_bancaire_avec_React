//Début code Johan

//Contient les fichiers d'importation pour faire fonctionner le "React", "React-DOM", etc
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./main.scss";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./components/store/AuthContext.jsx";
import store from "./components/store/StoreIndex.jsx";

//Contient le fichier d'importation pour faire la liaison entre les documents "main.scss" et "main.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

//Fin code Johan
