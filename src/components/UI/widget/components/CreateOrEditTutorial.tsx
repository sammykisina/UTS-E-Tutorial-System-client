import {
  Button,
  Error,
  Select,
  SpinnerLoader,
  Toasts,
  WidgetHeader,
} from '@/components';
import { tutorialAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth, useSchool, useTutorial } from '@/hooks';
import { SelectionOption, TutorialData } from '../../../../types/typings.t';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import {
  T_Image_1,
  T_Image_2,
  T_Image_3,
  T_Image_4,
  T_Image_5,
  T_Image_6,
} from '@/assets';
import { appUtils } from '@/utils';

const CreateOrEditTutorial = () => {
  /**
   * component states
   */
  const {
    globalTutorialState,
    isEditingTutorialState,
    showCreateOrEditTutorialWidgetState,
  } = tutorialAtoms;
  const [globalTutorial, setGlobalTutorial] =
    useRecoilState(globalTutorialState);
  const [isEditingTutorial, setIsEditingTutorial] = useRecoilState(
    isEditingTutorialState
  );
  const setShowCreateOrEditTutorialWidget = useSetRecoilState(
    showCreateOrEditTutorialWidgetState
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TutorialData>();
  const [selectedUnit, setSelectedUnit] = useState<SelectionOption>({
    name: 'Select the course the tutorial is for.',
    value: '',
  });

  const { lecturerProfile, user } = useAuth();
  const { generateUnitOptions } = useSchool();
  const images = [
    T_Image_1,
    T_Image_2,
    T_Image_3,
    T_Image_4,
    T_Image_5,
    T_Image_6,
  ];
  const bgColors = [
    'bg-amber-500',
    'bg-orange-500',
    'bg-lime-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
  ];
  const {
    createTutorialMutateAsync,
    isCreatingTutorial,
    isUpdatingTutorial,
    updateTutorialMutateAsync,
  } = useTutorial();

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<TutorialData> = ({
    description,
    numberOfQuestions,
    numberOfValidDays,
    numberOfPointsForEachQuestion,
    timeToTakeInTutorial,
  }) => {
    if (selectedUnit.value === '') {
      Toasts.errorToast('Select the course for which this tutorial is for.');
      return;
    }

    isEditingTutorial
      ? updateTutorialMutateAsync({
          tutorialId: globalTutorial?.id!,
          tutorialUpdateData: {
            description,
            icon: globalTutorial?.attributes?.icon!,
            numberOfQuestions,
            numberOfValidDays,
            unit_id: selectedUnit.value,
            numberOfPointsForEachQuestion,
            timeToTakeInTutorial,
            bgColor: globalTutorial?.attributes?.bgColor!,
          },
        })
      : createTutorialMutateAsync({
          description,
          icon: appUtils.getRandom(images),
          numberOfQuestions,
          numberOfValidDays,
          unit_id: selectedUnit.value,
          numberOfPointsForEachQuestion,
          timeToTakeInTutorial,
          lecturer_id: user?.id!,
          bgColor: appUtils.getRandom(bgColors),
          code: appUtils.generateTutorialCode(),
        });
  };

  useEffect(() => {
    if (isEditingTutorial && globalTutorial) {
      reset({
        description: globalTutorial?.attributes?.description,
        numberOfQuestions: globalTutorial?.attributes?.numberOfQuestions,
        numberOfPointsForEachQuestion:
          globalTutorial?.attributes?.numberOfPointsForEachQuestion,
        numberOfValidDays: globalTutorial?.attributes?.numberOfValidDays,
        timeToTakeInTutorial: globalTutorial?.attributes?.timeToTakeInTutorial,
      });

      setSelectedUnit({
        name: globalTutorial?.relationships?.unit?.attributes?.name,
        value: globalTutorial?.relationships?.unit?.id,
      });
    }
  }, [reset, isEditingTutorial, globalTutorial]);

  return (
    <section>
      <WidgetHeader
        close={() => {
          setIsEditingTutorial(false);
          setGlobalTutorial(null);
          setShowCreateOrEditTutorialWidget(false);
        }}
        title={!isEditingTutorial ? 'CREATE TUTORIAL' : 'EDIT TUTORIAL'}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 px-2 mt-3'
      >
        <section className='flex flex-col gap-6 px-2'>
          <div className='flex flex-col gap-y-5 rounded-md border py-4 px-2'>
            <div className='relative'>
              <input
                type='text'
                className='input peer'
                placeholder='Tutorial Description'
                {...register('description', {
                  required: 'Tutorial description is required.',
                })}
              />
              <label className='inputLabel'>Tutorial Description</label>

              {errors['description'] && (
                <ErrorMessage
                  errors={errors}
                  name='description'
                  render={({ message }) => <Error errorMessage={message} />}
                />
              )}
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-textColor/50'>Course</span>
              <Select
                multiple={false}
                options={generateUnitOptions(
                  lecturerProfile?.relationships?.units
                )}
                selectWrapperStyles='border  rounded-[0.9rem] py-1 w-[18rem] xs:w-[26rem]'
                selectPanelStyles='max-h-[6rem] bg-white border border-dark shadow-md'
                selected={selectedUnit}
                setSelected={setSelectedUnit}
              />
            </div>

            <div className='relative'>
              <input
                type='number'
                className='input peer'
                placeholder='Total time to answer questions. (mins)'
                {...register('timeToTakeInTutorial', {
                  required:
                    'Enter total time to take when answering questions.',
                })}
              />
              <label className='inputLabel'>
                Total time to answer questions. (mins)
              </label>

              {errors['timeToTakeInTutorial'] && (
                <ErrorMessage
                  errors={errors}
                  name='timeToTakeInTutorial'
                  render={({ message }) => <Error errorMessage={message} />}
                />
              )}
            </div>
          </div>

          <div className='flex flex-col gap-y-5 rounded-md border py-4 px-2'>
            <div className='relative'>
              <input
                type='number'
                className='input peer'
                placeholder='Number Of Questions.'
                {...register('numberOfQuestions', {
                  required: 'Tutorial description is required.',
                })}
              />
              <label className='inputLabel'>Number Of Questions.</label>

              {errors['numberOfQuestions'] && (
                <ErrorMessage
                  errors={errors}
                  name='numberOfQuestions'
                  render={({ message }) => <Error errorMessage={message} />}
                />
              )}
            </div>

            <div className='relative'>
              <input
                type='number'
                className='input peer'
                placeholder='Number of Points.'
                {...register('numberOfPointsForEachQuestion', {
                  required: 'enter number of points for each question.',
                })}
              />
              <label className='inputLabel'>Number of Points.</label>

              {errors['numberOfPointsForEachQuestion'] && (
                <ErrorMessage
                  errors={errors}
                  name='numberOfPointsForEachQuestion'
                  render={({ message }) => <Error errorMessage={message} />}
                />
              )}
            </div>

            <div className='relative'>
              <input
                type='number'
                className='input peer'
                placeholder='Number Of Days To Invalid Questions.'
                {...register('numberOfValidDays', {
                  required: 'Tutorial description is required.',
                })}
              />
              <label className='inputLabel'>
                Number Of Days To Invalid Questions.
              </label>

              {errors['numberOfValidDays'] && (
                <ErrorMessage
                  errors={errors}
                  name='numberOfValidDays'
                  render={({ message }) => <Error errorMessage={message} />}
                />
              )}
            </div>
          </div>
        </section>

        <div className='flex justify-end'>
          <Button
            title={
              isEditingTutorial ? (
                isUpdatingTutorial ? (
                  <SpinnerLoader color='fill-white' />
                ) : (
                  'EDIT'
                )
              ) : isCreatingTutorial ? (
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

export default CreateOrEditTutorial;
