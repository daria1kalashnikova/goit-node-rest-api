import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");
const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({
  storage,
});

export default upload;
