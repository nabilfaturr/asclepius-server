import express from "express";
import predictRouter from "./routes/predict.route";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from server");
});

app.use("/predict", predictRouter);

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
    }
  } else if (err) {
    // Tangani error lainnya
    return res.status(400).json({
      error: err.message,
    });
  }
  _next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
