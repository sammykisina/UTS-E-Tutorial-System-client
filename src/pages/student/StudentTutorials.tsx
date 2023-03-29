import { useAuth, useTutorial } from '@/hooks';
import { useState } from 'react';
import { SpinnerLoader, TabTitle, Title, Tutorial } from '@/components';

const StudentTutorials = () => {
  /**
   * page states
   */
  const { isFetchingStudentProfile, studentProfile } = useAuth();
  const { isFetchingTutorials, tutorials } = useTutorial();

  const currentStudentTutorials = tutorials?.filter((tutorial) => {
    return studentProfile?.relationships?.course?.relationships?.units.find(
      (unit) => {
        return (
          tutorial?.relationships?.unit?.attributes?.name ===
          unit?.attributes?.name
        );
      }
    );
  });

  const currentUserPublishedTutorials = currentStudentTutorials?.filter(
    (currentStudentTutorial) => {
      return currentStudentTutorial?.attributes?.published;
    }
  );

  console.log('studentProfile', studentProfile);

  return (
    <section className='flex flex-col gap-4 h-full xs:h-[40rem] lg:h-[39rem]'>
      {/* students units (connected to course) */}
      <div className='flex gap-2 bg-callToAction/5 py-2 px-2'>
        <TabTitle title='YOUR SCHOOLS.' />

        <div className='flex gap-1  w-full px-2 overflow-x-scroll scrollbar-hide'>
          {isFetchingStudentProfile ? (
            <SpinnerLoader color='fill-callToAction' size='w-4 h-4' />
          ) : (
            studentProfile?.relationships?.course?.relationships?.units?.map(
              (unit, unitIndex) => (
                <span
                  key={unitIndex}
                  className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'
                >
                  {unit?.attributes?.name}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/*  */}
      <div className='md:flex justify-center'>
        <div className='flex items-center gap-2 md:w-[30rem] lg:w-[35rem]'>
          {/* title */}
          <Title title='Tutorials.' />

          {isFetchingStudentProfile ? (
            ''
          ) : (
            <div className='flex gap-4'>
              <span className='rounded-full bg-green-400/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                {currentUserPublishedTutorials?.length} active
              </span>

              <span className='rounded-full bg-amber-400/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                {currentStudentTutorials?.length! -
                  currentUserPublishedTutorials?.length!}{' '}
                upcoming
              </span>
            </div>
          )}
        </div>
      </div>

      {/* current student tutorials */}
      <div className='mt-5 h-[38rem] overflow-y-scroll  scrollbar-hide'>
        {isFetchingStudentProfile ? (
          <div className='h-full flex justify-center items-center'>
            <SpinnerLoader color='fill-callToAction' />
          </div>
        ) : (
          <div className='flex justify-center flex-col md:items-center gap-5'>
            {currentUserPublishedTutorials?.length! > 0 ? (
              currentUserPublishedTutorials?.map((tutorial, tutorialIndex) => (
                <Tutorial key={tutorialIndex} tutorial={tutorial} />
              ))
            ) : (
              <div className='h-[15rem] flex justify-center items-center '>
                You don`t have tutorials for any of you units yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentTutorials;
