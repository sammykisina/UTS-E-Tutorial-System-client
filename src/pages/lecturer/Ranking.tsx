import { useAuth, useLecturer, useStudent } from '@/hooks';
import { TabTitle, Table, Title } from '@/components';

const Ranking = () => {
  /**
   * page states
   */
  const { isFetchingLecturerProfile, lecturerProfile } = useAuth();
  const rankableTutorials = lecturerProfile?.relationships?.tutorials?.filter(
    (tutorial) => tutorial?.relationships?.results?.length > 0
  );
  console.log('lecturerProfile', lecturerProfile);
  console.log('rankableTutorials', rankableTutorials);
  const { modifyResultsDataForResultsTable } = useStudent();
  const { tutorialRankingColumns } = useLecturer();

  return (
    <section className='flex flex-col gap-4 h-full xs:h-[40rem] lg:h-[39rem]'>
      <div className='flex gap-2 bg-callToAction/5 py-2 px-2'>
        <TabTitle title='YOUR STUDENTS PERFORMANCES.' />
      </div>

      <div className='md:flex justify-center'>
        <div className='flex items-center justify-between md:w-[30rem] lg:w-[35rem]'>
          {/* title */}
          <Title title='Tutorial Ranking' />
        </div>
      </div>

      <div className='mt-5 h-[38rem] overflow-y-scroll  scrollbar-hide'>
        <div className='flex justify-center flex-col md:items-center gap-5'>
          {rankableTutorials?.length! > 0 ? (
            rankableTutorials?.map((tutorial, tutorialIndex) => (
              <section
                className={`${tutorial?.attributes?.bgColor} px-2 py-1 rounded-[2rem] md:w-[30rem] lg:w-[35rem] gap-2 h-[20rem]  xs:h-[15rem] flex pt-10 relative `}
              >
                <div className='absolute top-2 left-2  rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex gap-2 items-center justify-center leading-loose text-white'>
                  {tutorial?.attributes?.code}
                </div>

                <img
                  src={tutorial?.attributes?.icon}
                  className='w-[8rem] h-[8rem] rounded-full border-4'
                  alt=''
                />

                <div className='flex-1'>
                  <div className='absolute top-2 right-2 flex'>
                    <div className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex gap-2 items-center justify-center leading-loose text-white'>
                      <span>
                        {' '}
                        {tutorial?.attributes?.numberOfQuestions} QNS
                      </span>{' '}
                      /
                      <span>
                        {' '}
                        {tutorial?.attributes?.timeToTakeInTutorial} MINS
                      </span>
                    </div>
                  </div>

                  <div className='w-[14rem] xs:w-[20rem]  h-[15rem] xs:h-[11rem] lg:w-[25rem] overflow-y-scroll scrollbar-hide'>
                    <Table
                      data={modifyResultsDataForResultsTable(
                        tutorial?.relationships?.results
                      )}
                      columns={tutorialRankingColumns}
                      showFilters={false}
                      tableHeight='h-fit'
                    />
                  </div>

                  <div className='absolute bottom-2 left-2  bg-white w-[5rem] h-[5rem] flex justify-center items-center rounded-full'>
                    {parseInt(
                      tutorial?.attributes?.numberOfPointsForEachQuestion
                    ) * parseInt(tutorial?.attributes?.numberOfQuestions)}{' '}
                    pts
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className='flex h-[15rem] justify-center items-center'>
              You have no tutorials attempted yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Ranking;
