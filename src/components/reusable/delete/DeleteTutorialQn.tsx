import React, { FC } from 'react';
import useTutorial from '../../../hooks/useTutorial';
import Icon from '../../UI/Icon';
import SpinnerLoader from '../SpinnerLoader';
import { HiOutlineTrash } from 'react-icons/hi2';

const DeleteTutorialQn: FC<{ tutorialQnId: number }> = ({ tutorialQnId }) => {
  const tutorialHook = useTutorial();

  return (
    <Icon
      iconWrapperStyles='text-red-500'
      icon={
        tutorialHook?.isDeletingTutorialQn ? (
          <SpinnerLoader color='fill-callToAction' />
        ) : (
          <HiOutlineTrash className='icon' />
        )
      }
      purpose={() => {
        tutorialHook.deleteTutorialQnMutateAsync(tutorialQnId);
      }}
    />
  );
};

export default DeleteTutorialQn;
