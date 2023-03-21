import {
  AllDiscussions,
  Button,
  CreateOrEditDiscussion,
  MyDiscussions,
  Tab,
  TabTitle,
  Title,
  Widget,
} from '@/components';
import { discussionAtoms } from '@/atoms';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { IoChatbubbleOutline, IoChatbubblesOutline } from 'react-icons/io5';

const Forum = () => {
  /**
   * page states
   */
  const { showCreateOrEditDiscussionWidgetState } = discussionAtoms;
  const [
    showCreateOrEditDiscussionWidget,
    setShowCreateOrEditDiscussionWidget,
  ] = useRecoilState(showCreateOrEditDiscussionWidgetState);

  const [index, setIndex] = useState(0);
  const forumTabs = [
    {
      label: 'All Discussions',
      content: <AllDiscussions />,
      icon: <IoChatbubblesOutline className='icon' />,
    },
    {
      label: 'My Discussions',
      content: <MyDiscussions />,
      icon: <IoChatbubbleOutline className='icon' />,
    },
  ];

  /**
   * page functions
   */
  return (
    <section className='flex flex-col gap-4 h-full xs:h-[38rem] lg:h-[38rem]'>
      {/* title */}
      <div className='flex gap-2 bg-callToAction/5 py-2 px-2'>
        <TabTitle title='LETS DISCUSS,  LETS TALK.' />
      </div>

      {/*  */}
      <div className='md:flex justify-center'>
        <div className='flex items-center justify-between md:w-[30rem] lg:w-[35rem] border py-2 px-2 rounded-md'>
          {/* title */}
          <Title title='Discussions' />

          <Button
            title='CREATE A DISCUSSION'
            type='button'
            intent='primary'
            fullWidth={false}
            purpose={() => setShowCreateOrEditDiscussionWidget(true)}
          />
        </div>
      </div>

      {/* discussions */}
      <div className='mt-5 h-[40rem]  overflow-y-scroll scrollbar-hide '>
        <Tab
          tabsData={forumTabs}
          tabsBodyStyles='lg:grid grid-cols-6 duration-300'
          index={index}
          iconsOnlyTabs
          setIndex={setIndex}
          iconsOnlyTabsStyles='flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1 text-indigo-500'
          tabsContentHeight='mt-[1rem] py-2 lg:mt-0 scrollbar-hide '
        />
      </div>

      <Widget
        widgetState={showCreateOrEditDiscussionWidget}
        component={<CreateOrEditDiscussion />}
        widgetStyles='w-[90vw] h-fit'
      />
    </section>
  );
};

export default Forum;
