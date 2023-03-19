import { useAuth } from '@/hooks';
import { Button, Link, TabTitle } from '@/components';

const Profile = () => {
  /**
   * component states
   */
  const { user, profile } = useAuth();

  /**
   * component functions
   */
  return (
    <section className='w-[15rem] py-2 px-3 flex flex-col gap-2 divide-y'>
      {/* title */}
      <div>
        <TabTitle title='Your Profile' />
      </div>

      {user ? (
        <div className='p-1'>
          <span>{profile?.attributes?.name}</span>
          <span>{profile?.attributes?.email}</span>
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
