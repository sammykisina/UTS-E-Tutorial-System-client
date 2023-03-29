import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { appAtoms, studentAtoms, tutorialAtoms } from '@/atoms';
import { AppRouters } from '@/routers';
import {
  Modal,
  Sidebar,
  TakeTutorial,
  TopHeader,
  TutorialQns,
  Widget,
} from '@/components';
import { useAuth } from '@/hooks';
import { Login } from '@/pages';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  /**
   * component states
   */
  const { user } = useAuth();
  const { isSidebarOpenState, showSidebarState } = appAtoms;
  const showSidebar = useRecoilValue(showSidebarState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  const { showTutorialQnsWidgetState } = tutorialAtoms;
  const showTutorialQnsWidget = useRecoilValue(showTutorialQnsWidgetState);

  const { showTakeTutorialModalState } = studentAtoms;
  const showTakeTutorialModal = useRecoilValue(showTakeTutorialModalState);
  const { pathname } = useLocation();

  if (!user && !(pathname === '/email')) return <Login />;

  /**
   * component functions
   */
  return (
    <section className='relative mx-auto flex w-full max-w-[1200px] sm:px-[20px]'>
      <Toaster />

      {/* sidebar */}
      <div
        className={`absolute duration-300 sm:left-0 ${!user && 'hidden'}  ${
          showSidebar ? 'left-0' : '-left-[100%]'
        }`}
      >
        <Sidebar />
      </div>

      <div
        className={`h-screen max-w-[1200px] flex-1 overflow-x-scroll p-2 duration-300 scrollbar-hide ${
          isSidebarOpen && user ? 'sm:ml-[200px]' : !user ? '' : 'sm:ml-24'
        }   `}
      >
        <TopHeader />

        <div className='mt-5 h-[47rem] overflow-y-scroll  scrollbar-hide xs:h-[40rem]'>
          <AppRouters />
        </div>
      </div>

      <Widget
        widgetState={showTutorialQnsWidget}
        component={<TutorialQns />}
        widgetStyles='w-[90vw] h-fit'
      />

      <Modal
        component={<TakeTutorial />}
        modalState={showTakeTutorialModal}
        modalStyles='w-[90vw] h-fit'
      />
    </section>
  );
};

export default Layout;
