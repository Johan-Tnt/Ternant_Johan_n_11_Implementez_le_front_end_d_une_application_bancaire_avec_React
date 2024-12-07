//Début code Johan

import { useContext } from "react"; // Import de useContext pour accéder au contexte
import { AuthContext } from "./store/AuthContext"; // Import de AuthContext

const User = () => {
  // Accès aux données d'authentification via le contexte
  const { userName } = useContext(AuthContext); // Récupère le nom de l'utilisateur

  return (
    <main className="main bg-dark">
      <div className="header">
        {/* Affiche le nom de l'utilisateur si disponible */}
        <h1 className="title_user">
          Welcome back
          <br />
          {userName ? userName : "User"}
          {/* Affiche un texte par défaut si userName est undefined */}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;

//Fin code Johan
