// Created by Philip Brunet

import { Router } from "express";
import {
  userPost,
  loginPost,
  userGet,
  userPut,
  helloGet,
} from "../controllers/authController.js";
import {
  requireUsername,
  requireEmail,
  requirePassword,
  requireMinPasswordLength,
  requireLogin,
} from "../middlewares/authMiddleware.js";

const authRoutes = Router();

// Validation middlewares
authRoutes.post("/user", requireUsername);
authRoutes.post("/user", requireEmail);
authRoutes.post("/user", requirePassword);
authRoutes.post("/user", requireMinPasswordLength);

authRoutes.post("/login", requireUsername);
authRoutes.post("/login", requirePassword);

authRoutes.get("/user", requireLogin);

authRoutes.put("/user", requirePassword);
authRoutes.put("/user", requireLogin);

// Routes
authRoutes.get("/", helloGet);

authRoutes.post("/user", userPost);

authRoutes.post("/login", loginPost);

authRoutes.get("/user", userGet);

authRoutes.put("/user", userPut);

export default authRoutes;
