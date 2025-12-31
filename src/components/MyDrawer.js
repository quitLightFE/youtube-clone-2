import * as React from "react";
import {
  styled,
  // useTheme
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SlowMotionVideoRoundedIcon from "@mui/icons-material/SlowMotionVideoRounded";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import Header from "./Header";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const navigation = [
  {
    text: "Asosoiy",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeRoundedIcon />,
    path: "/videos",
  },
  {
    text: "Shorts",
    icon: <SlowMotionVideoRoundedIcon />,
    path: "",
  },
  {
    text: "Obunalar",
    icon: <SubscriptionsOutlinedIcon />,
    activeIcon: <SubscriptionsIcon />,
    path: "/subscriptions",
  },
  { text: "Siz", icon: <AccountCircleOutlinedIcon />, path: "" },
];

export default function MyDrawer({ isLight, setIsLight }) {
  // const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        isLight={isLight}
        setIsLight={setIsLight}
      />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          position: { md: "static", xs: "fixed" },
          zIndex: 10,
          display: { xs: "none", sm: "block" },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigation.map(({ text, icon, activeIcon, path }, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
                component={NavLink}
                to={path}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {location.pathname === path ? activeIcon : icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: [1, 1, 3],
          pt: [1, 1, 3],
          pb: [8, 1, 3],
          ml: [0, "65px", 0],
        }}
        // pb={{ xs: "56px !important", sm: "0" }}
      >
        <DrawerHeader />
        {<Outlet />}
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: { xs: "flex", sm: "none" },
          }}
        >
          <BottomNavigation
            showLabels
            sx={{ width: "100%" }}
            value={location.pathname}
          >
            {navigation.map(({ text, icon, activeIcon, path }) => (
              <BottomNavigationAction
                key={`${text}-${text}`}
                component={NavLink}
                to={path}
                value={path}
                label={text}
                sx={{
                  "&.active": {
                    color: "text.secondary",
                  },
                }}
                icon={location.pathname === path ? activeIcon : icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
}
