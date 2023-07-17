/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { AppointmentModel, IAppointment } from './../models/AppointmentModel';

export async function createAppointments(req: Request, res: Response) {
  const newAppointments: string = req.body;

  const duplicatesAppointments: string[] = [];
  const wrongFormatAppointments: string[] = [];
  const successfulAppointments: IAppointment[] = [];

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
      wrongFormatAppointments.push(JSON.stringify(appointment));
      continue;
    }

    const existingAppointment = await AppointmentModel.findOne({
      patientId, doctorId, appointmentTime,
    });

    if (existingAppointment) {
      duplicatesAppointments.push(JSON.stringify(appointment));
    } else {
      successfulAppointments.push({
        patientId, doctorId, appointmentTime,
      });
    }
  }

  const response = {
    successfulAppointments: successfulAppointments,
    wrongFormatAppointments: wrongFormatAppointments,
    duplicatesAppointments: duplicatesAppointments,
  };

  try {
    await AppointmentModel.insertMany(successfulAppointments);
    res.send(response);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

export const deleteAllAppointments = async(res: express.Response) => {
  try {
    await AppointmentModel.deleteMany();
    res.statusCode = 200;
    res.send();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
