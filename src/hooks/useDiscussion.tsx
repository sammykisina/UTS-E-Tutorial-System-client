import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  APIDiscussion,
  DiscussionCommentData,
  DiscussionData,
} from '../types/typings.t';
import { DiscussionAPI } from '@/api';
import discussionAtoms from '../atoms/Discussion';
import { useSetRecoilState } from 'recoil';
import { Toasts } from '@/components';
import { useAuth } from '@/hooks';

const useDiscussion = () => {
  /**
   * hook states
   */
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    globalDiscussionState,
    isEditingDiscussionState,
    showCreateOrEditDiscussionWidgetState,
  } = discussionAtoms;
  const setShowCreateOrEditDiscussionWidget = useSetRecoilState(
    showCreateOrEditDiscussionWidgetState
  );
  const setGlobalDiscussion = useSetRecoilState(globalDiscussionState);
  const setIsEditingDiscussion = useSetRecoilState(isEditingDiscussionState);

  /**
   * hook functions
   */
  const { data: discussions, isLoading: isFetchingDiscussions } = useQuery({
    queryKey: ['discussions', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin' || role === 'student' || role === 'lecturer') {
        return (await DiscussionAPI.getDiscussions()) as APIDiscussion[];
      }

      return [];
    },
  });

  const {
    mutateAsync: createDiscussionMutateAsync,
    isLoading: isCreatingDiscussion,
  } = useMutation({
    mutationFn: (discussionNewData: DiscussionData) => {
      return DiscussionAPI.createDiscussion(discussionNewData);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      setShowCreateOrEditDiscussionWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: updateDiscussionMutateAsync,
    isLoading: isUpdatingDiscussion,
  } = useMutation({
    mutationFn: (data: {
      discussionId: number;
      discussionUpdateData: DiscussionData;
    }) => {
      return DiscussionAPI.updateDiscussion(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });

      setIsEditingDiscussion(false);
      setGlobalDiscussion(null);
      setShowCreateOrEditDiscussionWidget(false);
      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: createCommentMutateAsync,
    isLoading: isCreatingComment,
  } = useMutation({
    mutationFn: (data: DiscussionCommentData) => {
      return DiscussionAPI.createComment(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });

      Toasts.successToast(data.message);
    },
  });

  const {
    mutateAsync: deleteDiscussionMutateAsync,
    isLoading: isDeletingDiscussion,
  } = useMutation({
    mutationFn: (discussionId: number) => {
      return DiscussionAPI.deleteDiscussion(discussionId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });

      Toasts.successToast(data.message);
    },
  });

  return {
    isCreatingDiscussion,
    updateDiscussionMutateAsync,
    isUpdatingDiscussion,
    createDiscussionMutateAsync,
    discussions,
    isFetchingDiscussions,
    deleteDiscussionMutateAsync,
    isDeletingDiscussion,
    createCommentMutateAsync,
    isCreatingComment,
  };
};

export default useDiscussion;
