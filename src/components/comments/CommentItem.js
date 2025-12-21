import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { TimeAgoDistance } from "../VideoContainer";

export default function CommentItem({ comment }) {
  if (!comment) return null;

  const userId = comment.userId ?? "u1";
  return (
    <Box display={"flex"} gap={1}>
      <Avatar>{userId[0].toUpperCase()}</Avatar>
      <Box>
        <Typography>
          @{userId} {<TimeAgoDistance date={comment.createdAt} />}
        </Typography>
        <Typography variant="p">{comment.text}</Typography>
      </Box>
    </Box>
  );
}
