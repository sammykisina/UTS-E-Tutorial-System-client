import { QN, TutorialData } from '../types/typings.t';
import { API } from './api';

const TutorialAPI = {
  createTutorial: async (tutorialNewData: TutorialData) =>
    API.post('/lecturer/tutorials', tutorialNewData),

  updateTutorial: async (data: {
    tutorialId: number;
    tutorialUpdateData: TutorialData;
  }) => API.patch(``, data.tutorialUpdateData),

  createTutorialQuestion: async (data: QN) =>
    API.post('/lecturer/tutorials/questions', data),

  updateTutorialQuestion: async (data: {
    tutorialQnId: number;
    tutorialQnUpdateData: QN;
  }) => API.patch(``, data),
};

export default TutorialAPI;
