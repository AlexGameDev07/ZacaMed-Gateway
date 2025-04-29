const doctoresCtrl = {};
import doctoresMdl from "../models/doctoresMdl.js";

//GET
doctoresCtrl.getDoctores = async (req, res) => {
    try {
        const doctores = await doctoresMdl.find();
        res.status(200).json(doctores);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//GET by ID
doctoresCtrl.getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctoresMdl.findById(id);
        if (!doctor) return res.status(404).json({ message: "Doctor no encontrado" });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//POST
doctoresCtrl.postDoctor = async (req, res) => {
    try {
        const { nombre, especialidad, email, password } = req.body;
        const newDoctor = new doctoresMdl({ nombre, especialidad, email, password });
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//PUT
doctoresCtrl.putDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, email, password } = req.body;
        const updatedDoctor = await doctoresMdl.findByIdAndUpdate(id, { nombre, especialidad, email, password }, { new: true });
        if (!updatedDoctor) return res.status(404).json({ message: "Doctor no encontrado" });
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//DELETE
doctoresCtrl.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDoctor = await doctoresMdl.findByIdAndDelete(id);
        if (!deletedDoctor) return res.status(404).json({ message: "Doctor no encontrado" });
        res.status(200).json({ message: "Doctor eliminado" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {doctoresCtrl};

