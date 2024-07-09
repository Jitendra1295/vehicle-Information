const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    model_name: { type: String, required: true },
    vehicle_information_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "vehicle" },
    model_color: { type: String, enum: ["black", "white"], default: "black" }
})


const Variant = mongoose.model("variant", variantSchema);

module.exports = Variant;