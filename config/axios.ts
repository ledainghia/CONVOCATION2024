import axios from 'axios';

const BASE_URL =
  localStorage.getItem('url') + '/api' || 'http://localhost:3000/api';
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Đảm bảo BASE_URL đã được định nghĩa ở nơi khác trong mã của bạn
});

// Thêm một interceptor để cấu hình tiêu đề của mỗi yêu cầu
axiosInstance.interceptors.request.use((config) => {
  // Lấy assetToken từ localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem assetToken có tồn tại và không rỗng
  if (accessToken) {
    // Thêm assetToken vào tiêu đề Authorization
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.timeout = 3000;
  }

  return config;
});

export type User = {
  userName: string | undefined;
  password: string | undefined;
};

export const loginAPI = {
  login: async (user: User) => {
    return await axios.post(BASE_URL + '/Auth/Login', user);
  },
};

export const ledAPI = {
  getHallList: async () => {
    return await axiosInstance.get('/Hall/GetAll');
  },
  getSessionList: async () => {
    return await axiosInstance.get('/Session/GetAll');
  },
};
