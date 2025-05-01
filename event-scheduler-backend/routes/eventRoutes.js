// Created by Philip Brunet

import { Router } from "express";
import {
  eventPost,
  eventGetById,
  myeventsGet,
  finalizePostById,
} from "../controllers/eventController.js";
import { requireLogin } from "../middlewares/authMiddleware.js";

const eventRoutes = Router();

// Validation middlewares
eventRoutes.post("/event", requireLogin);

eventRoutes.get("/myevents/", requireLogin);

eventRoutes.post("/finalize/:id", requireLogin);

// Routes
eventRoutes.post("/event", eventPost);

eventRoutes.get("/event/:id", eventGetById);

eventRoutes.get("/myevents/", myeventsGet);

eventRoutes.post("/finalize/:id", finalizePostById);

export default eventRoutes;
