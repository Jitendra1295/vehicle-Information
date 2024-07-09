const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    vehicle_information_id: { type: String, required: true },
    vehicle_information_image:
    {
        type: String
    }
})


const Image = mongoose.model("images", imageSchema);

module.exports = Image;