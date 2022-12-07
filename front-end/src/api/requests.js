import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,

});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const Get = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const GetId = async (endpoint, body) => {
  console.log(endpoint, body);
  const { data } = await api.get(endpoint, body);
  return data;
};

/* export const GetId = async (endpoint, body) => {
  await fetch(endpoint, {
    method: 'GET',
    body: JSON.stringify(body),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}; */

// https://masteringjs.io/tutorials/axios/get-with-data

export const Post = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const PostAuth = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export default api;
