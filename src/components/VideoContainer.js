import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getVideos } from "../api/API";

import { formatDistanceToNow } from "date-fns";
import { createPortal } from "react-dom";
import { Profiler } from "react";
import { onRenderCallback } from "../App";

export function TimeAgoDistance({ date }) {
  const formatted = formatDistanceToNow(new Date(date), { addSuffix: true });
  return <span>{formatted}</span>;
}

export const localizeAbbreviatedNumber = (num) =>
  new Intl.NumberFormat("en-EN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);

function VideoCardSkeleton() {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} p={0.5}>
      <Card
        sx={{
          p: 1,
          boxShadow: "none",
        }}
      >
        {/* Thumbnail */}
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            aspectRatio: 16 / 9,
            height: "auto",
            borderRadius: 2,
          }}
        />

        <CardContent
          sx={{ display: "flex", gap: 1, px: 0, alignItems: "center" }}
        >
          {/* Avatar */}
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>

          {/* Text */}
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" width="95%" height={22} />
            <Skeleton variant="text" width="60%" height={18} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function VideoContainer() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLodaing] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getVideos();
      if (res.isError) {
        setIsError(() => {
          throw res.isError;
        });
      }
      setData(res.data);
      setIsLodaing(false);
    })();
  }, []);

  return createPortal(
    <Profiler id="videosProfiler" onRender={onRenderCallback}>
      <Box pb={[8, 1, 3]} ml={[0, "65px"]}>
        <Container sx={{ maxWidth: "3000px !important" }} fixed>
          {isLoading ? (
            <Grid container>
              {Array.from({ length: 10 }).map((_, index) => (
                <VideoCardSkeleton key={(index + 1) * 40} />
              ))}
            </Grid>
          ) : (
            <Grid container>
              {data.map(({ id, thumbnail, title, author, views, date }) => (
                <Grid
                  key={id + title}
                  size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
                  p={0.5}
                >
                  <Card
                    component={Link}
                    to={`/watch/${id}`}
                    id={id}
                    sx={{
                      cursor: "pointer",
                      p: 1,
                      boxShadow: "none",
                      transition: "0.6s",
                      textDecoration: "none",
                      display: "block",
                      "&:hover": {
                        bgcolor: theme.palette.divider,
                      },
                    }}
                  >
                    <CardMedia
                      image={thumbnail}
                      sx={{
                        aspectRatio: 16 / 9,
                        width: "100%",
                        borderRadius: 2,
                      }}
                    />
                    <CardContent sx={{ display: "flex", gap: 1, px: 0 }}>
                      <Avatar />
                      <Box>
                        <Typography variant="p">{title}</Typography>
                        <Typography variant="body2">{author}</Typography>
                        <Typography variant="caption">
                          {localizeAbbreviatedNumber(views)} views
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ "&::before": { content: '"•"', pr: 0.5 } }}
                          px={1}
                        >
                          {<TimeAgoDistance date={date} />}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Profiler>,
    document.getElementById("videos")
  );
}
