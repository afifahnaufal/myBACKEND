const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 1. KONEKSI MONGODB
mongoose.connect("mongodb://localhost:27017/gis_db")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


// 2. Schema database
const LocationSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
});

const Location = mongoose.model("Location", LocationSchema);

// 3. API GET — Ambil semua lokasi
app.get("/locations", async (req, res) => {
    const locations = await Location.find();
    res.json(locations);
});

// 4. API POST — Tambah lokasi baru
app.post("/locations", async (req, res) => {
    const { name, latitude, longitude } = req.body;
    const newLoc = new Location({ name, latitude, longitude });
    await newLoc.save();
    res.json({ message: "Lokasi berhasil disimpan" });
});

// DELETE lokasi
app.delete("/locations/:id", async (req, res) => {
    try {
        await Location.findByIdAndDelete(req.params.id);
        res.json({ message: "Lokasi dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 5. Jalankan server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
