//Début code Johan

//Fonction pour récupérer le profil utilisateur via une requête API
export const fetchUserProfileApi = async (token) => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

//Fin code Johan
