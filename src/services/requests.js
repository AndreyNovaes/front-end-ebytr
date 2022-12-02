import axios from 'axios';

const URL = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_PORT;

const api = axios.create({
  baseURL: `${URL}:${PORT}/tasks`,
});

export const getAll = async (query) => {
  if (query) {
    const { orderBy, orderDirection } = query;
    const queryUrl = `?filter=${orderBy}&order=${orderDirection}`;
    const { data } = await api.get(`${queryUrl}`);
    return data;
  }
  const { data } = await api.get();
  return data;
};

export const getById = async (id) => {
  const response = await api.get(`/${id}`);
  return response;
};

export const createOne = async (data) => {
  const response = await api.post('/', data);
  return response;
};

export const updateById = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response;
};

export const deleteById = async (id) => {
  const response = await api.delete(`${id}`);
  return response.data;
};

export const updateStatusById = async (id, status) => {
  const response = await api.put(`/${id}/${status}`);
  return response.data;
};
