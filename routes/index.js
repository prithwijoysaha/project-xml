import express from "express";
import multer from "multer";
var router = express.Router();
import { uploadContacts } from "../module/contacts/contacts.controller.js";

/**set up storage*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + "xml-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, callback) => {
  const supportedFiles = ["text/xml"];
  if (supportedFiles.includes(file.mimetype)) {
    return callback(null, true);
  } else {
    //reject file
    return callback("Unsupported file format", false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
});

router.get("/", function (req, res, next) {
  res.render("index.ejs");
});

router.post(
  "/upload-contacts",
  upload.single("contactFile"),
  async function (req, res, next) {
    return await uploadContacts(req, res);
  }
);

export default router;
