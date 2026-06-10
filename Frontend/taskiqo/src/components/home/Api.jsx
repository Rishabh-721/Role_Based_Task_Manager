import React from 'react';
import axios from 'axios';


const BASE_URL = "http://localhost:5000";

const authApi = async(method, url, data) => {
  return await axios({
    method,
    url: `${BASE_URL}/auth/${url}`,
    data,
  })
}

const userApi = async(method, url, data) => {
  return await axios({
    method,
    url: `${BASE_URL}/user/${url}`,
    data,
  })
}

const taskApi = async(method, url, data) => {
  return await axios({
    method,
    url: `${BASE_URL}/task/${url}`,
    data,
  })
}

export {authApi, userApi, taskApi}
