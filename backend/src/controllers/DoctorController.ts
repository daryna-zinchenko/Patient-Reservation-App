/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { DoctorModel, IPerson } from './../models/PersonModel';

export async function createDoctors(req: Request, res: Response) {
  const newDoctors: string = req.body;

  const duplicatesDoctors: string[] = [];
  const wrongFormatDoctors: string[] = [];
  const successfulDoctors: IPerson[] = [];

  const doctors = (newDoctors as string)
    .trim()
    .split('\n')
    .map((doctor: string) => {
      const parts = doctor.trim().split(',');

      if (parts.length > 4) {
        wrongFormatDoctors.push(doctor);

        return null;
      }

      return parts;
    })
    .filter(v => v !== null);

  for (const doctor of (doctors as string[][])) {
    const [id, hoursAvailable, ...rest] = doctor;
    const name = rest.shift();
    const dateOfBirth = rest.shift();

    const validatedDoctor = new DoctorModel({
      id, hoursAvailable, name, dateOfBirth,
    });
    const validationError = validatedDoctor.validateSync();

    if (validationError) {
      wrongFormatDoctors.push(JSON.stringify(doctor));
      continue;
    }

    const existingDoctor = await DoctorModel.findOne({ id });

    if (existingDoctor) {
      duplicatesDoctors.push(JSON.stringify(doctor));
    } else {
      successfulDoctors.push({
        id: parseInt(id), hoursAvailable, name, dateOfBirth,
      });
    }
  }

  const response = {
    successfulDoctors: successfulDoctors,
    wrongFormatDoctors: wrongFormatDoctors,
    duplicatesDoctors: duplicatesDoctors,
  };

  try {
    await DoctorModel.insertMany(successfulDoctors);
    res.send(response);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

export const deleteAllDoctors = async(res: express.Response) => {
  try {
    await DoctorModel.deleteMany();
    res.statusCode = 200;
    res.send();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
