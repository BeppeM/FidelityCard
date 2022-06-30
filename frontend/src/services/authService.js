const API_URL = "http://localhost:8080/api/auth";
 

export const register = async (user) => {
    return  fetch(API_URL + "/register", 
            {
                method:'POST', 
                body:JSON.stringify(user), 
                headers:{'Content-Type':'application/json'}
            }).then(res => console.log(res));
}

export const authenitcate = async (credentials) => {
    return await fetch(API_URL + "/authenticate",
    {
        method:"POST",
        body:JSON.stringify(credentials),
        headers:{'Content-Type':'application/json'}
    });
}

export const refresh = async () => {
    //console.log("API call started...");
    const refresh = localStorage.getItem("refresh_token");
    console.log("Refresh: " + refresh);
    return await fetch(API_URL + "/refresh",
    {
        headers: {'Authorization':'Bearer ' + refresh}
    }
    )
    .then(res => {
        //console.log(res);
        return res.json();
    })
}

export const updatePassword = async (user, token) => {
    return await fetch(API_URL + "/update/password", 
    {
        method:"PUT",
        body: JSON.stringify(user),
        headers:{
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }).then(res => console.log(res))
    .catch(err => console.error(err));
}

