/* eslint-disable max-len */
import { Router } from 'express';
import {
  AppointmentController,
  DoctorController,
  PatientController,
} from '../controllers/index';

const rootRouter = Router();

rootRouter.post('/appointments', AppointmentController.createAppointments);
// rootRouter.get('/appointments', AppointmentController.getAllAppointments);
// rootRouter.delete('/appointment/:id', AppointmentController.deleteAppointment);
rootRouter.delete('/appointments', AppointmentController.deleteAllAppointments);
// rootRouter.patch('/appointments/:id', AppointmentController.updateAppointment);
rootRouter.post('/doctors', DoctorController.createDoctors);
rootRouter.post('/patients', PatientController.createPatients);
rootRouter.delete('/doctors', DoctorController.deleteAllDoctors);
rootRouter.delete('/patients', PatientController.deleteAllPatients);

export { rootRouter as router };
