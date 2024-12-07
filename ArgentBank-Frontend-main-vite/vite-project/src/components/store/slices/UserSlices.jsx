//Début code Johan

import { createSlice } from "@reduxjs/toolkit";

//Initialisation de l'état global pour le slice utilisateur
const initialState = {
  //Récupération du token d'authentification depuis le stockage session ou local, ou null si absent
  token:
    sessionStorage.getItem("token") || localStorage.getItem("token") || null,
  //Récupération de l'ID utilisateur depuis le stockage session ou local, ou null si absent
  userId:
    sessionStorage.getItem("userId") || localStorage.getItem("userId") || null,
  //Récupération du nom d'utilisateur depuis le stockage session ou local, ou null si absent
  userName:
    sessionStorage.getItem("userName") ||
    localStorage.getItem("userName") ||
    null,
};

//Création d'un slice Redux pour gérer les données utilisateur
const userSlice = createSlice({
  name: "user", //Nom du slice
  initialState, //État initial défini plus haut
  reducers: {
    //Action pour mettre à jour les informations utilisateur dans l'état global
    setUser: (state, action) => {
      console.log("setUser action payload:", { token: action.payload.token });
      state.token = action.payload.token;
    },
    //Action pour mettre à jour uniquement le profil utilisateur (ID et nom)
    setProfile: (state, action) => {
      console.log("setProfile action payload:", {
        id: action.payload.id,
        userName: action.payload.userName,
      });
      state.userId = action.payload.id;
      state.userName = action.payload.userName;
      // Mettez à jour sessionStorage ou localStorage
      sessionStorage.setItem("userId", action.payload.id);
      sessionStorage.setItem("userName", action.payload.userName);
    },
    //Action pour déconnecter l'utilisateur et réinitialiser les données
    logout: (state) => {
      console.log("Déconnexion du user. Suppression des données.");
      //Réinitialisation des données utilisateur dans l'état global
      state.token = null;
      state.userId = null;
      state.userName = null;
      //Nettoyage des données stockées dans sessionStorage et localStorage
      sessionStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    },
  },
});

//Export des actions générées par le slice
export const { setUser, logout, setProfile } = userSlice.actions;

//Thunk pour gérer la connexion utilisateur via une requête API
export const loginUser = (email, password, rememberMe) => async (dispatch) => {
  console.log("Tentative de connexion avec les données :", { email, password });
  try {
    //Envoi d'une requête POST à l'API pour se connecter
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    //Vérification de la réponse API
    if (!response.ok) {
      console.error("Erreur de connexion API :", response);
      return false; //Arrêt en cas d'erreur
    }

    //Traitement des données de la réponse
    const data = await response.json();
    console.log("Réponse API reçue :", data);
    const { token } = data.body || {};

    //Stockage des données utilisateur (token, ID, etc.) dans le stockage approprié
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);

    //Mise à jour de l'état global avec les données utilisateur
    dispatch(setUser({ token, userId: null, userName: null }));

    // Appeler la méthode pour récupérer le profil utilisateur
    const profileSuccess = await dispatch(fetchUserProfile());

    if (!profileSuccess) {
      console.error("Échec de la récupération du profil utilisateur.");
      return false;
    }

    return true;
  } catch (error) {
    //Gestion des erreurs réseau ou de l'API
    console.error("Erreur lors de la tentative de connexion :", error);
    return false;
  }
};

//Thunk pour récupérer le profil utilisateur via une requête API
export const fetchUserProfile = () => async (dispatch, getState) => {
  console.log("Récupération du profil utilisateur.");
  //Récupération du token depuis l'état global
  const { token } = getState().user;

  //Vérification de la présence du token
  if (!token) {
    console.error("Aucun token disponible pour récupérer le profil.");
    return false;
  }

  try {
    //Envoi d'une requête GET à l'API pour récupérer le profil utilisateur
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //Vérification de la réponse API
    if (!response.ok) {
      console.error("Erreur lors de la récupération du profil :", response);
      return false;
    }

    //Traitement des données de la réponse
    const data = await response.json();
    console.log("Profil utilisateur récupéré :", data);

    //Mise à jour de l'état global avec les informations du profil
    const { id, userName } = data.body || {};

    if (!id || !userName) {
      console.error(
        "Les données du profil utilisateur sont manquantes ou incomplètes."
      );
      return false;
    }

    dispatch(setProfile({ id, userName: userName }));

    return true;
  } catch (error) {
    //Gestion des erreurs réseau ou de l'API
    console.error(
      "Erreur lors de la récupération du profil utilisateur :",
      error
    );
    return false;
  }
};

//Export du reducer généré par le slice
export default userSlice.reducer;

//Fin code Johan
