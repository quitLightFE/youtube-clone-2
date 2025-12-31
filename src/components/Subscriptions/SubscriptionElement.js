import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  getChannelName,
  getMySubscription,
  getSubscriptionsByChannel,
  subscribe,
  unSubscribe,
} from "../../api/API";
import { USER_ID } from "../../App";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { localizeAbbreviatedNumber } from "../VideoContainer";

export default function SubscriptionElement({ channelId }) {
  const [subs, setSubs] = useState([]);
  const [mySub, setMySub] = useState(null);
  const [channelName, setChannelName] = useState(null);
  useEffect(() => {
    getSubscriptionsByChannel(channelId).then((res) => {
      setSubs(res.data);
    });
    getMySubscription(channelId, USER_ID).then((res) => {
      setMySub(res.data[0] ?? null);
    });
    getChannelName(channelId).then((res) => {
      setChannelName(res.data[0].name ?? null);
    });
  }, [channelId]);

  const toggleSubscribe = useCallback(async () => {
    if (mySub) {
      await unSubscribe(mySub.id);
      setSubs((prev) => prev.filter((s) => s.id !== mySub.id));
      setMySub(null);
    } else {
      const res = await subscribe(channelId, USER_ID);
      setSubs((prev) => [...prev, res.data]);
      setMySub(res.data);
    }
  }, [mySub, channelId]);

  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <Avatar />
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="subtitle1" whiteSpace={"nowrap"}>
          {channelName}
        </Typography>
        <Typography variant="caption">
          {localizeAbbreviatedNumber(subs.length)} obunachi
        </Typography>
      </Box>
      <Button
        onClick={toggleSubscribe}
        variant={mySub ? "badged" : "subscribe"}
        sx={{ borderRadius: 20, whiteSpace: "nowrap" }}
        startIcon={mySub ? <NotificationsActiveIcon /> : null}
        endIcon={mySub ? <ExpandMoreIcon /> : null}
      >
        {mySub ? "" : "Obuna"}
      </Button>
    </Box>
  );
}
