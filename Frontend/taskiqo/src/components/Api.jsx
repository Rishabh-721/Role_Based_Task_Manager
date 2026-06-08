import React from 'react'

const Api = async(method, url, data = {}) => {
  try {
    const responce = await axios({
        method,
        url : `http//localhost:5000${url}`,
        data,
    });

    return responce.data;

  } catch (error) {
    console.error(error);
  }
}

export default Api

