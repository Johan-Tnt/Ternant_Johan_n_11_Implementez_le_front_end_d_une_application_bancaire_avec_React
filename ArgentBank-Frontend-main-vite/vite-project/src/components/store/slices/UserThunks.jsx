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
      return false;
    }

    const data = await response.json();

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
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

//Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = () => async (dispatch, getState) => {
  const { token } = getState().user;

  if (!token) {
    return false;
  }

  try {
    const response = await fetchUserProfileApi(token);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    const { id, userName } = data.body || {};
    if (!id || !userName) {
      return false;
    }

    dispatch(setProfile({ id, userName }));
    return true;
  } catch {
    return false;
  }
};

//Fin code Johan
