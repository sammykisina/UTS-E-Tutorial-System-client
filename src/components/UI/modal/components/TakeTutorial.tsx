import React, { useState } from 'react';
import { tutorialAtoms } from '@/atoms';
import { useRecoilState } from 'recoil';
import { Button, CountDown, Icon, SpinnerLoader } from '@/components';
import { APIAnswer } from '../../../../types/typings.t';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { useAuth, useStudent } from '@/hooks';

const TakeTutorial = () => {
  /**
   * component states
   */
  const { globalTutorialState } = tutorialAtoms;
  const [globalTutorial, setGlobalTutorial] =
    useRecoilState(globalTutorialState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    localStorage.getItem('currentQuestionIndex')
      ? JSON.parse(localStorage.getItem('currentQuestionIndex')!)
      : 0
  );
  const [chosenAnswer, setChosenAnswer] = useState<APIAnswer | null>(
    JSON.parse(localStorage.getItem('chosenAnswer')!)
  );
  const [results, setResults] = useState(
    localStorage.getItem('results')
      ? JSON.parse(localStorage.getItem('results')!)
      : 0
  );

  const {
    createStudentTutorialResultsMutateAsync,
    isCreatingStudentTutorialResult,
  } = useStudent();

  const { user } = useAuth();

  /**
   * component functions
   */
  const save = () => {
    if (
      localStorage.removeItem('showTakeTutorialModalState') !== undefined ||
      localStorage.removeItem('showTakeTutorialModalState') !== null
    ) {
      createStudentTutorialResultsMutateAsync({
        points:
          results *
          parseInt(globalTutorial?.attributes?.numberOfPointsForEachQuestion!),
        student_id: user?.id!,
        tutorial_id: globalTutorial?.id!,
      });
    }
  };

  return (
    <section className='p-2'>
      {/* time and qns */}
      <div className='flex items-center justify-between'>
        <span className='rounded-full bg-green-400/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
          QN {currentQuestionIndex + 1} of{' '}
          {globalTutorial?.relationships?.questions?.length}
        </span>

        <div className='flex items-center gap-3'>
          <span>
            You have {globalTutorial?.attributes?.timeToTakeInTutorial} mins
          </span>

          <CountDown
            time={
              parseInt(globalTutorial?.attributes?.timeToTakeInTutorial!) * 60
            }
            save={save}
          />
        </div>
      </div>

      {/* qn  and answers*/}
      {globalTutorial?.relationships?.questions?.length! > 0 && (
        <div className='mt-2'>
          <p className='font-bold ml-2'>
            {
              globalTutorial?.relationships?.questions[currentQuestionIndex]
                .attributes?.question
            }
          </p>

          <div className='flex flex-col gap-3 mt-4'>
            {globalTutorial?.relationships?.questions[
              currentQuestionIndex
            ].relationships?.answers.map((answer, answerIndex) => (
              <div
                key={answerIndex}
                onClick={() => {
                  if (!chosenAnswer) {
                    setChosenAnswer(answer);
                    localStorage.setItem(
                      'chosenAnswer',
                      JSON.stringify(answer)
                    );
                  }

                  if (
                    answer?.attributes?.identity ===
                    globalTutorial?.relationships?.questions[
                      currentQuestionIndex
                    ].attributes?.correctAnswer
                  ) {
                    setResults(results + 1);
                    localStorage.setItem(
                      'results',
                      JSON.stringify(results + 1)
                    );
                  }
                }}
                className={`cursor-pointer flex items-center hover:bg-callToAction duration-300 ${
                  answer?.attributes?.identity ===
                    chosenAnswer?.attributes?.identity && 'bg-callToAction'
                }`}
              >
                <span className='bg-callToAction p-2 icon flex justify-center items-center rounded-full text-white'>
                  {chosenAnswer ? (
                    globalTutorial?.relationships?.questions[
                      currentQuestionIndex
                    ].attributes?.correctAnswer ===
                    answer?.attributes?.identity ? (
                      <Icon icon={<IoCheckmarkDoneSharp />} />
                    ) : (
                      answerIndex + 1
                    )
                  ) : (
                    answerIndex + 1
                  )}
                </span>

                <p
                  key={answerIndex}
                  className='bg-callToAction/10 rounded-full px-4  py-2'
                >
                  {answer?.attributes?.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`flex justify-end mt-4 ${chosenAnswer ? 'block' : 'hidden'}`}
      >
        <Button
          title={
            globalTutorial?.relationships?.questions.length ===
            currentQuestionIndex + 1 ? (
              isCreatingStudentTutorialResult ? (
                <SpinnerLoader color='fill-white' />
              ) : (
                'End'
              )
            ) : (
              'Next'
            )
          }
          type='submit'
          intent='primary'
          fullWidth={false}
          purpose={() => {
            if (
              globalTutorial?.relationships?.questions.length ===
              currentQuestionIndex + 1
            ) {
              createStudentTutorialResultsMutateAsync({
                points:
                  results *
                  parseInt(
                    globalTutorial?.attributes?.numberOfPointsForEachQuestion!
                  ),
                student_id: user?.id!,
                tutorial_id: globalTutorial?.id!,
              });
            } else {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setChosenAnswer(null);
              localStorage.setItem(
                'currentQuestionIndex',
                JSON.stringify(currentQuestionIndex + 1)
              );
            }

            localStorage.removeItem('chosenAnswer');
          }}
        />
      </div>
    </section>
  );
};

export default TakeTutorial;
