import React, { useEffect, useState } from 'react';
import './AppointmentsTable.scss';
import { instanceApi } from "../../api/instances";
import { Appointment } from '../../types/Appointment';
import { Button } from '../Button';
import { AppointmentCard } from '../AppointmentCard';

export const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  async function getAppointmentsFromServer() {
    setIsLoading(true);
    const items = await instanceApi.getAppointments();
    setAppointments(items);
    setIsLoading(false);
  }

  useEffect(() => {
    getAppointmentsFromServer();
  }, []);

  const onClick = () => {
    setIsCardVisible(true);
  };


  return (
    <div>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <div className='AppointmentsTable'>
            <div className='AppointmentsTable__column'>
              {appointments.map(({ _id, patientId, doctorId, appointmentTime }) => (
                <div key={_id} className='AppointmentsTable__item'>
                  <p>{patientId}, {doctorId},{appointmentTime}</p>
                </div>
              ))}
            </div>
            <div className='AppointmentsTable__column'>
              {appointments.map(({ _id, patientId, doctorId, appointmentTime }) => (
                <div key={_id} className='AppointmentsTable__item'>
                  <p>{patientId}, {doctorId},{appointmentTime}</p>
                  <Button
                    text="View Card"
                    type="button"
                    onClick={onClick} />
                </div>
              ))}
            </div>
          </div>
          <AppointmentCard />
        </>
      )}
    </div>
  );
};