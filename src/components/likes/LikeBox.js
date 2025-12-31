import { Box, Button, Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { getLikesByVideo, likeVideo, unLikeVideo } from "../../api/API";
import { USER_ID } from "../../App";

export default function LikeBox({ videoId }) {
  const [likes, setLikes] = useState([]);
  const [myLike, setMyLike] = useState(null);

  useEffect(() => {
    getLikesByVideo(videoId).then((res) => {
      setLikes(res.data);
      setMyLike(res.data.find((l) => l.userId === USER_ID));
    });
  }, [videoId]);

  const toggleLike = useCallback(async () => {
    if (myLike) {
      await unLikeVideo(myLike.id);
      setLikes((prev) => prev.filter((l) => l.id !== myLike.id));
      setMyLike(null);
    } else {
      const res = await likeVideo(videoId, USER_ID);
      setLikes((prev) => [...prev, res.data]);
      setMyLike(res.data);
    }
  }, [myLike, videoId]);

  return (
    <Box display={"flex"} borderRadius={20} overflow={"hidden"}>
      <Button
        variant="badged"
        startIcon={(myLike && <ThumbUpIcon />) || <ThumbUpOutlinedIcon />}
        onClick={toggleLike}
      >
        {likes.length}
      </Button>
      <Divider variant="middle" orientation="vertical" flexItem />
      <Button variant="badged" startIcon={<ThumbDownOutlinedIcon />}></Button>
    </Box>
  );
}
