import express from "express";
import { createPredict } from "../controllers/predict.controller";
import { upload } from "../services/image.service";

const router = express.Router();

router.post("/", upload.single("image"), createPredict);

export default router;
