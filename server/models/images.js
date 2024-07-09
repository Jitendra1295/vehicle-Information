const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    vehicle_information_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "vehicle" },
    vehicle_information_image:
    {
        type: String
    }
})


const Images = mongoose.model("images", imageSchema);

module.exports = Images;