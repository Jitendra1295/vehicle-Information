const express = require('express');
const Image = require("../models/images");
const multer = require("multer")
const path = require("path")

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.post('/add', upload.single("vehicle_information_image"), async (req, resp) => {
    console.log("coverImageUrl::", req.body);
    try {
        var obj = {
            vehicle_information_id: req.body.vehicle_information_id,
            vehicle_information_image: `uploads/${req.body.filename}`
        }
        Image.create(obj)
            .then((err, item) => {
                if (err) {
                    console.log(err);
                    resp.status(400).json({ message: "upload image fail" })
                }
                else {
                    // item.save();
                    resp.status(200).json({ message: "Image added successfully" })
                }
            });

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
})



module.exports = router;