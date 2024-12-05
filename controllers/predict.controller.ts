import { Request, Response } from "express";
import { predictCancer } from "../services/inferece.service";
import { generateDate, generateId, loadModel } from "../utils/util";
import firestore from "../utils/firestore";

export const createPredict = async (req: Request, res: Response) => {
  try {
    const bufferImage = req.file?.buffer;

    const model = await loadModel();

    if (!model) {
      res.status(400).json({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
    }

    const predictResult = await predictCancer(model, bufferImage);

    if (!predictResult) {
      res.status(400).json({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
      return;
    }

    const { result, suggestion } = predictResult;

    const data = {
      id: generateId(),
      result,
      suggestion,
      createdAt: generateDate(),
    };

    const predictCollection = firestore.collection("predictions");

    predictCollection.doc(data.id).set(data);

    res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
