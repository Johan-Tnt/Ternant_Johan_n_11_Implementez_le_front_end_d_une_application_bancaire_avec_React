//Début code Johan

//Importation de Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

//Initialisation de l'état global
const initialState = {
  token:
    sessionStorage.getItem("token") || localStorage.getItem("token") || null,
  userId:
    sessionStorage.getItem("userId") || localStorage.getItem("userId") || null,
  userName:
    sessionStorage.getItem("userName") ||
    localStorage.getItem("userName") ||
    null,
};

//Création du slice utilisateur
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser action payload:", { token: action.payload.token });
      state.token = action.payload.token;
    },
    setProfile: (state, action) => {
      console.log("setProfile action payload:", {
        id: action.payload.id,
        userName: action.payload.userName,
      });
      state.userId = action.payload.id;
      state.userName = action.payload.userName;
      sessionStorage.setItem("userId", action.payload.id);
      sessionStorage.setItem("userName", action.payload.userName);
      //Le code ci-dessous permet de sauvegarder le userName lorsque l'utilisateur coche la case rememberMe
      localStorage.setItem("userName", action.payload.userName);
    },
    logout: (state) => {
      console.log("Déconnexion du user. Suppression des données.");
      state.token = null;
      state.userId = null;
      state.userName = null;
      sessionStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    },
  },
});

//Export des actions
export const { setUser, setProfile, logout } = userSlice.actions;

//Export du reducer
export default userSlice.reducer;

//Fin code Johan
