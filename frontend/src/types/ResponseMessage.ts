export type ResponseMessage = {
  resultPatients?: ResultPatients,
  resultDoctors?: ResultDoctors,
  resultAppointments?: ResultAppointments,
 }

export type ResultPatients = {
  successfulPatients?: string;
  wrongFormatPatients?: string;
  duplicatesPatients?: string;
}

export type ResultDoctors = {
  successfulDoctors?: string;
  wrongFormatDoctors?: string;
  duplicatesDoctors?: string;
}

export type ResultAppointments = {
  successfulAppointments?: string;
  wrongFormatAppointments?: string;
}