import { Avatar, Box, Button, Divider, Typography, Skeleton} from "@mui/material";
import { useParams } from "react-router-dom";
import { videosData } from "../data/Data";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"; 
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "./comments/Comments";
import { getVideo } from "../api/API";
import { useEffect, useState } from "react";

const VideoSkeleton = () => {
  return (
    <Box p={0}>
      {/* Видео */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ aspectRatio: 16 / 9, borderRadius: 2, height: "auto" }}
      />

      {/* Заголовок */}
      <Typography mt={1}>
        <Skeleton width="80%" height={32} />
      </Typography>

      {/* Инфо + кнопки */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1.5}
        flexWrap="wrap"
        mt={1}
      >
        {/* Автор */}
        <Box display="flex" alignItems="center" gap={1}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>

          <Box>
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={16} />
          </Box>

          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 20 }}
          />
        </Box>

        {/* Кнопки */}
        <Box display="flex" gap={1}>
          <Skeleton
            variant="rectangular"
            width={120}
            height={36}
            sx={{ borderRadius: 20 }}
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={36}
            sx={{ borderRadius: 20 }}
          />
          <Skeleton variant="circular" width={36} height={36} />
        </Box>
      </Box>

      {/* Комментарии */}
      <Box mt={3}>
        {[1, 2, 3].map((item) => (
          <Box key={item} display="flex" gap={1.5} mb={2}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box flex={1}>
              <Skeleton width="30%" height={18} />
              <Skeleton width="90%" height={20} />
              <Skeleton width="70%" height={20} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default function Watch() {
  const [video, setVideo] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    getVideo(id).then(res => {
      setVideo(res.data[0])
      console.log(res.data[0])
    })
  }, [])
  return (
    video ? <Box p={0}>
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
        flexWrap={"wrap"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}
          flex={{ xs: 1, md: 0 }}
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
        </Box>

        <Box display={"flex"} gap={1}>
          <Box display={"flex"} borderRadius={20} overflow={"hidden"}>
            <Button variant="badged" startIcon={<ThumbUpOutlinedIcon />}>
              like
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
            <Typography variant="p" display={{ xs: "none", md: 'flex' }}>Ulashish</Typography>
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
    </Box> : <VideoSkeleton />
  );
}
