const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    brand_id: { type: String, required: true },
    category_id: {
        type: String,
        enum: ["1", "2"],
        default: "1"
    },
    model_name: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;