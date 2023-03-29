import {
  Button,
  Error,
  Select,
  SpinnerLoader,
  Toasts,
  WidgetHeader,
} from '@/components';
import { discussionAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DiscussionData } from '../../../../types/typings.t';
import { ErrorMessage } from '@hookform/error-message';
import { useAuth, useDiscussion, useSchool } from '@/hooks';
import { useEffect, useState } from 'react';
import { appUtils } from '@/utils';

const CreateOrEditDiscussion = () => {
  /**
   * component states
   */
  const {
    globalDiscussionState,
    isEditingDiscussionState,
    showCreateOrEditDiscussionWidgetState,
  } = discussionAtoms;
  const [globalDiscussion, setGlobalDiscussion] = useRecoilState(
    globalDiscussionState
  );
  const [isEditingDiscussion, setIsEditingDiscussion] = useRecoilState(
    isEditingDiscussionState
  );
  const setShowCreateOrEditDiscussionWidget = useSetRecoilState(
    showCreateOrEditDiscussionWidgetState
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiscussionData>();
  const {
    createDiscussionMutateAsync,
    isCreatingDiscussion,
    isUpdatingDiscussion,
    updateDiscussionMutateAsync,
  } = useDiscussion();
  const { units, generateUnitOptions } = useSchool();
  const [selectedUnit, setSelectedUnit] = useState({
    name: 'Select a unit this discussion is for.',
    value: '',
  });
  const { user } = useAuth();
  const bgColors = [
    'bg-amber-500',
    'bg-orange-500',
    'bg-lime-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
  ];

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<DiscussionData> = ({ discussion }) => {
    if (selectedUnit.value === '') {
      Toasts.errorToast('Select a course for this discussion.');
      return;
    }

    isEditingDiscussion
      ? updateDiscussionMutateAsync({
          discussionId: globalDiscussion?.id!,
          discussionUpdateData: {
            discussion,
            unit_id: selectedUnit?.value,
          },
        })
      : createDiscussionMutateAsync({
          discussion,
          unit_id: selectedUnit?.value,
          user_id: user?.id!,
          bgColor: appUtils.getRandom(bgColors),
        });
  };

  useEffect(() => {
    if (isEditingDiscussion && globalDiscussion) {
      reset({
        discussion: globalDiscussion?.attributes?.discussion,
      });

      setSelectedUnit({
        name: globalDiscussion?.relationships?.unit?.attributes?.name,
        value: globalDiscussion?.relationships?.unit?.id,
      });
    }
  }, [reset, isEditingDiscussion, globalDiscussion]);

  return (
    <section>
      <WidgetHeader
        close={() => {
          setIsEditingDiscussion(false);
          setGlobalDiscussion(null);
          setShowCreateOrEditDiscussionWidget(false);
        }}
        title={!isEditingDiscussion ? 'CREATE DISCUSSION' : 'EDIT DISCUSSION'}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 px-2 mt-3'
      >
        <div className='flex flex-col gap-y-5 rounded-md border py-4 px-2'>
          <div className='relative'>
            <textarea
              cols={2}
              className='input peer'
              placeholder='Discussion'
              {...register('discussion', {
                required: 'Enter what you what to discuss about.',
              })}
            />
            <label className='inputLabel'>Discussion</label>

            {errors['discussion'] && (
              <ErrorMessage
                errors={errors}
                name='discussion'
                render={({ message }) => <Error errorMessage={message} />}
              />
            )}
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-textColor/50'>Course</span>
            <Select
              multiple={false}
              options={generateUnitOptions(units)}
              selectWrapperStyles='border  rounded-[0.9rem] py-1 w-[18rem] xs:w-[26rem]'
              selectPanelStyles='max-h-[6rem] bg-white border border-dark shadow-md'
              selected={selectedUnit}
              setSelected={setSelectedUnit}
            />
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            title={
              isEditingDiscussion ? (
                isUpdatingDiscussion ? (
                  <SpinnerLoader color='fill-white' />
                ) : (
                  'EDIT'
                )
              ) : isCreatingDiscussion ? (
                <SpinnerLoader color='fill-white' />
              ) : (
                'CREATE'
              )
            }
            type='submit'
            intent='primary'
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditDiscussion;
