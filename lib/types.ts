export type UserRole = 'client' | 'admin';
export type PackageType = 'bronze' | 'silver' | 'gold';
export type EventStatus = 'pending' | 'confirmed' | 'completed';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  user_id: string;
  event_date: string;
  event_time: string;
  event_title: string;
  package_type: PackageType;
  special_requests?: string;
  lumabooth_event_id?: string;
  status: EventStatus;
  created_at: string;
  updated_at: string;
}

export interface Backdrop {
  id: string;
  name: string;
  image_url: string;
  description?: string;
  active: boolean;
  created_at: string;
}

export interface PhotoTemplate {
  id: string;
  event_id: string;
  user_id: string;
  template_name: string;
  canva_design_id?: string;
  custom_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  event_date: string;
  event_time: string;
  event_title: string;
  package_type: PackageType;
  special_requests?: string;
}

export interface AdminBookingData {
  full_name: string;
  email: string;
  phone: string;
  event_date: string;
  event_time: string;
  event_title: string;
  package_type: PackageType;
  special_requests?: string;
  lumabooth_event_id?: string;
}
