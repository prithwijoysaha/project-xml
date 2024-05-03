import multer from "multer";

/**set up storage*/
const storageCSV = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/csv/");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    callback(
      null,
      file.fieldname + "-" + "csv-" + uniqueSuffix + "." + fileExtension
    );
  },
});

const storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/images/");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    callback(null, file.fieldname + "-" + "img-" + uniqueSuffix+'.'+fileExtension);
  },
});

const fileFilterCSV = (req, file, callback) => {
  const supportedFiles = ["text/csv"];
  if (supportedFiles.includes(file.mimetype)) {
    return callback(null, true);
  } else {
    //reject file
    return callback("Unsupported file format", false);
  }
};
const fileFilterImage = (req, file, callback) => {
  const supportedFiles = ["image/jpeg", "image/png"];
  if (supportedFiles.includes(file.mimetype)) {
    return callback(null, true);
  } else {
    //reject file
    return callback("Unsupported file format", false);
  }
};

export const uploadCSV = multer({
  storage: storageCSV,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilterCSV,
});

export const uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilterImage,
});
