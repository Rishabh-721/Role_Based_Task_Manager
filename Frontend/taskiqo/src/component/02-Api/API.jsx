import React from 'react';
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BACKEND_API;

const API = async({method, endpoint, data = null}) => {
const token = localStorage.getItem("token");

    return await axios({
        method,
        url : `${BASE_URL}/${endpoint}`,
        data,
        headers: token ? {Authorization: `Bearer ${token}`} : {}
    })    
}


export default API
