import { useAuth } from '@/hooks';
import {
  Button,
  Error,
  Link,
  SpinnerLoader,
  TabTitle,
  Title,
  Toasts,
} from '@/components';
import { object, string, z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';

const Profile = () => {
  /**
   * component states
   */
  const {
    user,
    isFetchingLecturerProfile,
    isFetchingStudentProfile,
    studentProfile,
    lecturerProfile,
    isUpdatingPassword,
    updatePasswordMutateAsync,
  } = useAuth();

  const passwordUpdateSchema = object({
    password: string({ required_error: 'Password is required.' }).trim(),
    confirm: string({ required_error: 'Enter password to confirm.' }).trim(),
  }).refine((data) => data.confirm === data.password, {
    message: "Passwords don't match",
    path: ['confirm'],
  });
  type PasswordUpdatedSchema = z.infer<typeof passwordUpdateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordUpdatedSchema>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const profile = user?.role === 'student' ? studentProfile : lecturerProfile;

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<PasswordUpdatedSchema> = async ({
    password,
  }) => {
    if (password === '') {
      Toasts.errorToast('Password is required.');
      return;
    }

    await updatePasswordMutateAsync({
      email: user?.email || '',
      password: password,
    });
  };

  return (
    <section className={`w-[20rem] py-2 px-3 flex flex-col gap-2 divide-y `}>
      {/* title */}
      <div>
        <TabTitle title='Your Profile' />
      </div>

      {user ? (
        <div className='p-2'>
          <span>{profile?.attributes?.name}</span>
          <span>{profile?.attributes?.email}</span>

          {/* update password */}
          <div className='mt-6 flex justify-center '>
            <form
              className='w-full space-y-1 rounded-[2rem] p-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Title title='UPDATE YOUR PASSWORD' titleStyles='text-lg' />
              <section className='flex w-full flex-col gap-4 py-3'>
                <div className='relative'>
                  <input
                    type='password'
                    {...register('password')}
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

                <div className='relative'>
                  <input
                    type='password'
                    {...register('confirm')}
                    className='input peer'
                    placeholder='Confirm Password'
                  />
                  <label className='inputLabel'>Confirm Password</label>

                  {errors['confirm'] && (
                    <ErrorMessage
                      errors={errors}
                      name='confirm'
                      render={({ message }) => <Error errorMessage={message} />}
                    />
                  )}
                </div>
              </section>

              <div className='flex justify-end'>
                <Button
                  title={
                    isUpdatingPassword ? (
                      <SpinnerLoader color='fill-white' />
                    ) : (
                      'Update'
                    )
                  }
                  type='submit'
                  intent='primary'
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='p-1'>
          <Link
            route={{
              to: '/auth/login',
              name: 'Login',
            }}
            type='link'
          />
        </div>
      )}
    </section>
  );
};

export default Profile;
