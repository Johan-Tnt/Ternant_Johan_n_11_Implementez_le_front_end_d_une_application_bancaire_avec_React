//Début code Johan

//Contient les "icon" fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
//Contient le "header" (react router)
import { NavLink } from "react-router-dom";

/**WARNING**/
//Le NavLink : "Sign out" doit apparaître dans le composant "user "par la suite et non sur la page "home"

const Header = () => {
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
          <NavLink to="/SignIn" className="main-nav-item">
            <FontAwesomeIcon
              icon={faCircleUser}
              size="lg"
              className="fa fa-user-circle"
            />
            Sign In
          </NavLink>
          <NavLink to="/User" className="main-nav-item">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="lg"
              className="fa fa-sign-out"
            />
            Sign Out
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

//Fin code Johan
