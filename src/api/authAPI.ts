import { ForgotPassword, LoginData } from '../types/typings.t';
import { API } from './api';

const AuthAPI = {
  login: async (data: LoginData) => API.post('/auth/login', data),
  getLecturerProfile: async (lecturerId: number) =>
    API.get(
      `/lecturer/${lecturerId}/profile?include=tutorials.unit,tutorials.questions.answers,tutorials.results.student,discussions.owner,discussions.unit,discussions.comments.owner`
    ),
  getStudentProfile: async (studentId: number) =>
    API.get(
      `/student/${studentId}/profile?include=discussions.owner,discussions.unit,discussions.comments.owner`
    ),
  updatePassword: async (data: { email: string; password: string }) =>
    API.post('/users/password-reset', data),

  sendEmail: async (data: ForgotPassword) =>
    API.post(`/auth/forgot-password`, data),
};

export default AuthAPI;
