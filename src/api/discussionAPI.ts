import { DiscussionCommentData, DiscussionData } from '../types/typings.t';
import { API } from './api';

const DiscussionAPI = {
  getDiscussions: async () =>
    API.get('/users/discussions?include=owner,unit,comments.owner'),

  createDiscussion: async (discussionNewData: DiscussionData) =>
    API.post('/users/discussions', discussionNewData),

  updateDiscussion: async (data: {
    discussionId: number;
    discussionUpdateData: DiscussionData;
  }) =>
    API.patch(
      `/users/discussions/${data.discussionId}`,
      data.discussionUpdateData
    ),

  deleteDiscussion: async (discussionId: number) =>
    API.delete(`/users/discussions/${discussionId}`),

  createComment: async (newCommentData: DiscussionCommentData) =>
    API.post('/users/discussions/comments', newCommentData),
};

export default DiscussionAPI;
