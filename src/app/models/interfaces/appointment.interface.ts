import { ContactResponse } from './contact.interface';

export interface AppointmentResponse extends Omit<ContactResponse, 'referenceId'> {
  appointmentId: string;
  status: string;
  estimatedConfirmation: string;
}
