// Created by Philip Brunet

import { Router } from "express";
import {
  user_post,
  login_post,
  user_get,
  user_put,
  hello_get,
} from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.get("/", hello_get);

authRoutes.post("/user", user_post);

authRoutes.post("/login", login_post);

authRoutes.get("/user", user_get);

authRoutes.put("/user", user_put);

export default authRoutes;
