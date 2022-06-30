const API_URL = "http://localhost:8080/api/catalog/";

export const getManagerCatalogs = async (manager, token) => {
    return await fetch(API_URL + "type/get/all/" + manager,
    {
        headers:{'Authorization':'Bearer ' + token}
    });
} 

export const createCatalog = async (catalog, token) => {
    return await fetch(API_URL + "/type/create",
    {
        method:'POST',
        body: JSON.stringify(catalog),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    });
}

export const getCatalogRewards = async (catalog, manager, token) => {
    return await fetch(API_URL + "/reward/get/" + manager + "/" + catalog,
    {
        headers:{'Authorization': 'Bearer ' + token}
    });
}

export const addReward = async (reward, token) => {
    return await fetch(API_URL + "/reward/create",
    {
        method:"POST",
        body:JSON.stringify(reward),
        headers:{
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json'
        }
    });
}

export const updateStock = async (stock, reward, token) => {
    return await fetch(API_URL + "/reward/update/quantity/" + reward + "?quantity=" + stock,
    {
        method:'PUT',
        headers:{'Authorization': 'Bearer ' + token}
    }); 
}

export const deleteReward = async (reward, token) => {
    return await fetch(API_URL + "/reward/delete/" + reward, {
        method:'DELETE',
        headers:{'Authorization':'Bearer ' + token}
    });
}