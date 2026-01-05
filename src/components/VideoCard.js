import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { localizeAbbreviatedNumber, TimeAgoDistance } from "./VideoContainer";

export default function VideoCard({ data }) {
  const theme = useTheme();
  const { id, thumbnail, title, author, views, date } = data;
  return (
    <Card
      component={Link}
      to={`/watch/${id}`}
      id={id}
      sx={{
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
  );
}
