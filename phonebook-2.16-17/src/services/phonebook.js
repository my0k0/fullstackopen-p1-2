import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

const create = (newObject) => {
  const req = axios.post(url, newObject);
  return req.then((res) => res.data);
};

const update = (id, newObject) => {
  const req = axios.put(`${url}/${id}`, newObject);
  return req.then((res) => res.data);
};

const del = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default { getAll, create, update, delete: del };
