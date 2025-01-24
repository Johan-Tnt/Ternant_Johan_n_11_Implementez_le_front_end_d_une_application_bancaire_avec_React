//Début code Johan

//Action de connexion utilisateur
import { loginUser } from "../slices/UserThunks";

export const login = async (dispatch, email, password, rememberMe) => {
  const result = await dispatch(loginUser(email, password, rememberMe)); //Appelle l'action loginUser

  if (result && result.userName) {
    //Si la connexion est réussie, retourne un userName
    sessionStorage.setItem("userName", result.userName); //Sauvegarde dans sessionStorage
  }

  return result; //Retourne le résultat de la connexion
};

//Fin code Johan
