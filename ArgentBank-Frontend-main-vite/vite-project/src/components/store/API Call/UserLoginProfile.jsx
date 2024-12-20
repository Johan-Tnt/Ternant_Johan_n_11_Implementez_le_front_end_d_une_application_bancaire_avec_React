//Début code Johan

//Fonction pour gérer la connexion utilisateur via une requête API
export const loginUserApi = async (email, password) => {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

//Fin code Johan
