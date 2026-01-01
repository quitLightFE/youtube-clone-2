import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Avatar, Box, Button, InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { drawerWidth } from "./MyDrawer";
import { Add, DarkMode, Sunny } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { USER_ID } from "../App";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const StyledInput = styled("div")(() => ({
  borderRadius: "20px",
  border: "1px solid grey",
}));

export default function Header({
  open,
  handleDrawerOpen,
  isLight,
  setIsLight,
}) {
  const theme = useTheme();
  const toggleIsLight = () => {
    setIsLight((prev) => {
      localStorage.setItem("isLight", !prev);
      return !prev;
    });
  };
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ bgcolor: `${theme.palette.background.paper} !important` }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            display: open ? "none" : { xs: "none", sm: "flex" },
          }}
        >
          <MenuIcon color="action" />
        </IconButton>
        <Box
          display={"flex"}
          to={"/"}
          component={Link}
          alignItems={"center"}
          sx={{ textDecoration: "none" }}
        >
          <YouTubeIcon sx={{ fill: "red", width: 30 }} />
          <Typography color="textPrimary" variant="h6" noWrap component="div">
            YouTube
          </Typography>
        </Box>
        <StyledInput
          sx={{
            mr: 1,
            ml: "auto",
            display: { md: "flex", xs: "none" },
            alignItems: "center",
            pr: 1,
          }}
        >
          <InputBase placeholder="Qidiruv" sx={{ pl: 1 }} />
          <SearchRoundedIcon color="action" />
        </StyledInput>
        <IconButton
          sx={{
            p: 0.5,
            ml: "auto",
            display: { md: "none", xs: "flex" },
          }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <IconButton
          sx={{
            border: { md: "1px solid grey", xs: "none" },
            p: 0.5,
            mr: { md: "auto", xs: "none" },
            display: { sm: "flex", xs: "none" },
          }}
        >
          <MicNoneRoundedIcon />
        </IconButton>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Button
            sx={{
              textTransform: "unset",
              color: theme.palette.text.primary,
              border: "1px solid grey",
              borderRadius: 20,
              py: 0.5,
            }}
            startIcon={<Add />}
          >
            Yaratish
          </Button>
          <IconButton sx={{ p: 0.5, display: { sm: "flex", xs: "none" } }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton onClick={toggleIsLight}>
            {(isLight && <DarkMode />) || <Sunny />}
          </IconButton>
          <Avatar sx={{ width: 30, height: 30 }}>
            {USER_ID[0].toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
