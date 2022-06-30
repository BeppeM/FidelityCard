//Ritorna i punti medi delle carte di un utente
export const getAvgPointsByUser = async (username, token) => {
  console.log("Request: " + username + " Token: " + token);
  return await fetch(
    "http://localhost:8080/api/statistic/get/avgPointsByUser/" + username,
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((data) => data);
};

//Ritorna i punti medi di tutte le carte raggruppate per catalogo
export const getAvgPointsByCatalog = async (manager, token) => {
  console.log("Request: " + manager + " Token: " + token);
  return await fetch(
    "http://localhost:8080/api/statistic/avgPoints/" + manager,
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    //.then((data) => data);
};


//Ritorna la classifica dei premi più riscattati
export const getTopRewards = async (manager, token) => {
  console.log("Request: " + manager + " Token: " + token);
  return await fetch(
    "http://localhost:8080/api/statistic/get/topReward/" + manager,
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    //.then((data) => data);
};

//Ritorna la classifica dei cataloghi con più iscrizioni
export const getTopCatalogs = async (manager, token) => {
  console.log("Request: " + manager + " Token: " + token);
  return await fetch(
    "http://localhost:8080/api/statistic/get/topCatalogs/" + manager,
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    //.then((data) => data);
};

//Media iscrizioni in un certo periodo di tempo
export const getAvgSubs = async (manager, period, token) => {
  console.log("Request: " + manager + " Token: " + token + " Period: " + period);
  return await fetch(
    "http://localhost:8080/api/statistic/get/avgSubsByMonths/" + period + "/" + manager,
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    //.then((data) => data);
};