import { Avatar, Box, Button, Input } from "@mui/material";
import React, { useState } from "react";

export default function CommentForm({ onSubmit }) {
  //
  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };
  //
  return (
    <Box component={"form"} onSubmit={handleComment}>
      <Box display={"flex"} gap={1}>
        <Avatar />
        <Input
          color="youtubeTheme"
          fullWidth
          placeholder="Fikr bildiring..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></Input>
      </Box>
      {text.trim().length !== 0 && (
        <Button onClick={handleComment}>Fikr bildirish</Button>
      )}
    </Box>
  );
}
