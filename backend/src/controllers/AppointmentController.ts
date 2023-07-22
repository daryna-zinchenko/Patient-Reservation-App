/* eslint-disable max-len */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import { AppointmentModel, IAppointment } from './../models/AppointmentModel';

export async function createAppointments(req: Request, res: Response) {
  const newAppointments: string = req.body;
  const wrongFormatAppointments: string[] = [];
  const successfulAppointments: string[] = [];
  const appointmentsToInsert: IAppointment[] = [];

  const appointments = (newAppointments as string)
    .trim()
    .split('\n')
    .map((appointment: string) => {
      const parts = appointment.trim().split(',');

      if (parts.length > 3) {
        wrongFormatAppointments.push(appointment);

        return null;
      }

      return parts;
    })
    .filter(v => v !== null);

  for (const appointment of (appointments as string[][])) {
    const [patientId, doctorId, ...rest] = appointment;
    const appointmentTime = rest.shift();

    const validatedAppointment = new AppointmentModel({
      patientId, doctorId, appointmentTime,
    });
    const validationError = validatedAppointment.validateSync();

    if (validationError) {
      wrongFormatAppointments.push(appointment.join(','));
      continue;
    }

    successfulAppointments.push(appointment.join(','));

    appointmentsToInsert.push({
      patientId: parseInt(patientId), doctorId: parseInt(doctorId), appointmentTime,
    });
  }

  const response = {
    successfulAppointments: successfulAppointments.join('\n'),
    wrongFormatAppointments: wrongFormatAppointments.join('\n'),
  };

  try {
    await AppointmentModel.insertMany(appointmentsToInsert);
    res.send(response);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

export const deleteAllAppointments = async(res: Response) => {
  try {
    await AppointmentModel.deleteMany();
    res.statusCode = 200;
    res.send();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};

export const getAppointments = async(res: Response) => {
  try {
    const appointments = await AppointmentModel.find();

    console.log(appointments);
    res.send(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    console.log(error);
  }
};
