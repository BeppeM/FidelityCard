const API_URL = "http://localhost:8080/api/redeem";

export const redeemItem = async (redeemLog, token) => {
    return await fetch(API_URL + "/perform", 
    {
        method:'POST',
        body:JSON.stringify(redeemLog),
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        }
    });
}

export const getRedeemHistory = async (user, token) => {
    return await fetch(API_URL + "/get/all/" + user, 
    {
        headers:{'Authorization':'Bearer ' + token}
    });
}