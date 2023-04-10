import React, { useState } from 'react';
import { studentAtoms, tutorialAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Button,
  CountDown,
  Icon,
  Modal,
  SpinnerLoader,
  TutorialResults,
} from '@/components';
import { APIAnswer, APIQuestion } from '../../../../types/typings.t';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { useAuth, useStudent } from '@/hooks';

const TakeTutorial = () => {
  /**
   * component states
   */
  const {
    showTakeTutorialModalState,
    showTutorialResultsModalState,
    yourChoicesState,
  } = studentAtoms;
  const [showTutorialResultsModal, setShowTutorialResultsModal] =
    useRecoilState(showTutorialResultsModalState);

  const { globalTutorialState } = tutorialAtoms;
  const [globalTutorial, setGlobalTutorial] =
    useRecoilState(globalTutorialState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState<APIAnswer | null>(null);
  const [yourChoices, setYourChoices] = useRecoilState(yourChoicesState);

  const {
    createStudentTutorialResultsMutateAsync,
    isCreatingStudentTutorialResult,
  } = useStudent();

  const { user } = useAuth();

  /**
   * component functions
   */

  const setChoice = (chosenAnswer: APIAnswer, question: APIQuestion) => {
    const questionBeingAnswered = yourChoices?.find(
      (yourChoice) => yourChoice.question?.id === question.id
    );

    // if no qn, thn add it
    if (!questionBeingAnswered) {
      setYourChoices((prev) => {
        return [...prev, { answer: chosenAnswer, question: question }];
      });
    } else {
      // update the answer
      const yourChoicesUpdated = yourChoices?.map((yourChoice) =>
        yourChoice?.question.id === question?.id
          ? { question: yourChoice?.question, answer: chosenAnswer }
          : yourChoice
      );

      setYourChoices(yourChoicesUpdated);
    }

    // console.log('questionBeingAnswered', questionBeingAnswered);
    // console.log('yourChoices', yourChoices);
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
                  setChosenAnswer(answer);
                  setChoice(
                    answer,
                    globalTutorial?.relationships?.questions[
                      currentQuestionIndex
                    ]
                  );
                }}
                className={`cursor-pointer flex items-center hover:bg-callToAction duration-300 ${
                  answer?.id === chosenAnswer?.id && 'bg-callToAction'
                }`}
              >
                {/* number */}
                <span className='bg-callToAction p-2 icon flex justify-center items-center rounded-full text-white'>
                  {answerIndex + 1}
                </span>

                {/* answer */}
                <p className='bg-callToAction/10 rounded-full px-4  py-2'>
                  {answer?.attributes?.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`flex justify-end mt-4`}>
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
                  yourChoices?.filter(
                    (yourChoice) =>
                      yourChoice?.question?.attributes?.correctAnswer ===
                      yourChoice?.answer?.attributes?.identity
                  ).length *
                  parseInt(
                    globalTutorial?.attributes?.numberOfPointsForEachQuestion!
                  ),
                student_id: user?.id!,
                tutorial_id: globalTutorial?.id!,
              });
            } else {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }}
        />
      </div>
    </section>
  );
};

export default TakeTutorial;
