//Début code Johan

//Redux Toolkit Store

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlices";

const store = configureStore({
  reducer: {
    user: userReducer, // Ajouter le reducer de l'utilisateur
  },
});

export default store;

//Fin code Johan
