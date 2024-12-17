//Début code Johan

//Action pour restaurer l'authentification au démarrage
import { setUser, setProfile } from "../slices/UserSlices";

export const restoreAuth = (dispatch) => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const userName =
    sessionStorage.getItem("userName") || localStorage.getItem("userName");

  if (token && userName) {
    //Si le token et userName sont présents
    console.log("Restauration des données utilisateur :", {
      token,
      userId,
      userName,
    });
    dispatch(setUser({ token })); //Met à jour le token dans Redux
    dispatch(setProfile({ userId, userName })); //Met à jour le profil utilisateur dans Redux
  } else {
    //Si aucun token n'est trouvé
    console.log("Aucun token trouvé dans sessionStorage.");
  }
};

//Fin code Johan
