const API_URL = "http://localhost:8080/api/manager"; 

export const getManagers = async (token) => {
    return await fetch(API_URL + "/get/all", 
    {
        headers: {'Authorization': 'Bearer ' + token}
    });
}

export const createManager = async (manager) => {
    return await fetch(API_URL + "/create",
            {
                method:'POST',
                body: JSON.stringify(manager),
                headers:{
                    'Content-Type':'application/json',
                    'Registration': true
                }
            });
}

export const getManagerInfo = async (manager, token) => {
    return await fetch(API_URL + "/get/" + manager,
    {
        headers:{'Authorization':'Bearer ' + token}
    });
}

export const updateManagerInfo = async (manager, token) => {
    return await fetch(API_URL + "/update",
    {
        method:"PUT",
        body: JSON.stringify(manager),
        headers:{
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json'
        }
    })
        .then(res => res)
        .catch(err => console.error(err));
}