import { tutorialAtoms } from '@/atoms';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QN, TutorialData } from '../types/typings.t';
import { TutorialAPI } from '@/api';
import { Toasts } from '@/components';

const useTutorial = () => {
  /**
   * component states
   */
  const queryClient = useQueryClient();
  const {
    globalTutorialState,
    isEditingTutorialState,
    showCreateOrEditTutorialWidgetState,
    showCreateOrEditTutorialQnWidgetState,
    globalTutorialQNState,
    isEditingTutorialQnState,
  } = tutorialAtoms;
  const setShowCreateOrEditTutorialWidget = useSetRecoilState(
    showCreateOrEditTutorialWidgetState
  );
  const setShowCreateOrEditTutorialQnWidget = useSetRecoilState(
    showCreateOrEditTutorialQnWidgetState
  );
  const setGlobalTutorial = useSetRecoilState(globalTutorialState);
  const setIsEditingTutorial = useSetRecoilState(isEditingTutorialState);
  const setGlobalTutorialQn = useSetRecoilState(globalTutorialQNState);
  const setIsEditingTutorialQn = useSetRecoilState(isEditingTutorialQnState);

  /**
   * component functions
   */

  const {
    mutateAsync: createTutorialMutateAsync,
    isLoading: isCreatingTutorial,
  } = useMutation({
    mutationFn: (tutorialNewData: TutorialData) => {
      return TutorialAPI.createTutorial(tutorialNewData);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['lecturerProfile'] });
      setShowCreateOrEditTutorialWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: updateTutorialMutateAsync,
    isLoading: isUpdatingTutorial,
  } = useMutation({
    mutationFn: (data: {
      tutorialId: number;
      tutorialUpdateData: TutorialData;
    }) => {
      return TutorialAPI.updateTutorial(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['lecturerProfile'] });
      setIsEditingTutorial(false);
      setGlobalTutorial(null);
      setShowCreateOrEditTutorialWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: createTutorialQnMutateAsync,
    isLoading: isCreatingTutorialQn,
  } = useMutation({
    mutationFn: (data: QN) => {
      return TutorialAPI.createTutorialQuestion(data);
    },

    onSuccess: async (data) => {
      setGlobalTutorial(data.tutorial);
      setShowCreateOrEditTutorialQnWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: updateTutorialQnMutateAsync,
    isLoading: isUpdatingTutorialQn,
  } = useMutation({
    mutationFn: (data: { tutorialQnId: number; tutorialQnUpdateData: QN }) => {
      return TutorialAPI.updateTutorialQuestion(data);
    },

    onSuccess: async (data) => {
      setGlobalTutorial(data.tutorial);
      setIsEditingTutorialQn(false);
      setGlobalTutorialQn(null);
      setShowCreateOrEditTutorialQnWidget(false);
      Toasts.successToast(data.message);
    },
  });

  return {
    createTutorialMutateAsync,
    isCreatingTutorial,
    updateTutorialMutateAsync,
    isUpdatingTutorial,
    createTutorialQnMutateAsync,
    isCreatingTutorialQn,
    updateTutorialQnMutateAsync,
    isUpdatingTutorialQn,
  };
};

export default useTutorial;
