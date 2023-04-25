import { atom } from 'recoil';
import { APIQuestion, APITutorial } from '../types/typings.t';

const showCreateOrEditTutorialWidgetState = atom({
  key: 'showCreateOrEditTutorialWidgetState',
  default: false,
});

const showTutorialQnsWidgetState = atom({
  key: 'showTutorialQnsWidgetState',
  default: false,
});

const showCreateOrEditTutorialQnWidgetState = atom({
  key: 'showCreateOrEditTutorialQnWidgetState',
  default: false,
});

const isEditingTutorialQnState = atom({
  key: 'isEditingTutorialQnState',
  default: false,
});

const isEditingTutorialState = atom({
  key: 'isEditingTutorialState',
  default: false,
});

const globalTutorialState = atom<APITutorial | null>({
  key: 'globalTutorialState',
  default: localStorage.getItem('globalTutorial')
    ? JSON.parse(localStorage.getItem('globalTutorial')!)
    : null,
});

const globalTutorialQNState = atom<null | APIQuestion>({
  key: 'globalTutorialQNState',
  default: null,
});

const tutorialAtoms = {
  showCreateOrEditTutorialWidgetState,
  isEditingTutorialState,
  globalTutorialState,
  showTutorialQnsWidgetState,
  isEditingTutorialQnState,
  showCreateOrEditTutorialQnWidgetState,
  globalTutorialQNState,
};

export default tutorialAtoms;
