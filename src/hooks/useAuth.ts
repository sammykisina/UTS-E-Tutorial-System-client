import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthAPI } from '@/api';
import Cookies from 'js-cookie';
import { Toasts } from '@/components';
import { useNavigate } from 'react-router-dom';
import {
  APILecturer,
  APIStudent,
  ForgotPassword,
  LoginData,
  User,
} from '../types/typings.t';

const useAuth = () => {
  /**
   * hook states
   */
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  /**
   * hook functions
   */
  const { mutateAsync: loginMutateAsync, isLoading: isLogging } = useMutation({
    mutationFn: (loginData: LoginData) => {
      return AuthAPI.login(loginData);
    },

    onSuccess: async (data) => {
      Cookies.set('user', JSON.stringify(data.user));
      Cookies.set('token', data.token);

      navigate('/');
      refresh();
      Toasts.successToast(data.message);
    },
  });

  const { data: lecturerProfile, isLoading: isFetchingLecturerProfile } =
    useQuery({
      queryKey: ['lecturerProfile', user?.role],
      queryFn: async ({ queryKey }) => {
        const [_, role] = queryKey;

        if (role === 'lecturer') {
          return (await AuthAPI.getLecturerProfile(user?.id!)) as APILecturer;
        }

        return null;
      },
    });

  const { data: studentProfile, isLoading: isFetchingStudentProfile } =
    useQuery({
      queryKey: ['studentProfile', user?.role],
      queryFn: async ({ queryKey }) => {
        const [_, role] = queryKey;

        if (role === 'student') {
          return (await AuthAPI.getStudentProfile(user?.id!)) as APIStudent;
        }

        return null;
      },
    });

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    setToken(undefined);
    setUser(undefined);

    refresh();
    navigate('/');
  };

  const refresh = () => window.location.reload();

  useEffect(() => {
    const user = Cookies.get('user') && JSON?.parse(Cookies.get('user') || '');
    const token = Cookies.get('token');
    if (token !== undefined || token !== '') {
      setToken(token);
    }

    if (user !== undefined || user !== '') {
      setUser(user);
    }
  }, []);

  const {
    mutateAsync: updatePasswordMutateAsync,
    isLoading: isUpdatingPassword,
  } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return AuthAPI.updatePassword(data);
    },

    onSuccess: async (data) => {
      Toasts.successToast(data.message);
    },
  });

  const { mutateAsync: sendEmailMutateAsync, isLoading: isSendingEmail } =
    useMutation({
      mutationFn: (forgotPassword: ForgotPassword) => {
        return AuthAPI.sendEmail(forgotPassword);
      },

      onSuccess: async (data) => {
        navigate('/auth/login');
        Toasts.successToast(data.message);
      },
    });

  return {
    user,
    token,
    loginMutateAsync,
    isLogging,
    logout,
    lecturerProfile,
    isFetchingLecturerProfile,
    studentProfile,
    isFetchingStudentProfile,
    updatePasswordMutateAsync,
    isUpdatingPassword,
    sendEmailMutateAsync,
    isSendingEmail,
  };
};

export default useAuth;
