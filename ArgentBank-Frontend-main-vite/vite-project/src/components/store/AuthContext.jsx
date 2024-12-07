//Début code Johan

//Importation des modules
//Gestion du contexte et des effets React
import { createContext, useEffect } from "react";
//Validation des propriétés du composant
import PropTypes from "prop-types";
//Gestion des états avec Redux
import { useDispatch, useSelector } from "react-redux";
//Actions Redux
import { loginUser, logout, setProfile, setUser } from "./slices/UserSlices";

//Création du contexte d'authentification
const AuthContext = createContext();

//Composant fournisseur du contexte d'authentification
const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch(); //Permet d'envoyer des actions au store Redux
  const { token, userId, userName } = useSelector((state) => state.user); //Récupération des données utilisateur depuis le store, sans admin
  const isLoggedIn = !!token; //Détermine si l'utilisateur est connecté (si le token est présent)

  //Vérifie et restaure le token au démarrage de l'application
  useEffect(() => {
    const token = sessionStorage.getItem("token"); //Récupère le token depuis sessionStorage
    const userId = sessionStorage.getItem("userId"); //Récupère l'ID utilisateur
    const userName =
      sessionStorage.getItem("userName") || localStorage.getItem("userName"); //Récupère le nom de l'utilisateur

    if (token && userName) {
      console.log("Token récupéré depuis sessionStorage :", token);
      console.log("Utilisateur ID :", userId);
      console.log("Nom de l'utilisateur :", userName);
      //Met à jour l'état global avec les données récupérées
      dispatch(setUser({ token })); // Appelle setUser pour mettre à jour le token
      dispatch(setProfile({ userId, userName })); // Appelle setProfile pour mettre à jour l'id et le userName
    } else {
      console.log("Aucun token trouvé dans sessionStorage.");
    }
  }, [dispatch]); //S'exécute au montage du composant ou si `dispatch` change

  //Fonction pour gérer la connexion
  const login = async (email, password, rememberMe) => {
    console.log("Tentative de connexion avec email :", email);
    //Envoie une action pour connecter l'utilisateur
    const result = await dispatch(loginUser(email, password, rememberMe));
    console.log("Résultat de la connexion :", result);

    if (result && result.userName) {
      // Sauvegarde du userName dans sessionStorage
      sessionStorage.setItem("userName", result.userName);
      console.log("Nom d'utilisateur après connexion :", result.userName);
    }

    return result; //Retourne le résultat de la connexion
  };

  //Fonction pour gérer la déconnexion
  const logoutHandler = () => {
    console.log("Déconnexion déclenchée.");
    sessionStorage.clear(); //Supprime toutes les données stockées en session
    dispatch(logout()); //Envoie une action pour réinitialiser l'état utilisateur
  };

  //Valeur transmise via le contexte
  const contextValue = {
    token, //Token d'authentification
    userId, //Identifiant de l'utilisateur
    userName, //Nom de l'utilisateur ajouté
    isLoggedIn, //État de connexion
    login, //Fonction de connexion
    logout: logoutHandler, //Fonction de déconnexion
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
