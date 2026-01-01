import { Box, Skeleton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsByVideo, postComment } from "../../api/API";
import { USER_ID } from "../../App";
import CommentsContainer from "./CommentsContainer";

const CommentsSkeleton = () => {
  return (
    <Box>
      <Box my={3}>
        <Skeleton width={120} height={32} />
        <Box width="100%">
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Skeleton
              variant="circular"
              width={40}
              sx={{ aspectRatio: 1 }}
              height={"auto"}
            />
            <Skeleton width="100%" variant="rectangular" />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box>
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={(index + 1) * 41}
              display="flex"
              gap={1}
              alignItems={"center"}
            >
              <Skeleton
                variant="circular"
                width={40}
                sx={{ aspectRatio: 1 }}
                height={"auto"}
              />
              <Box width="100%">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default function Comments({ videoId }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByVideo(videoId).then((res) => {
      setComments(res.data);
      setLoading(false);
    }).catch(err => setError(() => {throw err}));
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
      const res = await postComment(newComment).catch((err) =>
        setError(() => {
          throw err;
        })
      );
      setComments((prev) => [res.data, ...prev]);
    },

    [videoId]
  );
  //

  return (
    (!loading && (
      <Box>
        <Box my={3}>
          <Typography fontWeight={"bold"} variant="h6" mb={2}>
            {comments.length} ta fikr
          </Typography>
          <CommentForm onSubmit={handleAddComment} />
        </Box>
        <Box>
          <CommentsContainer comments={comments} />
        </Box>
      </Box>
    )) || <CommentsSkeleton />
  );
}
