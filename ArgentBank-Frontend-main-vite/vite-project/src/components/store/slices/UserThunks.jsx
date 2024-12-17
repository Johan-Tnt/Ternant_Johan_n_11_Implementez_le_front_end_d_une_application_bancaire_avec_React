//Début code Johan

//Importation des actions et des fonctions API
import { setUser, setProfile } from "./UserSlices";
import { loginUserApi } from "../API Call/UserLoginProfile";
import { fetchUserProfileApi } from "../API Call/UserRecoveryProfile";

//Thunk pour gérer la connexion utilisateur
export const loginUser = (email, password, rememberMe) => async (dispatch) => {
  try {
    const response = await loginUserApi(email, password);

    if (!response.ok) {
      console.error("Erreur de connexion API :", response);
      return false;
    }

    const data = await response.json();
    console.log("Réponse API reçue :", data);

    const { token, userName } = data.body || {};
    const storage = rememberMe ? localStorage : sessionStorage;
    //Le code ci-dessous permet de sauvegarder le token lorsque l'utilisateur coche la case rememberMe
    storage.setItem("token", token);
    //Le code ci-dessous permet de sauvegarder le userName lorsque l'utilisateur coche la case rememberMe
    storage.setItem("userName", userName);

    //Le code ci-dessous permet de sauvegarder le token lorsque l'utilisateur coche la case rememberMe
    dispatch(setUser({ token }));
    //Le code ci-dessous permet de sauvegarder le userName lorsque l'utilisateur coche la case rememberMe
    dispatch(setProfile({ userId: null, userName }));

    const profileSuccess = await dispatch(fetchUserProfile());
    if (!profileSuccess) {
      console.error("Échec de la récupération du profil utilisateur.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion :", error);
    return false;
  }
};

//Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = () => async (dispatch, getState) => {
  const { token } = getState().user;

  if (!token) {
    console.error("Aucun token disponible pour récupérer le profil.");
    return false;
  }

  try {
    const response = await fetchUserProfileApi(token);

    if (!response.ok) {
      console.error("Erreur lors de la récupération du profil :", response);
      return false;
    }

    const data = await response.json();
    console.log("Profil utilisateur récupéré :", data);

    const { id, userName } = data.body || {};
    if (!id || !userName) {
      console.error(
        "Les données du profil utilisateur sont manquantes ou incomplètes."
      );
      return false;
    }

    dispatch(setProfile({ id, userName }));
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur :",
      error
    );
    return false;
  }
};

//Fin code Johan
