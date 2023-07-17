export type ResponseMessage = {
  resultPatients: ResultPatients,
  resultDoctors: ResultDoctors,
  resultAppointments: ResultAppointments,
 } | {}

export type ResultPatients = {
  successfulPatients?: String;
  wrongFormatPatients?: String;
  duplicatesPatients?: String;
}

export type ResultDoctors = {
  successfulDoctors?: String;
  wrongFormatDoctors?: String;
  duplicatesDoctors?: String;
}

export type ResultAppointments = {
  successfulAppointments?: String;
  wrongFormatAppointments?: String;
}