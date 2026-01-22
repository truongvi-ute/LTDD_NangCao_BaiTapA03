import axios from 'axios';

const api = axios.create({
  // Thay 8080 bằng cổng bạn đang chạy trong application.properties
  baseURL: 'http://localhost:8080/api/auth',
  timeout: 5000,
});

export default api;
