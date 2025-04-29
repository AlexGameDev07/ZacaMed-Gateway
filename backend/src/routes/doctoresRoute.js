import express from 'express';
import { doctoresCtrl } from '../controllers/doctoresCtrl.js';
const router = express.Router();

router.route("/")
    .get(doctoresCtrl.getDoctores)
    .post(doctoresCtrl.postDoctor);

router.route("/:id")
    .get(doctoresCtrl.getDoctorById)
    .put(doctoresCtrl.putDoctor)
    .delete(doctoresCtrl.deleteDoctor);

export default router;