const express = require('express');
const jwt = require("jsonwebtoken");
const Vehicle = require("../models/vehicle");
const Variant = require("../models/variant");

const router = express.Router();

const JWT_SECRET = "qwertyuiop"

router.post('/add', async (req, resp) => {
    const { brand_id, category_id, model_name, user_id } = req.body;


    try {
        let vehicle = await Vehicle.findOne({ model_name });
        if (vehicle) {
            return resp.status(400).json({ Error: "vehicle already exits. " })
        }

        vehicle = new Vehicle({
            brand_id, category_id, model_name, user: user_id
        })
        console.log("vehicle user ::2", vehicle);

        await vehicle.save();

        resp.status(200).json({ message: "vehicle added successfully" })

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
})

router.post('/variant', async (req, resp) => {
    const { model_name, vehicle_information_id } = req.body;
    console.log("variant add::", model_name, vehicle_information_id);

    try {

        let variant = new Variant({
            model_name, vehicle_information_id
        })
        console.log("vehicle user ::2", variant);

        await variant.save();

        resp.status(200).json({ message: "variant added successfully" })

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
})

router.get("/:id", async (req, resp) => {
    let { id } = req.params;
    console.log("get Vehicle for:: ", id);

    // Remove any unwanted characters, e.g., ':'
    id = id.replace(/[^a-fA-F0-9]/g, '');

    try {
        const vehicle = await Vehicle.find({ "user": id });
        console.log("get Vehicle for:: ", vehicle);
        if (!vehicle) {
            return resp.status(404).json({ error: 'Vehicle not found' });
        }

        console.log("get Vehicle for:: ", vehicle);
        return resp.status(200).json(vehicle);

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
});

router.get("/:id/:search", async (req, resp) => {
    let { id, search } = req.params;
    console.log("get Vehicle for:: ", id, search);

    // Remove any unwanted characters, e.g., ':'
    id = id.replace(/[^a-fA-F0-9]/g, '');

    try {
        const vehicles = await Vehicle.find({ "user": id, "brand_id": search });
        console.log("get Vehicle for:: ", vehicles);
        if (!vehicles) {
            return resp.status(404).json({ error: 'Vehicle not found' });
        }

        console.log("get Vehicle for:: ", vehicles);
        return resp.status(200).json(vehicles);

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
});

router.get("/data/:id", async (req, resp) => {
    let { id } = req.params;
    console.log("get Vehicle for::0 ", id, req.params);

    // Validate and sanitize the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return resp.status(400).json({ error: 'Invalid vehicle ID' });
    }
    console.log("get Vehicle for::1 ", id, req.params);

    try {
        const vehicleDetails = await Vehicle.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'variants',
                    localField: '_id',
                    foreignField: 'vehicle_id',
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
                    name: 1,
                    brand: 1,
                    model: 1,
                    variants: 1,
                    images: 1
                }
            }
        ]);

        if (vehicleDetails.length === 0) {
            return resp.status(404).json({ error: 'Vehicle not found' });
        }
        console.log("vehicleDetails ::", vehicleDetails);
        return resp.status(200).json({ vehicleDetails, message: "Data fetch Successfully" });
    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;