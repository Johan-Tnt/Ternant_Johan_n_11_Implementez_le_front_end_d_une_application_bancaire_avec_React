//Début code Johan

//Importation des hooks React
import { useContext, useState } from "react";
//Importation du contexte d'authentification
import { AuthContext } from "./store/AuthContext";
//Importation du composant ModalEditUserName
import ModalEditUserName from "./store/ModalEditUserName";

const User = () => {
  const { userName, updateUserProfile } = useContext(AuthContext); //Récupère le contexte
  const [isModalOpen, setIsModalOpen] = useState(false); //État pour gérer la modale

  //Fonction pour ouvrir la modale
  const openModal = () => setIsModalOpen(true);
  //Fonction pour fermer la modale
  const closeModal = () => setIsModalOpen(false);

  //Fonction pour sauvegarder le nouveau nom
  const saveUserName = async (newUserName) => {
    await updateUserProfile(newUserName); //Appelle l'API via le contexte
    setIsModalOpen(false); //Ferme la modale après succès
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1 className="title_user">
          Welcome back
          <br />
          {userName ? userName : "User"}
        </h1>
        <button className="edit-button" onClick={openModal}>
          Edit Name
        </button>
      </div>

      {/*Modale*/}
      <ModalEditUserName
        userName={userName}
        isOpen={isModalOpen}
        onSave={saveUserName}
        onCancel={closeModal}
      />

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
