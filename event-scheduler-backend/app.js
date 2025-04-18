// Created by Philip Brunet

import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import { checkUser } from "./middlewares/authMiddleware.js";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 60 * 1000, //once per minute
  limit: 30, //can send 30 messages
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(limiter);
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(checkUser);

app.use(authRoutes);
app.use(eventRoutes);
app.use(submissionRoutes);

export default app;

//The following websites were referenced while creating this app:
//https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
//https://www.npmjs.com/package/cors
//https://www.geeksforgeeks.org/mongoose-timestamps/
//https://mongoosejs.com/docs/timestamps.html
//https://stackoverflow.com/questions/26008555/creating-a-foreign-key-relationship-in-mongoose
//https://www.slingacademy.com/article/mongoose-compare-two-dates-in-query/
//https://www.chaijs.com/api/bdd/#method_exist
//https://stackoverflow.com/questions/27101240/typeerror-converting-circular-structure-to-json-in-nodejs
//https://www.geeksforgeeks.org/mongoose-countdocuments-function/
