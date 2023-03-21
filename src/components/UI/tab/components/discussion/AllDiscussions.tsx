import { useDiscussion } from '@/hooks';
import { SpinnerLoader, Discussion } from '@/components';

const AllDiscussions = () => {
  /**
   * component states
   */
  const { discussions, isFetchingDiscussions } = useDiscussion();

  /**
   * component functions
   */
  return (
    <section className='flex flex-col'>
      {isFetchingDiscussions ? (
        <div className=' border h-[15rem] flex justify-center items-center rounded-[2rem]'>
          <SpinnerLoader color='fill-callToAction' size='w-4 h-4' />
        </div>
      ) : discussions?.length! > 0 ? (
        <div className='h-[32rem] xs:h-[23rem] lg:h-[27.5rem] overflow-y-scroll scrollbar-hide py-2 flex flex-col gap-2'>
          {discussions?.map((discussion, discussionIndex) => (
            <Discussion key={discussionIndex} discussion={discussion} />
          ))}
        </div>
      ) : (
        <div className=' border h-[15rem] flex justify-center items-center rounded-[2rem]'>
          No Discussions found.
        </div>
      )}
    </section>
  );
};

export default AllDiscussions;
