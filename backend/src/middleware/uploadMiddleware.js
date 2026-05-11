const multer = require("multer");

const path = require("path");


// STORAGE
const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(null, "uploads/");
  },

  filename: function (
    req,
    file,
    cb
  ) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});


// ALLOWED FILE TYPES
const allowedMimeTypes = [

  // IMAGES
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",

  // VIDEOS
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",

  // AUDIO
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/webm",
  "audio/ogg",

  // PDF
  "application/pdf",

  // DOCS
  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // ZIP / RAR
  "application/zip",

  "application/x-rar-compressed",

  "application/vnd.rar",

  // TEXT / CODE
  "text/plain",

  "application/javascript",

  "text/javascript"
];


// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {

  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Unsupported file type"
      ),
      false
    );
  }
};


// MULTER CONFIG
const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      1024 * 1024 * 100
  }
});


module.exports = upload;