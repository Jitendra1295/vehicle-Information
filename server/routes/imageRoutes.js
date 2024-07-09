const express = require('express');
const Images = require("../models/images");
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

router.post('/add', upload.single("file"), async (req, resp) => {
    console.log("coverImageUrl::", req.body);
    try {
        const uploadImages = await Images.create({
            vehicle_information_id: req.body.vehicle_information_id,
            vehicle_information_image: `uploads/${req.body.file}`
        })
        console.log("new CREATED uploadImages:: ", uploadImages);
        resp.status(200).json({ message: "Image added successfully", uploadImages })
    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
})



module.exports = router;