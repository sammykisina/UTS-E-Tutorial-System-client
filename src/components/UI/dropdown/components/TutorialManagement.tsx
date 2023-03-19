import { useAuth } from '@/hooks';
import { Button, Icon, TutorialQns, Widget } from '@/components';
import { HiOutlineTrash, HiPencil } from 'react-icons/hi2';
import { tutorialAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { FC } from 'react';
import { APITutorial } from '../../../../types/typings.t';

const TutorialManagement: FC<{ tutorial: APITutorial }> = ({ tutorial }) => {
  /**
   * component states
   */
  const { user } = useAuth();
  const { showTutorialQnsWidgetState, globalTutorialState } = tutorialAtoms;
  const setShowTutorialQnsWidget = useSetRecoilState(
    showTutorialQnsWidgetState
  );
  const setGlobalTutorial = useSetRecoilState(globalTutorialState);

  return (
    <div>
      {user?.role === 'lecturer' ? (
        <section className='flex flex-col gap-2'>
          <div className='px-2 flex gap-2'>
            <Icon
              iconWrapperStyles='flex items-center gap-x-2 px-6 py-3  rounded-xl text-sm w-fit border'
              icon={<HiPencil className='icon text-green-400' />}
            />

            <Icon
              iconWrapperStyles='flex items-center gap-x-2 px-6 py-3  rounded-xl text-sm w-fit border border-red-500'
              icon={<HiOutlineTrash className='icon text-red-400' />}
            />
          </div>

          <Button
            title='VIEW QNs'
            type='submit'
            intent='primary'
            purpose={() => {
              setGlobalTutorial(tutorial);
              setShowTutorialQnsWidget(true);
            }}
          />
        </section>
      ) : (
        ''
      )}
    </div>
  );
};

export default TutorialManagement;
