const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require("path")

dotenv.config();

const app = express();

const MONGODB_URI = "mongodb://localhost:27017/vehicle";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("./public")));

// MongoDB connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/vehicle', require('./routes/vehicleRoutes'));
app.use('/api/img', require('./routes/imageRoutes'));

app.get("/", (req, resp) => {
    console.log(".. Welcome Home ..");
    resp.send("<h1>.. Welcome Home ..</h1>")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
