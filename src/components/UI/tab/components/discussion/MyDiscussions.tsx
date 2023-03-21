import React from 'react';
import { useAuth } from '@/hooks';
import { Discussion, SpinnerLoader, Title } from '@/components';

const MyDiscussions = () => {
  /**
   * component states
   */
  const {
    user,
    lecturerProfile,
    studentProfile,
    isFetchingLecturerProfile,
    isFetchingStudentProfile,
  } = useAuth();
  const discussions =
    user?.role === 'lecturer'
      ? lecturerProfile?.relationships?.discussions
      : user?.role === 'student'
      ? studentProfile?.relationships?.discussions
      : [];

  return (
    <section className='flex flex-col gap-4'>
      <Title title='MY DISCUSSIONS' />

      {isFetchingLecturerProfile || isFetchingStudentProfile ? (
        <div className=' border h-[15rem] flex justify-center items-center rounded-[2rem]'>
          <SpinnerLoader color='fill-callToAction' size='w-4 h-4' />
        </div>
      ) : discussions?.length! > 0 ? (
        <div className='h-[28rem] xs:h-[21.5rem] overflow-y-scroll scrollbar-hide py-2 lg:h-[25rem] flex flex-col gap-2'>
          {discussions?.map((discussion, discussionIndex) => (
            <Discussion key={discussionIndex} discussion={discussion} />
          ))}
        </div>
      ) : (
        <div className=' border h-[15rem] flex justify-center items-center rounded-[2rem]'>
          No Discussions found.
        </div>
      )}
    </section>
  );
};

export default MyDiscussions;
