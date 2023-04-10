import { atom } from 'recoil';
import { APIAnswer, APIQuestion, StudentData } from '../types/typings.t';

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

const showTutorialResultsModalState = atom({
  key: 'showTutorialResultsModalState',
  default: false,
});

const isEditingStudentState = atom({
  key: 'isEditingStudentState',
  default: false,
});

const globalStudentState = atom<StudentData | null>({
  key: 'globalStudentState',
  default: null,
});

const yourChoicesState = atom<{ question: APIQuestion; answer: APIAnswer }[]>({
  key: 'yourChoicesState',
  default: [],
});

const studentAtoms = {
  showCreateOrEditStudentWidgetState,
  isEditingStudentState,
  globalStudentState,
  showTakeTutorialModalState,
  showTutorialResultsModalState,
  yourChoicesState,
};

export default studentAtoms;
