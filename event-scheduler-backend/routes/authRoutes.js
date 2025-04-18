// Created by Philip Brunet

import { Router } from "express";
import {
  user_post,
  login_post,
  user_get,
  user_put,
} from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/user", user_post);

authRoutes.post("/login", login_post);

authRoutes.get("/user", user_get);

authRoutes.put("/user", user_put);

export default authRoutes;
