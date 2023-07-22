import React, { useEffect, useState } from 'react';
import './AppointmentsTable.scss';
import { instanceApi } from "../../api/instances";
import { Appointment } from '../../types/Appointment';

export const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAppointmentsFromServer() {
    setIsLoading(true);
    const items = await instanceApi.getAppointments();
    setAppointments(items);
    setIsLoading(false);
  }


  useEffect(() => {
    getAppointmentsFromServer();
  }, []);

  return (
    <div className='AppointmentsTable'>
    {isLoading ? (
      <div>Loading... </div>
    ) : (
      <>
        {appointments.map(({ _id, patientId, doctorId, appointmentTime }) => (
          <div key={_id} className='AppointmentsTable__item'>
            <p>{patientId}{doctorId}{appointmentTime}</p>
          </div>
        ))}
      </>
    )}
    </div>
  );
};