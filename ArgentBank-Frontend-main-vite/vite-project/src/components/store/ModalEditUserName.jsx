// Début code Johan

//Validation des props
import PropTypes from "prop-types";
//Gestion des états
import { useState } from "react";

const ModalEditUserName = ({ userName, isOpen, onSave, onCancel }) => {
  const [newUserName, setNewUserName] = useState(userName || ""); //État pour stocker la nouvelle valeur
  const [isSaving, setIsSaving] = useState(false); //Indicateur de sauvegarde

  //Fonction pour sauvegarder le nouveau nom
  const handleSave = async () => {
    if (!newUserName.trim()) {
      alert("User name cannot be empty.");
      return;
    }

    setIsSaving(true); //Démarre l'indicateur de sauvegarde
    try {
      await onSave(newUserName); //Appelle la fonction passée en prop pour sauvegarder
    } catch (error) {
      alert(`Error updating user profile: ${error.message}`);
    } finally {
      setIsSaving(false); //Arrête l'indicateur de sauvegarde
    }
  };

  if (!isOpen) return null; //Ne rend rien si la modale n'est pas ouverte

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title">
      <div className="modal-content">
        <h2>Edit Your User Name</h2>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter your new name"
          aria-label="New user name"
          className="modal-input"
        />
        <button
          className="edit-button modal-button"
          onClick={handleSave}
          disabled={isSaving} //Désactive le bouton pendant la sauvegarde
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          className="edit-button modal-button"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

ModalEditUserName.propTypes = {
  userName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalEditUserName;

// Fin code Johan
