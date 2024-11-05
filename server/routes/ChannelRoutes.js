import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  createChannel,
  getChannelMessage,
  getUserChannels,
} from "../controllers/ChannelControler.js";

const channelRoutes = Router();

channelRoutes.post("/create-channel", verifyToken, createChannel);
channelRoutes.get("/get-user-channels", verifyToken, getUserChannels);
channelRoutes.get(
  "/get-channel-messages/:channelId",
  verifyToken,
  getChannelMessage
);

export default channelRoutes;