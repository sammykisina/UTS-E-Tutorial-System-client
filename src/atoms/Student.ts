import { atom } from 'recoil';
import { StudentData } from '../types/typings.t';

const showCreateOrEditStudentWidgetState = atom({
  key: 'showCreateOrEditStudentWidgetState',
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

const studentAtoms = {
  showCreateOrEditStudentWidgetState,
  isEditingStudentState,
  globalStudentState,
};

export default studentAtoms;
