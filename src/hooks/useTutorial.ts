import { tutorialAtoms } from '@/atoms';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APITutorial, QN, TutorialData } from '../types/typings.t';
import { TutorialAPI } from '@/api';
import { Toasts } from '@/components';
import useAuth from './useAuth';

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
  const { user } = useAuth();

  /**
   * component functions
   */
  const { data: tutorials, isLoading: isFetchingTutorials } = useQuery({
    queryKey: ['tutorials', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'student') {
        return (await TutorialAPI.getTutorials()) as APITutorial[];
      }

      return [];
    },
  });

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
    mutateAsync: deleteTutorialMutateAsync,
    isLoading: isDeletingTutorial,
  } = useMutation({
    mutationFn: (tutorialId: number) => {
      return TutorialAPI.deleteTutorial(tutorialId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['lecturerProfile'] });
      setGlobalTutorial(null);
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
    isDeletingTutorial,
    deleteTutorialMutateAsync,
    isFetchingTutorials,
    tutorials,
  };
};

export default useTutorial;
