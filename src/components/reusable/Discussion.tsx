import { type FC, useState } from 'react';
import {
  Button,
  DiscussionManagement,
  Dropdown,
  Icon,
  SpinnerLoader,
  TabTitle,
} from '@/components';
import {
  HiEllipsisHorizontal,
  HiOutlineChatBubbleOvalLeft,
} from 'react-icons/hi2';
import { useAuth, useDiscussion } from '@/hooks';
import { appUtils } from '@/utils';
import {
  APIComment,
  APIDiscussion,
  DiscussionCommentData,
} from '../../types/typings.t';
import { format } from 'date-fns';
import { useForm, SubmitHandler } from 'react-hook-form';

type DiscussionProps = {
  discussion: APIDiscussion;
};

const Discussion: FC<DiscussionProps> = ({ discussion }) => {
  /**
   * component states
   */
  const [showManageProfileDropdown, setShowManageProfileDropdown] =
    useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiscussionCommentData>();
  const { isCreatingComment, createCommentMutateAsync } = useDiscussion();

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<DiscussionCommentData> = ({ comment }) => {
    createCommentMutateAsync({
      comment,
      discussion_id: discussion?.id!,
      user_id: user?.id,
    });

    reset({
      comment: '',
    });
  };

  const Comment: FC<{ comment: APIComment }> = ({ comment }) => {
    return (
      <section className='py-2'>
        <div className='flex gap-2 items-center'>
          <img
            src={appUtils.generateAvatar(
              comment?.relationships?.owner?.attributes?.name
            )}
            alt=''
            className='h-[3rem] w-[3rem] rounded-full'
          />

          <div className='flex flex-col'>
            <span>{comment?.relationships?.owner?.attributes?.name}</span>
            <span className='text-primary'>
              {format(
                new Date(comment?.attributes?.createdAt),
                'EE, MMM d, yyy'
              )}
            </span>
          </div>
        </div>

        <div className='ml-[3.5rem] text-textColor'>
          <p>{comment?.attributes?.comment}</p>
        </div>
      </section>
    );
  };

  return (
    <section className='flex flex-col gap-[0.05rem]'>
      <section
        className={`${discussion?.attributes?.bgColor} px-2 py-1 rounded-[2rem] w-full gap-2 md:w-[30rem] lg:w-[35rem]`}
      >
        <div className='flex w-full items-center justify-between '>
          <div className='flex gap-3 py-2'>
            <img
              src={appUtils.generateAvatar(
                discussion?.relationships?.owner?.attributes?.name
              )}
              alt=''
              className='h-[3rem] w-[3rem] rounded-full'
            />

            <div className='flex gap-2'>
              <div className='flex flex-col'>
                <span>
                  {discussion?.relationships?.owner?.attributes?.name}
                </span>
                <span className='text-primary'>
                  {format(
                    new Date(discussion?.attributes?.createdAt),
                    'EE, MMM d, yyy'
                  )}
                </span>
              </div>

              <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose text-white'>
                {discussion?.relationships?.unit?.attributes?.name}
              </span>
            </div>
          </div>

          <div
            className={`${
              discussion?.relationships?.owner?.id !== user?.id && 'hidden'
            }`}
          >
            <Dropdown
              inactive={<HiEllipsisHorizontal className='icon' />}
              active={<HiEllipsisHorizontal className='icon' />}
              dropdownComponent={
                <DiscussionManagement discussion={discussion} />
              }
              displayState={showManageProfileDropdown}
              setDisplayState={setShowManageProfileDropdown}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          {/* body */}
          <p className='px-5 text-textColor first-letter:uppercase'>
            {discussion?.attributes?.discussion}
          </p>

          {/* actions */}
          <div className='mb-2 flex items-center py-2 px-1'>
            <div className='flex items-center'>
              <Icon icon={<HiOutlineChatBubbleOvalLeft className='icon' />} />
              <span className='text-white'>
                {discussion?.relationships?.comments?.length}
              </span>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-row items-center px-2 gap-1  flex-1'
            >
              <div className='border border-white pl-1 rounded-full py-2 flex-1'>
                <input
                  type='text'
                  className=' bg-transparent text-textColor placeholder:text-textColor w-full outline-none'
                  placeholder='Lets Talk'
                  {...register('comment', {
                    required: 'Comment is required.',
                  })}
                />
              </div>

              <Button
                title={
                  isCreatingComment ? (
                    <SpinnerLoader color='fill-white' size='w-4 h-4' />
                  ) : (
                    'Comment'
                  )
                }
                type='submit'
                intent='primary'
                fullWidth={false}
              />
            </form>
          </div>
        </div>
      </section>

      <div
        className={`${
          discussion?.attributes?.bgColor
        } px-6 py-1 rounded-[2rem] h-[15rem] pt-2 ${
          discussion?.relationships?.comments?.length === 0 && 'hidden'
        }`}
      >
        <TabTitle title='COMMENTS' titleStyles='text-white' />

        <div className='mt-2 h-[12rem] overflow-y-scroll scrollbar-hide flex flex-col gap-3 divide-y divide-white '>
          {discussion?.relationships?.comments?.map((comment, commentIndex) => (
            <Comment key={commentIndex} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discussion;
