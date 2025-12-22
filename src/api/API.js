import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getVideos = async () => {
  try {
    const res = await api.get("/videos");
    return { data: res.data, isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const getCommentsByVideo = async (videoId) => {
  try {
    const res = await api.get(
      `/comments?videoId=${videoId}&sort=createdAt&_order=desc`
    );
    // console.log(res.data);
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

export const getVideo = async (id) => {
  try {
    const res = await api.get(`/videos?id=${id}`)
    return { data: res.data, isError: false }
  } catch (error) {
    return { isError: true }
  }
}
api.get("videos?id=v1").then(res => console.log(res.data[0]))
