import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // Penyimpanan di memori
  limits: { fileSize: 1 * 1024 * 1024 }, // Batas ukuran file 1 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(file.originalname.toLowerCase());

    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(
      new Error("File yang diunggah harus berupa gambar (jpeg, jpg, atau png)")
    );
  },
});
