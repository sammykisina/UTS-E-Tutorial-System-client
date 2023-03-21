import { Icon, SpinnerLoader } from '@/components';
import { HiOutlineTrash, HiPencil } from 'react-icons/hi2';
import { useDiscussion } from '@/hooks';
import { FC } from 'react';
import { APIDiscussion } from '../../../../types/typings.t';
import { discussionAtoms } from '@/atoms';
import { useSetRecoilState } from 'recoil';

const DiscussionManagement: FC<{
  discussion: APIDiscussion;
}> = ({ discussion }) => {
  /**
   * component states
   */
  const { deleteDiscussionMutateAsync, isDeletingDiscussion } = useDiscussion();
  const {
    globalDiscussionState,
    isEditingDiscussionState,
    showCreateOrEditDiscussionWidgetState,
  } = discussionAtoms;
  const setGlobalDiscussion = useSetRecoilState(globalDiscussionState);
  const setIsEditingDiscussion = useSetRecoilState(isEditingDiscussionState);
  const setShowCreateOrEditDiscussionWidget = useSetRecoilState(
    showCreateOrEditDiscussionWidgetState
  );

  return (
    <section className='px-2 flex gap-2'>
      <Icon
        iconWrapperStyles='flex items-center gap-x-2 px-6 py-3  rounded-xl text-sm w-fit border'
        icon={<HiPencil className='icon text-green-400' />}
        purpose={() => {
          setGlobalDiscussion(discussion);
          setIsEditingDiscussion(true);
          setShowCreateOrEditDiscussionWidget(true);
        }}
      />

      <Icon
        iconWrapperStyles='flex items-center gap-x-2 px-6 py-3  rounded-xl text-sm w-fit border border-red-500'
        icon={
          isDeletingDiscussion ? (
            <SpinnerLoader color='fill-callToAction' size='w-4 h-4' />
          ) : (
            <HiOutlineTrash className='icon text-red-400' />
          )
        }
        purpose={() => deleteDiscussionMutateAsync(discussion?.id)}
      />
    </section>
  );
};

export default DiscussionManagement;
