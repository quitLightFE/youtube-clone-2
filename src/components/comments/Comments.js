import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsByVideo, postComment } from "../../api/API";
import CommentItem from "./CommentItem";

const GUEST_ID = "u1";

export default function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [iLoading, setIsLoadind] = useState(true);

  useEffect(() => {
    getCommentsByVideo(videoId).then((res) => {
      // console.table(res.data);
      setComments(res.data);
      setIsLoadind(false);
    });
  }, [videoId]);
  //
  const handleAddComment = useCallback(
    async (text) => {
      const newComment = {
        videoId,
        userId: GUEST_ID,
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
      {
        //commentlar
      }
      <Box>
        <Box>
          {/* {comments.map((comment) => {
            console.log(comment);

            return <CommentItem key={comment.createdAt} comment={comment} />;
          })} */}
          {comments
            .filter((comment) => comment && comment.createdAt)
            .map((comment) => (
              <CommentItem
                key={comment.id ?? comment.createdAt}
                comment={comment}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
}
