import React, { useEffect, useState } from 'react';
import './AppointmentsTable.scss';
import { instanceApi } from "../../api/instances";
import { Appointment } from '../../types/Appointment';

export const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    instanceApi.getAppointments()
      .then(setAppointments);
  }, [appointments]);

  return (
    <div className='AppointmentsTable'>
      {appointments.map(({ _id, patientId, doctorId, appointmentTime }) => (
        <div key={_id} className='AppointmentsTable__item'>
          <p>{patientId}{doctorId}{appointmentTime}</p>
        </div>
      ))}
    </div>
  );
}