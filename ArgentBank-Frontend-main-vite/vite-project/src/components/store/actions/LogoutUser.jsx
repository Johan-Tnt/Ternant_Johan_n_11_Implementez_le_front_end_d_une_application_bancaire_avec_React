//Début code Johan

//Action de déconnexion utilisateur
import { logout } from "../slices/UserSlices";

export const logoutHandler = (dispatch) => {
  console.log("Déconnexion déclenchée.");
  sessionStorage.clear(); //Supprime toutes les données stockées en session
  dispatch(logout()); //Envoie une action pour réinitialiser l'état utilisateur
};

//Fin code Johan
