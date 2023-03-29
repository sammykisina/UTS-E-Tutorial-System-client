import { useAuth } from '@/hooks';
import {
  Button,
  CreateOrEditTutorial,
  SpinnerLoader,
  TabTitle,
  Title,
  Tutorial,
  Widget,
} from '@/components';
import { tutorialAtoms } from '@/atoms';
import { useRecoilState } from 'recoil';

const LecturerTutorials = () => {
  /**
   * page states
   */
  const { isFetchingLecturerProfile, lecturerProfile } = useAuth();
  const { showCreateOrEditTutorialWidgetState } = tutorialAtoms;
  const [showCreateOrEditTutorialWidget, setShowCreateOrEditTutorialWidget] =
    useRecoilState(showCreateOrEditTutorialWidgetState);

  /**
   * page functions
   */
  return (
    <section className='flex flex-col gap-4 h-full xs:h-[40rem] lg:h-[39rem]'>
      {/* lecturer units */}
      <div className='flex gap-2 bg-callToAction/5 py-2 px-2'>
        <TabTitle title='YOUR COURSES.' />

        <div className='flex gap-1  w-full px-2 overflow-x-scroll scrollbar-hide'>
          {isFetchingLecturerProfile ? (
            <SpinnerLoader color='fill-callToAction' size='w-4 h-4' />
          ) : (
            lecturerProfile?.relationships.units?.map((unit, unitIndex) => (
              <span
                key={unitIndex}
                className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'
              >
                {unit?.attributes?.name}
              </span>
            ))
          )}
        </div>
      </div>

      {/*  */}
      <div className='md:flex justify-center'>
        <div className='flex items-center justify-between md:w-[30rem] lg:w-[35rem]'>
          {/* title */}
          <Title title='Tutorials' />

          <Button
            title='CREATE TUTORIAL'
            type='button'
            intent='primary'
            fullWidth={false}
            purpose={() => setShowCreateOrEditTutorialWidget(true)}
          />
        </div>
      </div>

      {/* current lecturer tutorials */}
      <div className='mt-5 h-[38rem] overflow-y-scroll  scrollbar-hide'>
        <div className='flex justify-center flex-col md:items-center gap-5'>
          {lecturerProfile?.relationships?.tutorials?.length! > 0 ? (
            lecturerProfile?.relationships?.tutorials?.map(
              (tutorial, tutorialIndex) => (
                <Tutorial key={tutorialIndex} tutorial={tutorial} />
              )
            )
          ) : (
            <div className='flex h-[15rem] justify-center items-center'>
              You have no tutorials created yet.
            </div>
          )}
        </div>
      </div>

      <Widget
        widgetState={showCreateOrEditTutorialWidget}
        component={<CreateOrEditTutorial />}
        widgetStyles='w-[90vw] h-fit'
      />
    </section>
  );
};

export default LecturerTutorials;
