import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import MyDrawer from "./components/MyDrawer";
import { useState } from "react";
import VideoContainer from "./components/VideoContainer";
import { videosData } from "./data/Data";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Watch from "./components/Watch";
import { getCommentsByVideo } from "./api/API";

const getTheme = (mode) => {
  const theme = createTheme({
    palette: {
      mode: (mode && "light") || "dark",
      youtubeTheme: {
        main: mode ? "#000000" : "#ffffff",
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: {
              variant: "subscribe",
            },
            style: mode
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
              variant: "badged",
            },
            style: mode
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
  const [isLight, setIsLight] = useState(true);
  return (
    <ThemeProvider theme={getTheme(isLight)}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<MyDrawer isLight={isLight} setIsLight={setIsLight} />}
            >
              <Route index element={<VideoContainer videos={videosData} />} />
              <Route
                path="videos"
                element={<VideoContainer videos={videosData} />}
              />
              <Route path="watch/:id" element={<Watch />} />
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
