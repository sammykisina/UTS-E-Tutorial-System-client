import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks';
import {
  LecturerTutorials,
  Login,
  Ranking,
  Results,
  School,
  StudentTutorials,
  Students,
} from '@/pages';

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
            ) : role === 'student' ? (
              <StudentTutorials />
            ) : (
              ''
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

      <Route
        path='/results'
        element={
          <Suspense fallback='loading'>
            <Results />
          </Suspense>
        }
      />

      <Route
        path='/ranking'
        element={
          <Suspense fallback='loading'>
            <Ranking />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRouters;
