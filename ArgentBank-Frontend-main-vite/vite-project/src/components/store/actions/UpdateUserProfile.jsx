//Début code Johan

//Action de mise à jour du profil utilisateur
import { setProfile } from "../slices/UserSlices";
import { updateUserProfileAPI } from "../API Call/UserProfile";

export const updateUserProfile = async (dispatch, newUserName, token) => {
  try {
    //Appel de la fonction API pour mettre à jour le profil utilisateur
    const data = await updateUserProfileAPI(newUserName, token);
    dispatch(setProfile({ userName: newUserName })); //Mise à jour du state Redux
    return data; //Retourne les données mises à jour
  } catch (error) {
    //Gestion des erreurs lors de l'appel API
    console.error("Failed to update profile.:", error.message);
    throw error;
  }
};

//Fin code Johan
