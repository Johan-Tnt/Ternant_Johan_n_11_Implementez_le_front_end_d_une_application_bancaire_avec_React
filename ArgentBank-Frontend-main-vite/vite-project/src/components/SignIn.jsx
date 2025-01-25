//Début code Johan

//Importation des icônes FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
//Importation des "Hook" : "useEffect", etc
import { useState, useContext, useEffect } from "react";
//Contexte d'authentification
import { AuthContext } from "./store/AuthContext";
//Navigation pour redirection
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //Accès aux fonctions et états liés à l'authentification via le contexte
  const { login, isLoggedIn } = useContext(AuthContext); // Récupération du userName depuis le contexte
  const navigate = useNavigate(); // Permet de rediriger l'utilisateur après connexion

  //États locaux pour gérer les champs du formulaire et les erreurs
  const [email, setEmail] = useState(""); // Stocke l'email de l'utilisateur
  const [password, setPassword] = useState(""); // Stocke le mot de passe de l'utilisateur
  const [rememberMe, setRememberMe] = useState(false); // État pour la case "Remember Me"
  const [error, setError] = useState(""); // Message d'erreur en cas de problème

  //Pré-remplissage du champ email si une adresse a été sauvegardée dans localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []); //S'exécute une seule fois au montage du composant

  //Redirection automatique vers la page utilisateur si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]); //S'exécute à chaque changement de `isLoggedIn`

  //Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        handleRememberMe(email, rememberMe);
        navigate("/user");
      } else {
        setError("Identifiants incorrects ou problème de connexion.");
      }
    } catch {
      setError("Impossible de se connecter. Veuillez réessayer plus tard.");
    }
  };

  //Gestion du stockage de l'email avec Remember Me
  const handleRememberMe = (email, remember, userName) => {
    if (remember) {
      //Le code ci-dessous permet de sauvegarder l'e-mail lorsque l'utilisateur coche la case rememberMe
      localStorage.setItem("rememberedEmail", email);
      //Le code ci-dessous permet de sauvegarder le userName lorsque l'utilisateur coche la case rememberMe
      localStorage.setItem("rememberedUserName", userName);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedUserName");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon
          icon={faCircleUser}
          size="lg"
          className="fa fa-user-circle sign-in-icon"
        />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your e-mail"
              aria-label="Your e-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              aria-label="Your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
                if (!e.target.checked)
                  //Le code ci-dessous permet de sauvegarder l'e-mail lorsque l'utilisateur coche la case rememberMe
                  localStorage.removeItem("rememberedEmail");
                //Le code ci-dessous permet de sauvegarder le userName lorsque l'utilisateur coche la case rememberMe
                localStorage.removeItem("rememberedUserName");
              }}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message error_style">{error}</p>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;

//Fin code Johan
