import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthAPI } from '@/api';
import Cookies from 'js-cookie';
import { Toasts } from '@/components';
import { useNavigate } from 'react-router-dom';
import { APILecturer, LoginData, User } from '../types/typings.t';

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

  return {
    user,
    token,
    loginMutateAsync,
    isLogging,
    logout,
    lecturerProfile,
    isFetchingLecturerProfile,
  };
};

export default useAuth;