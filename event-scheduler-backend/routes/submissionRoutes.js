// Created by Philip Brunet

import { Router } from "express";
import {
  submitPostById,
  submitPutById,
  submissionsGetById,
} from "../controllers/submissionController.js";
import { requireLogin } from "../middlewares/authMiddleware.js";
import { requireCalendar } from "../middlewares/submissionMiddleware.js";

const submissionRoutes = Router();

// Validation middlewares
submissionRoutes.post("/submit/:id", requireCalendar);

submissionRoutes.put("/submit/:id", requireLogin);
submissionRoutes.put("/submit/:id", requireCalendar);

// Routes
submissionRoutes.post("/submit/:id", submitPostById);

submissionRoutes.put("/submit/:id", submitPutById);

submissionRoutes.get("/submissions/:id", submissionsGetById);

export default submissionRoutes;
