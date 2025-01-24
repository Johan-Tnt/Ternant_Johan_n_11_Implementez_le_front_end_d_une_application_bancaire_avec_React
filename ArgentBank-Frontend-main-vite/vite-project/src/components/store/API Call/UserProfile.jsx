//Début code Johan

//Cette Fonction envoie une requête PUT à l'API pour mettre à jour le nom d'utilisateur
export const updateUserProfileAPI = async (newUserName, token) => {
  try {
    //Appel API pour mettre à jour le profil
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //Ajout du token dans les headers pour l'authentification
      },
      body: JSON.stringify({ userName: newUserName }), //Corps de la requête contenant le nouveau nom d'utilisateur
    });

    if (!response.ok) {
      //Gestion des erreurs côté serveur
      const errorData = await response.json(); //Récupère les détails de l'erreur
      throw new Error(errorData.message || "Failed to update profile."); //Génération d'une exception pour remonter l'erreur
    }

    //Si la réponse est correcte, conversion en JSON
    const data = await response.json();
    return data;
  } catch (error) {
    //Gestion des exceptions réseau ou autres
    console.error("Failed to API call:", error.message);
    throw error;
  }
};

//Fin code Johan
