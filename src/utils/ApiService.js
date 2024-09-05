import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  get(resource) {
    return apiClient.get(resource);
  },
  post(resource, data) {
    return apiClient.post(resource, data);
  },
  // autres méthodes CRUD
};
