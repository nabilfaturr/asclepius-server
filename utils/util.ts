import * as tf from "@tensorflow/tfjs-node";
import dotenv from "dotenv";
dotenv.config();

const MODEL_URL = process.env.MODEL_URL as string;

export const loadModel = async () => {
  try {
    if (!MODEL_URL) {
      throw new Error("MODEL_URL not defined in .env");
    }

    const model = await tf.loadGraphModel(MODEL_URL);

    return model;
  } catch (error: any) {
    console.error("Error loading model. Check model-error.log for details.");
  }
};

export const generateId = () => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomStr}`;
};

export const generateDate = () => {
  const date = new Date();
  return date.toISOString();
};
