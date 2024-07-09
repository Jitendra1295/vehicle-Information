const express = require('express');
const Images = require("../models/images");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join(__dirname, '..', 'public', 'uploads');
        console.log(`Saving file to: ${dirPath}`); // Debugging line
        cb(null, dirPath); // Ensure correct path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

// Route for file upload
router.post('/add', upload.single("file"), async (req, resp) => {
    console.log("image upload::", req.file);
    try {
        // Create image entry in database
        const uploadImages = await Images.create({
            vehicle_information_id: req.body.vehicle_information_id,
            vehicle_information_image: `uploads/${req.file.filename}` // Correct path to the uploaded file
        });
        console.log("New CREATED uploadImages: ", uploadImages);
        resp.status(200).json({ message: "Image added successfully", uploadImages });
    } catch (error) {
        console.log("Error: ", error);
        return resp.status(500).json({ Error: "Server error" });
    }
});

module.exports = router;
