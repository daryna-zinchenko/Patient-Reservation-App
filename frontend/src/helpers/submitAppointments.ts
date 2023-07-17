import { instanceApi } from "../api/instances";

export async function submitAppointments(newAppointments: FormDataEntryValue) {

try {
  const response = await instanceApi.addAppointments((newAppointments as string).trim());
  return response;
} catch (error) {
  return {"error": error};
  };
};