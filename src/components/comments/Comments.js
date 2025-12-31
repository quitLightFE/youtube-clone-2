import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsByVideo, postComment } from "../../api/API";
import CommentItem from "./CommentItem";
import { USER_ID } from "../../App";

export default function Comments({ videoId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByVideo(videoId).then((res) => {
      setComments(res.data);
    });
  }, []);
  //
  const handleAddComment = useCallback(
    async (text) => {
      const newComment = {
        videoId,
        userId: USER_ID,
        text,
        createdAt: new Date().toISOString(),
      };
      const res = await postComment(newComment);
      setComments((prev) => [res.data, ...prev]);
    },

    [videoId]
  );
  //

  return (
    <Box>
      <Box my={3}>
        <Typography fontWeight={"bold"} variant="h6" mb={2}>
          {comments.length} ta fikr
        </Typography>
        <CommentForm onSubmit={handleAddComment} />
      </Box>
      <Box>
        <Box>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
