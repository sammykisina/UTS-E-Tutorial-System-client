import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { LecturerTutorials, Login, School, Students } from '@/pages';

const AppRouters = () => {
  /**
   * components states
   */
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback='loading'>
            {role === 'admin' ? (
              'Admin'
            ) : role === 'lecturer' ? (
              <LecturerTutorials />
            ) : (
              'students'
            )}
          </Suspense>
        }
      />

      <Route
        path='/auth/login'
        element={
          <Suspense fallback='loading'>
            <Login />
          </Suspense>
        }
      />

      <Route
        path='/students'
        element={
          <Suspense fallback='loading'>
            <Students />
          </Suspense>
        }
      />

      <Route
        path='/school'
        element={
          <Suspense fallback='loading'>
            <School />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRouters;
