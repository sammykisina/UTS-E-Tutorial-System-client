import { atom } from 'recoil';
import { APIDiscussion } from '../types/typings.t';

const showCreateOrEditDiscussionWidgetState = atom({
  key: 'showCreateOrEditDiscussionWidgetState',
  default: false,
});

const isEditingDiscussionState = atom({
  key: 'isEditingDiscussionState',
  default: false,
});

const globalDiscussionState = atom<APIDiscussion | null>({
  key: 'globalDiscussionState',
  default: null,
});

const discussionAtoms = {
  showCreateOrEditDiscussionWidgetState,
  isEditingDiscussionState,
  globalDiscussionState,
};

export default discussionAtoms;
