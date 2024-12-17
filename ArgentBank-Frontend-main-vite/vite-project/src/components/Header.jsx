//Début code Johan

//Importation des modules nécessaires
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
//Utilisation du contexte pour vérifier si l'utilisateur est connecté et récupérer ses informations
import { useContext } from "react";
import { AuthContext } from "./store/AuthContext";

const Header = () => {
  //Récupération des données de connexion depuis le contexte AuthContext
  const { isLoggedIn, logout, userName } = useContext(AuthContext);

  console.log("État utilisateur :", { isLoggedIn, userName });

  return (
    <div className="header">
      <nav className="main-nav">
        <a className="main-nav-logo" href="./">
          <img
            className="main-nav-logo-image"
            src="./src/assets/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <ul>
          {/* Affiche "Sign In" si l'utilisateur n'est pas connecté */}
          {!isLoggedIn && (
            <NavLink to="/SignIn" className="main-nav-item">
              <FontAwesomeIcon
                icon={faCircleUser}
                size="lg"
                className="fa fa-user-circle"
              />
              Sign In
            </NavLink>
          )}

          {/* Affiche le nom de l'utilisateur et le bouton "Sign Out" si connecté */}
          {isLoggedIn && (
            <>
              {/* Affichage du nom d'utilisateur */}
              <NavLink to="/SignIn" className="main-nav-item main_item_span">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="lg"
                  className="fa fa-user-circle font_icon_profile"
                />
                {userName}
              </NavLink>

              {/* Bouton pour se déconnecter */}
              <NavLink
                to="/" // Redirection vers la page d'accueil après déconnexion
                className="main-nav-item"
                onClick={() => {
                  console.log("Bouton 'Sign Out' cliqué.");
                  logout(); // Appelle la fonction de déconnexion
                }}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size="lg"
                  className="fa fa-sign-out font_icon_profile"
                />
                Sign Out
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;

//Fin code Johan
