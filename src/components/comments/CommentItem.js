import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { TimeAgoDistance } from "../VideoContainer";

export default function CommentItem({ comment }) {
  return (
    <Box display={"flex"} gap={1}>
      <Avatar>{comment.userId[0].toUpperCase()}</Avatar>
      <Box>
        <Typography>
          @{comment.userId} {<TimeAgoDistance date={comment.createdAt} />}
        </Typography>
        <Typography variant="p">{comment.text}</Typography>
      </Box>
    </Box>
  );
}
