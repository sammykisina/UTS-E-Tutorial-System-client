import { LoginData } from '../types/typings.t';
import { API } from './api';

const AuthAPI = {
  login: async (data: LoginData) => API.post('/auth/login', data),
  getLecturerProfile: async (lecturerId: number) =>
    API.get(
      `/lecturer/${lecturerId}/profile?include=tutorials.unit,tutorials.questions.answers`
    ),
};

export default AuthAPI;
