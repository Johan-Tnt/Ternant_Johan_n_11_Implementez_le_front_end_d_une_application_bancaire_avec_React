//Début code Johan

//Action de connexion utilisateur
import { loginUser } from "../slices/UserThunks";

export const login = async (dispatch, email, password, rememberMe) => {
  console.log("Tentative de connexion avec email :", email);
  const result = await dispatch(loginUser(email, password, rememberMe)); //Appelle l'action loginUser
  console.log("Résultat de la connexion :", result);

  if (result && result.userName) {
    //Si la connexion réussit et retourne un userName
    sessionStorage.setItem("userName", result.userName); //Sauvegarde dans sessionStorage
    console.log("Nom d'utilisateur après connexion :", result.userName);
  }

  return result; //Retourne le résultat de la connexion
};

//Fin code Johan
