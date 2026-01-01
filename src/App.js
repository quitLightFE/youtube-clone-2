import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import MyDrawer from "./components/MyDrawer";
import { useState } from "react";
import VideoContainer from "./components/VideoContainer";
import { videosData } from "./data/Data";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Watch from "./components/Watch";
import { getCommentsByVideo } from "./api/API";
import SubsSection from "./components/Subscriptions/SubsSection";
import ErrorBoundary from "./components/ErrorBoundary";

// npm install
// npx json-server db.json
// npm start

// 2 - vazifa ErrorBoundary ishlatildi:
// VideoContainer
// Comments + postComment
// Obunalar -> SubsSection

export const USER_ID = "u1";

const getTheme = (isLightTheme) => {
  const theme = createTheme({
    palette: {
      mode: (isLightTheme && "light") || "dark",
      youtubeTheme: {
        main: isLightTheme ? "#000000" : "#ffffff",
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: {
              variant: "subscribe",
            },
            style: isLightTheme
              ? {
                  textTransform: "none",
                  backgroundColor: "#191830",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#272727",
                  },
                }
              : {
                  textTransform: "none",
                  backgroundColor: "white",
                  color: "black",
                },
          },
          {
            props: {
              variant: "unsubscribe",
            },
            style: isLightTheme
              ? {
                  textTransform: "none",
                  backgroundColor: "transparent",
                  color: "#191830",
                  borderWidth: "1px",
                  borderColor: "#191830",
                  borderStyle: "solid",
                  "&:hover": {
                    borderColor: "#272727",
                    color: "#272727",
                  },
                }
              : {
                  textTransform: "none",
                  backgroundColor: "transparent",
                  color: "white",
                  borderWidth: "1px",
                  borderColor: "white",
                  borderStyle: "solid",
                },
          },
          {
            props: {
              variant: "badged",
            },
            style: isLightTheme
              ? {
                  backgroundColor: "#f7f7f7",
                  "&:hover": {
                    backgroundColor: "#e5e5e5",
                  },
                  textTransform: "none",
                }
              : {
                  backgroundColor: "#272727",
                  "&:hover": {
                    backgroundColor: "#3f3f3f",
                  },
                  textTransform: "none",
                },
          },
        ],
      },
    },
  });
  return theme;
};

function App() {
  getCommentsByVideo("v1");
  const [isLight, setIsLight] = useState(
    localStorage.getItem("isLight") === null
      ? true
      : JSON.parse(localStorage.getItem("isLight"))
  );

  return (
    <ThemeProvider theme={getTheme(isLight)}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<MyDrawer isLight={isLight} setIsLight={setIsLight} />}
            >
              <Route
                index
                element={
                  <ErrorBoundary>
                    <VideoContainer videos={videosData} />
                  </ErrorBoundary>
                }
              />
              <Route
                path="videos"
                element={
                  <ErrorBoundary>
                    <VideoContainer videos={videosData} />
                  </ErrorBoundary>
                }
              />
              <Route path="watch/:id" element={<Watch />} />
              <Route
                path="subscriptions"
                element={
                  <ErrorBoundary>
                    <SubsSection />
                  </ErrorBoundary>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100dvh"}
                  flexDirection={"column"}
                >
                  <Typography variant="h1">Not Found</Typography>
                  <Link to={"/"}>Home</Link>
                </Box>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
