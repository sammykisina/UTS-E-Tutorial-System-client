import { Logo, Title, Error, Button, SpinnerLoader, Link } from '@/components';
import { useAuth } from '@/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Navigate } from 'react-router-dom';
import { LoginData } from '../../types/typings.t';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  /**
   * page states
   */
  const { isLogging, user, loginMutateAsync } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<LoginData> = ({ id, password }) => {
    loginMutateAsync({ id, password });
  };

  if (user) return <Navigate to='/' replace />;

  return (
    <section className='mx-auto flex h-[630px] w-full max-w-[1100px] flex-col items-center  justify-center sm:px-[24px]'>
      {/* logo & into */}
      <div className='mb-5 flex flex-col items-center'>
        <Logo
          logoStyles='text-[3rem] text-textColor'
          dotStyles='w-2 h-2 bg-callToAction'
        />

        <div className='text-lg text-textColor'>UTS E-Tutorial System</div>
      </div>

      {/*  into section */}
      <div className='mt-5 w-full px-6  sm:w-3/4 lg:w-1/2'>
        <Title title='Login' titleStyles='text-lg' />

        {/* the login details */}
        <div className='mt-3'>
          <form className='space-y-1 py-2' onSubmit={handleSubmit(onSubmit)}>
            <section className='flex w-full flex-col gap-4 py-3'>
              <div className='relative'>
                <input
                  type='number'
                  {...register('id', {
                    required: 'Your ID is required.',
                  })}
                  className='input peer'
                  placeholder='ID'
                />
                <label className='inputLabel'>ID</label>

                {errors['id'] && (
                  <ErrorMessage
                    errors={errors}
                    name='id'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>

              <div className='relative'>
                <input
                  type='password'
                  {...register('password', {
                    required: 'Enter your password.',
                  })}
                  className='input peer'
                  placeholder='Password'
                />
                <label className='inputLabel'>Password</label>

                {errors['password'] && (
                  <ErrorMessage
                    errors={errors}
                    name='password'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>
            </section>

            <Button
              title={isLogging ? <SpinnerLoader color='fill-white' /> : 'Login'}
              type='submit'
              intent='primary'
            />
          </form>
        </div>
      </div>

      <div className='mt-10 flex justify-center flex-col items-center'>
        <Link
          route={{
            to: '/email',
            name: 'Forgot Password?',
          }}
        />
      </div>

      {/* Toaster */}
      <Toaster />
    </section>
  );
};

export default Login;
