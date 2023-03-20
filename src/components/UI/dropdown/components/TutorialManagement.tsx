import { useAuth, useStudent, useTutorial } from '@/hooks';
import { Button, Icon, SpinnerLoader, TutorialQns, Widget } from '@/components';
import { HiOutlineTrash, HiPencil } from 'react-icons/hi2';
import { studentAtoms, tutorialAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { FC } from 'react';
import { APITutorial } from '../../../../types/typings.t';

const TutorialManagement: FC<{ tutorial: APITutorial }> = ({ tutorial }) => {
  /**
   * component states
   */
  const { generateAllDoneTutorialIds } = useStudent();
  const { user, studentProfile } = useAuth();
  const {
    showTutorialQnsWidgetState,
    globalTutorialState,
    showCreateOrEditTutorialWidgetState,
    isEditingTutorialState,
  } = tutorialAtoms;
  const setShowTutorialQnsWidget = useSetRecoilState(
    showTutorialQnsWidgetState
  );
  const setGlobalTutorial = useSetRecoilState(globalTutorialState);
  const setShowCreateOrEditTutorialWidget = useSetRecoilState(
    showCreateOrEditTutorialWidgetState
  );
  const setIsEditingTutorial = useSetRecoilState(isEditingTutorialState);
  const { isDeletingTutorial, deleteTutorialMutateAsync } = useTutorial();

  const { showTakeTutorialModalState } = studentAtoms;
  const setShowTakeTutorialModal = useSetRecoilState(
    showTakeTutorialModalState
  );

  return (
    <div>
      {user?.role === 'lecturer' ? (
        <section className='flex flex-col gap-2'>
          <div className='px-2 flex gap-2'>
            <Icon
              iconWrapperStyles='flex items-center gap-x-2 px-6 py-3  rounded-xl text-sm w-fit border'
              icon={<HiPencil className='icon text-green-400' />}
              purpose={() => {
                setGlobalTutorial(tutorial);
                setIsEditingTutorial(true);
                setShowCreateOrEditTutorialWidget(true);
              }}
            />

            <Icon
              iconWrapperStyles='flex items-center gap-x-2 px-6 py-3  rounded-xl text-sm w-fit border border-red-500'
              icon={
                isDeletingTutorial ? (
                  <SpinnerLoader color='fill-callToAction' size='w-4 h-4' />
                ) : (
                  <HiOutlineTrash className='icon text-red-400' />
                )
              }
              purpose={() => deleteTutorialMutateAsync(tutorial?.id)}
            />
          </div>

          <Button
            title='VIEW QNs'
            type='button'
            intent='primary'
            purpose={() => {
              setGlobalTutorial(tutorial);
              setShowTutorialQnsWidget(true);
            }}
          />
        </section>
      ) : (
        <div className='p-2'>
          {generateAllDoneTutorialIds(
            studentProfile?.relationships?.results
          )?.includes(tutorial?.id) ? (
            <span className='rounded-full bg-callToAction/10 whitespace-nowrap w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
              Done, Check Results Page For The Your Score
            </span>
          ) : (
            <Button
              title='Take Tutorial'
              type='button'
              intent='primary'
              purpose={() => {
                setGlobalTutorial(tutorial);
                localStorage.setItem('showTakeTutorialModalState', 'open');
                localStorage.setItem(
                  'globalTutorial',
                  JSON.stringify(tutorial)
                );
                setShowTakeTutorialModal(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TutorialManagement;
