import { useAuth } from '@/hooks';
import {
  Button,
  CreateOrEditTutorial,
  Dropdown,
  Icon,
  SpinnerLoader,
  TabTitle,
  Title,
  TutorialManagement,
  Widget,
} from '@/components';
import { tutorialAtoms } from '@/atoms';
import { useRecoilState } from 'recoil';
import { FC, useState } from 'react';
import { APITutorial } from '../../types/typings.t';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { format } from 'date-fns';

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
  const Tutorial: FC<{ tutorial: APITutorial }> = ({ tutorial }) => {
    const [showTutorialManagementDropdown, setShowTutorialManagementDropdown] =
      useState(false);

    return (
      <section
        className={`${tutorial?.attributes?.bgColor} px-2 py-1 rounded-[2rem] md:w-[30rem] lg:w-[35rem] gap-2 h-[20rem]  xs:h-[15rem] flex items-center relative overflow-hidden `}
      >
        {/* <div className='w-[8rem] h-[8rem] bg-white rounded-full object-cover -ml-8' /> */}
        <img
          src={tutorial?.attributes?.icon}
          className='w-[8rem] h-[8rem] rounded-full border-4'
          alt=''
        />

        <div className='flex-1'>
          <div className='absolute top-2 right-2 flex'>
            <div className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex gap-2 items-center justify-center leading-loose text-white'>
              <span> {tutorial?.attributes?.numberOfQuestions} QNS</span> /
              <span> {tutorial?.attributes?.timeToTakeInTutorial} MINS</span>
            </div>

            <Dropdown
              active={<HiOutlineEllipsisVertical className='icon' />}
              inactive={<HiOutlineEllipsisVertical className='icon' />}
              dropdownComponent={<TutorialManagement tutorial={tutorial} />}
              displayState={showTutorialManagementDropdown}
              setDisplayState={setShowTutorialManagementDropdown}
            />
          </div>

          <div>
            <p className='first-letter:uppercase text-textColor'>
              {tutorial?.attributes?.description}
            </p>

            <div className='flex gap-1 flex-col xs:flex-row'>
              <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose text-white'>
                {tutorial?.relationships?.unit?.attributes?.name}
              </span>

              <span className='rounded-full w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose text-white'>
                {format(
                  new Date(tutorial?.attributes?.dueDate),
                  'EE, MMM d, yyy @ HH:mm'
                )}
              </span>
            </div>
          </div>

          <div className='absolute bottom-2 right-2  bg-white w-[5rem] h-[5rem] flex justify-center items-center rounded-full'>
            {tutorial?.attributes?.numberOfPointsForEachQuestion *
              tutorial?.attributes?.numberOfQuestions}{' '}
            pts
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className='flex flex-col gap-4 h-full xs:h-[40rem] lg:h-[39rem]'>
      {/* lecturer units */}
      <div className='flex gap-2 bg-callToAction/5 py-2 px-2'>
        <TabTitle title='YOUR UNITS.' />

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
          {lecturerProfile?.relationships?.tutorials?.map(
            (tutorial, tutorialIndex) => (
              <Tutorial key={tutorialIndex} tutorial={tutorial} />
            )
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
