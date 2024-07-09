const express = require('express');
const Images = require("../models/images");
const Vehicle = require("../models/vehicle")
const multer = require("multer");
const path = require("path");
const mongoose = require('mongoose');

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
router.get("/user/:id", async (req, resp) => {
    let { id } = req.params;
    console.log("VehicleData::0", id, req.params);

    // Validate and sanitize the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return resp.status(400).json({ error: 'Invalid vehicle ID' });
    }
    console.log("VehicleData::1 ", id, req.params);

    try {
        const vehicleDetails = await Vehicle.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'variants',
                    localField: '_id',
                    foreignField: 'vehicle_information_id',
                    as: 'variants'
                }
            },
            {
                $lookup: {
                    from: 'images',
                    localField: '_id',
                    foreignField: 'vehicle_information_id',
                    as: 'images'
                }
            },
            {
                $project: {
                    brand_id: 1,
                    category_id: 1,
                    model_name: 1,
                    user: 1,
                    variants: 1,
                    images: 1
                }
            }
        ]);

        if (vehicleDetails.length === 0) {
            return resp.status(404).json({ error: 'Vehicle not found' });
        }
        console.log("vehicleDetails ::", vehicleDetails);
        return resp.status(200).json({ vehicleDetails, message: "Data fetched successfully" });
    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
