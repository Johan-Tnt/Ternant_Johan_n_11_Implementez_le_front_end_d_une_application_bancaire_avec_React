//Début code Johan

//Importation des modules
import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
//Importation des actions Redux séparées
import { login } from "./actions/LoginUser";
import { logoutHandler } from "./actions/LogoutUser";
import { updateUserProfile } from "./actions/UpdateUserProfile";
import { restoreAuth } from "./actions/RestoreAuth";

//Création du contexte d'authentification
const AuthContext = createContext();

//Composant fournisseur du contexte d'authentification
const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch(); //Permet d'envoyer des actions au store Redux
  const { token, userId, userName } = useSelector((state) => state.user); //Récupération des données utilisateur depuis le store
  const isLoggedIn = !!token; //Détermine si l'utilisateur est connecté (si le token est présent)

  //Restaurer l'authentification au démarrage
  useEffect(() => {
    restoreAuth(dispatch);
  }, [dispatch]);

  //Valeur transmise via le contexte
  const contextValue = {
    token, //Token d'authentification
    userId, //Identifiant de l'utilisateur
    userName, //Nom de l'utilisateur
    isLoggedIn, //État de connexion
    login: (email, password, rememberMe) =>
      login(dispatch, email, password, rememberMe), //Fonction de connexion
    logout: () => logoutHandler(dispatch), //Fonction de déconnexion
    updateUserProfile: (newUserName) =>
      updateUserProfile(dispatch, newUserName, token), //Nouvelle méthode API
  };

  //Retourne le fournisseur de contexte enveloppant ses enfants
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//Validation des propriétés du composant fournisseur
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired, //Le composant enfant est obligatoire
};

//Exportation du contexte et du fournisseur
export { AuthContext, AuthContextProvider };

//Fin code Johan
