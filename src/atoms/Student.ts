import { atom } from 'recoil';
import { StudentData } from '../types/typings.t';

const showCreateOrEditStudentWidgetState = atom({
  key: 'showCreateOrEditStudentWidgetState',
  default: false,
});

const showTakeTutorialModalState = atom({
  key: 'showTakeTutorialModalState',
  default: localStorage.getItem('showTakeTutorialModalState')
    ? localStorage.getItem('showTakeTutorialModalState') === 'open'
      ? true
      : false
    : false,
});

const isEditingStudentState = atom({
  key: 'isEditingStudentState',
  default: false,
});

const globalStudentState = atom<StudentData | null>({
  key: 'globalStudentState',
  default: null,
});

const studentAtoms = {
  showCreateOrEditStudentWidgetState,
  isEditingStudentState,
  globalStudentState,
  showTakeTutorialModalState,
};

export default studentAtoms;
