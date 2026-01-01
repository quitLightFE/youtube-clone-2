import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

//Videos Api
export const getVideos = async () => {
  try {
    const res = await api.get("/videos");
    return { data: res.data, isError: null };
  } catch (error) {
    return { isError: error.message };
  }
};

export const getVideo = async (id) => {
  try {
    const res = await api.get(`/videos?id=${id}`);
    return { data: res.data, isError: false };
  } catch (error) {
    return { isError: true };
  }
};

//Comments Api
export const getCommentsByVideo = async (videoId) => {
  try {
    const res = await api.get(
      `/comments?videoId=${videoId}&sort=createdAt&_order=desc`
    );
    return { data: res.data, isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const postComment = async (body) => {
  try {
    const res = await api.post(`/comments`, body);
    return { isError: false, data: res.data };
  } catch (error) {
    return { isError: true };
  }
};

// LIKES Api
export const getLikesByVideo = (videoId) =>
  api.get(`/likes?videoId=${videoId}`);
export const likeVideo = (videoId, userId) =>
  api.post("/likes", { videoId, userId });
export const unLikeVideo = (id) => api.delete(`/likes/${id}`);

export const getChannelName = (chId) => api.get(`/channels?id=${chId}`);

export const getSubscriptionsByChannel = (channelId) =>
  api.get(`/subscriptions?channelId=${channelId}`);
export const getMySubscription = (channelId, userId) =>
  api.get(`/subscriptions?userId=${userId}&channelId=${channelId}`);

export const subscribe = (channelId, userId) =>
  api.post("/subscriptions", { channelId, userId });
export const unSubscribe = (id) => api.delete(`/subscriptions/${id}`);

// Subscriptions Section
export const getSubscribedChannels = (userId) =>
  api.get(`/subscriptions?userId=${userId}`);

export const getChannelsByIds = (ids) =>
  Promise.all(ids.map((id) => api.get(`/channels/${id}`)));
