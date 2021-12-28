import { LoginPayload } from '@/models/auth'
import axiosClient from './axios-client'
// import { LoginPayload } from 'src/features/auth/authSlice';
// import axiosClient from './axiosClient';

const authApi = {
  postLogin: (payload: LoginPayload) => {
    const url = '/login'
    return axiosClient.post(url, payload)
  },
  postLogout: () => {
    const url = '/logout'
    return axiosClient.post(url)
  },
  getProfile: () => {
    return axiosClient.get('/profile')
  },
}

export default authApi