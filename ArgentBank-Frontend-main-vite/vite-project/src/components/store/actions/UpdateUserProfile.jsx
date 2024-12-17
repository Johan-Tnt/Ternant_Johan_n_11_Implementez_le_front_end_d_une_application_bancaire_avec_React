//Début code Johan

//Action de mise à jour du profil utilisateur
import { setProfile } from "../slices/UserSlices";
import { updateUserProfileAPI } from "../API Call/UserProfile";

export const updateUserProfile = async (dispatch, newUserName, token) => {
  try {
    //Appel de la fonction API pour mettre à jour le profil utilisateur
    const data = await updateUserProfileAPI(newUserName, token);
    console.log("Données reçues après mise à jour :", data);
    dispatch(setProfile({ userName: newUserName })); //Mise à jour du state Redux
    return data; //Retourne les données mises à jour
  } catch (error) {
    //Gestion des erreurs lors de l'appel API
    console.error("Erreur lors de la mise à jour du profil:", error.message);
    throw error; //Relance l'erreur pour gestion éventuelle dans l'UI
  }
};

//Fin code Johan
