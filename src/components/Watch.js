import { Avatar, Box, Button, Typography, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
// import { videosData } from "../data/Data";

import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "./comments/Comments";
import { getVideo } from "../api/API";
import { useEffect, useState } from "react";
import LikeBox from "./likes/LikeBox";
import Subscription from "./Subscriptions/SubscriptionElement";
import ErrorBoundary from "./ErrorBoundary";

const VideoSkeleton = () => {
  return (
    <Box p={0}>
      {/* Video */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ aspectRatio: 16 / 9, borderRadius: 2, height: "auto" }}
      />

      {/* Sarlavha */}
      <Typography mt={1}>
        <Skeleton width="80%" height={32} />
      </Typography>

      {/* Info + Knopkalar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1.5}
        flexWrap="wrap"
        mt={1}
      >
        {/* Avtor */}
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

        {/* Knopkalar */}
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
  const [video, setVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getVideo(id).then((res) => {
      setVideo(res?.data?.[0]);
    });
  }, []);

  return video ? (
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
        flexWrap={"wrap"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}
          flex={{ xs: 1, md: 0 }}
        >
          <Subscription channelId={video.channelId} />
        </Box>

        <Box display={"flex"} gap={1}>
          <LikeBox videoId={video?.id} />
          <Button
            sx={{ borderRadius: 20 }}
            variant="badged"
            startIcon={<ReplyOutlinedIcon />}
          >
            <Typography variant="p" display={{ xs: "none", md: "flex" }}>
              Ulashish
            </Typography>
          </Button>
          <Button
            variant="badged"
            sx={{ borderRadius: "50%", minWidth: 0, p: 1 }}
          >
            <MoreHorizOutlinedIcon />
          </Button>
        </Box>
      </Box>
      <ErrorBoundary>
        <Comments videoId={video.id} />
      </ErrorBoundary>
    </Box>
  ) : (
    <VideoSkeleton />
  );
}
