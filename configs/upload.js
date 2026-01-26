const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'uploads/resume');
    },
    filename: function(req,res,cb){
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null,uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

module.exports = upload;