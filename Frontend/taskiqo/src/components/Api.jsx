import React from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5000";

const authApi = async(method, url, data = null) => {
  const token = sessionStorage.getItem("token");
  return await axios({
    method,
    url: `${BASE_URL}/auth/${url}`,
    data,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
};

const userApi = async(method, url, data = null) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  return await axios({
    method,
    url: `${BASE_URL}/user/${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const taskApi = async(method, url, data = null) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  return await axios({
    method,
    url: `${BASE_URL}/task/${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {authApi, userApi, taskApi}
