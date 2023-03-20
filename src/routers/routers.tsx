import {
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiUserGroup,
  HiOutlineUserGroup,
  HiOutlineTicket,
  HiTicket,
  HiOutlineAcademicCap,
  HiAcademicCap,
  HiOutlineChatBubbleLeftRight,
  HiChatBubbleLeftRight,
  HiOutlineBookmark,
  HiBookmark,
  HiDocumentArrowUp,
  HiOutlineDocumentArrowUp,
} from 'react-icons/hi2';

const adminRoutes = [
  {
    name: 'Dashboard',
    inactiveIcon: <HiOutlineSquares2X2 className='icon' />,
    activeIcon: <HiSquares2X2 className='icon' />,
    to: '/',
  },
  {
    name: 'School',
    inactiveIcon: <HiOutlineAcademicCap className='icon' />,
    activeIcon: <HiAcademicCap className='icon' />,
    to: '/school',
  },
  {
    name: 'Students',
    inactiveIcon: <HiOutlineUserGroup className='icon' />,
    activeIcon: <HiUserGroup className='icon' />,
    to: '/students',
  },
  {
    name: 'Feedback',
    inactiveIcon: <HiOutlineChatBubbleLeftRight className='icon' />,
    activeIcon: <HiChatBubbleLeftRight className='icon' />,
    to: '/feedback',
  },
];

const lecturerRoutes = [
  {
    name: 'Tutorials',
    inactiveIcon: <HiOutlineBookmark className='icon' />,
    activeIcon: <HiBookmark className='icon' />,
    to: '/',
  },
  {
    name: 'Ranking',
    inactiveIcon: <HiOutlineDocumentArrowUp className='icon' />,
    activeIcon: <HiDocumentArrowUp className='icon' />,
    to: '/ranking',
  },
  {
    name: 'Forum',
    inactiveIcon: <HiOutlineUserGroup className='icon' />,
    activeIcon: <HiUserGroup className='icon' />,
    to: '/forum',
  },
];

const studentRoutes = [
  {
    name: 'Tutorials',
    inactiveIcon: <HiOutlineBookmark className='icon' />,
    activeIcon: <HiBookmark className='icon' />,
    to: '/',
  },
  {
    name: 'Results',
    inactiveIcon: <HiOutlineDocumentArrowUp className='icon' />,
    activeIcon: <HiDocumentArrowUp className='icon' />,
    to: '/results',
  },
  {
    name: 'Forum',
    inactiveIcon: <HiOutlineUserGroup className='icon' />,
    activeIcon: <HiUserGroup className='icon' />,
    to: '/forum',
  },
];

const routes = { adminRoutes, lecturerRoutes, studentRoutes };

export default routes;
