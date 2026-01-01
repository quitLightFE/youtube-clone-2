import { Box } from "@mui/material";
import React from "react";
import CommentItem from "./CommentItem";

export default function CommentsContainer({ comments }) {
  return (
    <Box>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}
