import { QN, TutorialData } from '../types/typings.t';
import { API } from './api';

const TutorialAPI = {
  getTutorials: async () =>
    API.get('/student/tutorials?include=unit,questions.answers'),

  createTutorial: async (tutorialNewData: TutorialData) =>
    API.post('/lecturer/tutorials', tutorialNewData),

  updateTutorial: async (data: {
    tutorialId: number;
    tutorialUpdateData: TutorialData;
  }) =>
    API.patch(
      `/lecturer/tutorials/${data.tutorialId}`,
      data.tutorialUpdateData
    ),

  deleteTutorial: async (tutorialId: number) =>
    API.delete(`/lecturer/tutorials/${tutorialId}`),

  createTutorialQuestion: async (data: QN) =>
    API.post('/lecturer/tutorials/questions', data),

  updateTutorialQuestion: async (data: {
    tutorialQnId: number;
    tutorialQnUpdateData: QN;
  }) =>
    API.patch(
      `/lecturer/tutorials/questions/${data.tutorialQnId}`,
      data.tutorialQnUpdateData
    ),

  deleteTutorialQuestion: async (tutorialQnId: number) =>
    API.delete(`/lecturer/tutorials/questions/${tutorialQnId}`),
};

export default TutorialAPI;
