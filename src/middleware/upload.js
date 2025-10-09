const util = require("util");
const multer = require("multer");
const maxSize = 20 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, res, cb) => {
        cb(null, file.bookname);
    },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("myfile");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
