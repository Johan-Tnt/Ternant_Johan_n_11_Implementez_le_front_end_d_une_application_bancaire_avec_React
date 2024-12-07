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
      console.log("Email pré-rempli depuis localStorage :", savedEmail);
    }
  }, []); //S'exécute une seule fois au montage du composant

  //Redirection automatique vers la page utilisateur si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isLoggedIn) {
      console.log("Utilisateur déjà connecté, redirection en cours...");
      navigate("/user");
    }
  }, [isLoggedIn, navigate]); // S'exécute à chaque changement de `isLoggedIn`

  //Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("État de Remember Me à la soumission :", rememberMe);

    try {
      //Appel de la fonction `login` fournie par le contexte
      const success = await login(email, password, rememberMe);
      if (success) {
        console.log("Connexion réussie.");
        //Sauvegarde ou suppression de l'email dans localStorage selon la case "Remember Me"
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        //Redirection vers la page utilisateur
        navigate("/user");
      } else {
        console.log("Échec de la connexion.");
        setError("Identifiants incorrects ou problème de connexion.");
      }
    } catch (err) {
      console.error("Erreur lors de la soumission :", err);
      setError("Impossible de se connecter. Veuillez réessayer plus tard.");
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
                console.log("Remember Me cochée :", e.target.checked);
                setRememberMe(e.target.checked);
                if (!e.target.checked)
                  localStorage.removeItem("rememberedEmail");
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
