import axios from "axios";

export const getVideos = async () => {
  try {
    const res = await axios.get("http://localhost:3000/videos");
    return { data: res.data, isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const getCommentsByVideo = async (videoId) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/comments?videoId=${videoId}&sort=createdAt&_order=desc`
    );
    // console.log(res.data);
    return { data: res.data, isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const postComment = async (body) => {
  try {
    const res = axios.post(`http://localhost:3000/comments`, body);
    return { isError: false, data: res.data };
  } catch (error) {
    return { isError: true };
  }
};
