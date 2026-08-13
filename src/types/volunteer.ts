import type { Timestamp } from "firebase/firestore";

export type VolunteerStatus = "new" | "contacted" | "archived";

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills?: string;
  message?: string;
  status: VolunteerStatus;
  createdAt?: Date;
}

export interface VolunteerDocument {
  name: string;
  email: string;
  phone: string;
  skills?: string;
  message?: string;
  status: VolunteerStatus;
  createdAt?: Timestamp;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  message: string;
}
