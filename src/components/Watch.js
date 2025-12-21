import { Avatar, Box, Button, Divider, Input, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { videosData } from "../data/Data";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "./comments/Comments";

export default function Watch() {
  const { id } = useParams();
  const video = videosData.find((v) => v.id === id);
  return (
    <Box p={0}>
      <iframe
        src={video.videoUrl}
        title={video.id}
        style={{ width: "100%", aspectRatio: 16 / 9, border: "none" }}
      />
      <Typography fontWeight={"bold"} variant="h6">
        {video.title}
      </Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1.5}
      >
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Avatar />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="subtitle1">CodeLab</Typography>
            <Typography variant="caption">7,8 ming obunachi</Typography>
          </Box>
          <Button variant="subscribe" sx={{ borderRadius: 20 }}>
            Obuna
          </Button>
        </Box>

        <Box display={"flex"} gap={1}>
          <Box display={"flex"} borderRadius={20} overflow={"hidden"}>
            <Button variant="badged" startIcon={<ThumbUpOutlinedIcon />}>
              330k
            </Button>
            <Divider variant="middle" orientation="vertical" flexItem />
            <Button
              variant="badged"
              startIcon={<ThumbDownOutlinedIcon />}
            ></Button>
          </Box>
          <Button
            sx={{ borderRadius: 20 }}
            variant="badged"
            startIcon={<ReplyOutlinedIcon />}
          >
            Ulashish
          </Button>
          <Button
            variant="badged"
            sx={{ borderRadius: "50%", minWidth: 0, p: 1 }}
          >
            <MoreHorizOutlinedIcon />
          </Button>
        </Box>
      </Box>
      <Comments videoId={video.id} />
    </Box>
  );
}
