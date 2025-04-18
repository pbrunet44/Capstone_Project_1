// Created by Philip Brunet

import { Router } from "express";
import {
  event_post,
  event_get_by_id,
  myevents_get,
  finalize_post_by_id,
} from "../controllers/eventController.js";

const eventRoutes = Router();

eventRoutes.post("/event", event_post);

eventRoutes.get("/event/:id", event_get_by_id);

eventRoutes.get("/myevents/", myevents_get);

eventRoutes.post("/finalize/:id", finalize_post_by_id);

export default eventRoutes;
