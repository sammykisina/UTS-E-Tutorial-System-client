import { useRecoilState, useSetRecoilState } from 'recoil';
import { studentAtoms } from '@/atoms';
import { Title, ModalHeader } from '@/components';
import { useNavigate } from 'react-router-dom';

const TutorialResults = () => {
  const [yourChoices, setYourChoicesState] = useRecoilState(
    studentAtoms.yourChoicesState
  );
  const setShowTutorialResultsModal = useSetRecoilState(
    studentAtoms.showTutorialResultsModalState
  );

  const correctAnswers = yourChoices?.filter(
    (yourChoice) =>
      yourChoice?.question?.attributes?.correctAnswer ===
      yourChoice?.answer?.attributes?.identity
  );

  const navigate = useNavigate();

  return (
    <section>
      {/* heading */}
      <ModalHeader
        title={`Your Results: ` + correctAnswers?.length + ` correct answers`}
        close={() => {
          setYourChoicesState([]);
          setShowTutorialResultsModal(false);
          navigate('/results');
        }}
      />

      {/* body */}
      <div className='px-2 mt-2 '>
        <div className='flex items-center gap-2'>
          <Title title='Number of Attempted Questions' />
          <span className='rounded-full w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose text-textColor bg-callToAction/10'>
            {yourChoices.length}
          </span>
        </div>

        {/* qns */}
        <div>
          <Title title='Your Choices' />

          {yourChoices?.map((yourChoice, yourChoiceIndex) => {
            const correctChoice =
              yourChoice?.question?.relationships?.answers?.find(
                (answer) =>
                  answer?.attributes?.identity ===
                  yourChoice?.question?.attributes?.correctAnswer!
              );

            return (
              <div>
                <div className='flex items-center gap-2'>
                  <span>{yourChoiceIndex + 1}.</span>
                  <p>{yourChoice?.question?.attributes?.question}</p>
                </div>

                <div className='ml-5'>
                  <div className='flex items-center gap-2'>
                    <Title title='Your Choice:' />
                    <span>{yourChoice?.answer?.attributes?.answer}</span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Title title='Correct Answer:' />
                    <span>{correctChoice?.attributes?.answer}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TutorialResults;
