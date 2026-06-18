import React from 'react';
import axios from 'axios';



const BASE_URL = import.meta.env.BACKEND_API;
const token = localStorage.getItem("token");
const API = async({method, endpoint, data = null}) => {
    return await axios({
        method,
        url : `${BASE_URL}/${endpoint}`,
        data,
        headers: token ? {Authorization: `Bearer ${token}`} : {}
    })    
}


export default API
