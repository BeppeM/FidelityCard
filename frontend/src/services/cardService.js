const API_URL = "http://localhost:8080/api/card";

export const createCard = async (card, token) => {
    return await fetch(API_URL + "/create", 
    {
        method:"POST",
        body:JSON.stringify(card),
        headers: {
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json'
        }
    });
} 

export const getCustomerCards = async (customer, token) => {
    return await fetch(API_URL + "/get/all/" + customer, 
    {
        headers:{'Authorization':'Bearer ' + token}
    });
}

/*export const getManagersCard = async (manager, token) => {

}*/

export const getCatalogCards = async (manager, catalog, token) => {
    return await fetch(API_URL + "/get/catalog_cards/" + manager + "/" + catalog,
    {
        headers: {'Authorization':'Bearer ' + token}
    });

}

export const addPointsToCard = async (id, pts, token) => {
    return await fetch(API_URL + "/update/" + id + "?points=" + pts, 
    {
        method:'PUT',
        headers:{'Authorization':'Bearer ' + token}
    });
}

export const deleteCard = async (id, token) => {
    return await fetch(API_URL + "/delete/" + id, {
        method:'DELETE',
        headers:{'Authorization':'Bearer ' + token}
    });
}