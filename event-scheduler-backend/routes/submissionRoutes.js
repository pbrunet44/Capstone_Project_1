// Created by Philip Brunet

import { Router } from "express";
import {
  submit_post_by_id,
  submit_put_by_id,
  submissions_get_by_id,
} from "../controllers/submissionController.js";

const submissionRoutes = Router();

submissionRoutes.post("/submit/:id", submit_post_by_id);

submissionRoutes.put("/submit/:id", submit_put_by_id);

submissionRoutes.get("/submissions/:id", submissions_get_by_id);

export default submissionRoutes;
