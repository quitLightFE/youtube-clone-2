import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { USER_ID } from "../../App";
import { getChannelsByIds, getSubscribedChannels } from "../../api/API";

export default function SubsSection() {
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const subsRes = await getSubscribedChannels(USER_ID);

        const channelIds = subsRes.data.map((s) => s.channelId);

        if (!channelIds.length) {
          setSubscribedChannels([]);
          return;
        }

        const chanelsRes = await getChannelsByIds(channelIds);
        setSubscribedChannels(chanelsRes.map((r) => r.data));
      } catch (err) {
        setError(()=> {throw err})
      }
    })();
  }, []);

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography align="center" variant="h4">
          Obunalar
        </Typography>
        {(subscribedChannels.length &&
          subscribedChannels.map(({ name }) => (
            <Box key={name} display={"flex"} alignItems={"center"} gap={1}>
              <Avatar>{name[0].toUpperCase()}</Avatar>
              {name}
            </Box>
          ))) || (
          <Box
            display={"flex"}
            height={"calc(100dvh - 200px)"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h3" textAlign={"center"} color="text.disabled">
              Siz xech kimga Obuna qilmagansiz
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
