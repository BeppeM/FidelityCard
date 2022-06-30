const API_URL = "http://localhost:8080/api/customer";


/*export const getCustomers = async () => {
    return fetch(API_URL + "")
                    .then(res => res.json());
}*/


export const createCustomer = async (customer) => {
    return  fetch(API_URL + "/create", 
            {
                method:'POST', 
                body:JSON.stringify(customer), 
                headers: {
                    'Content-Type': 'application/json',
                    'Registration': true
                }
            });
}

export const getCustomerInfo = async (customer, token) => {
    return await fetch(API_URL + "/get/" + customer, 
        {
            headers:{'Authorization':'Bearer ' + token}
        });
}
export const updateCustomerInfo = async (customer, token) => {
    return await fetch(API_URL + "/update",
    {
        method:"PUT",
        body: JSON.stringify(customer),
        headers:{
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json'
        }
    })
        .then(res => res)
        .catch(err => console.error(err));
}