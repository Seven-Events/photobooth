import type { BoothId } from './packages';

export type UserRole = 'client' | 'admin';

/**
 * awaiting_deposit — submitted, Stripe checkout not completed yet
 * pending          — deposit paid (or taken offline), awaiting our confirmation
 * confirmed        — date locked in
 */
export type EventStatus = 'awaiting_deposit' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type DepositStatus = 'unpaid' | 'paid' | 'refunded';

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
  /** Which booth. */
  booth_id: BoothId;
  /** Rate id from lib/packages.ts, e.g. 'mod-completely-captured'. */
  rate_id: string;
  /** Add-on ids from lib/packages.ts. */
  addon_ids: string[];
  venue?: string;
  guest_count?: number;
  /** Cents, captured at booking time so later price changes do not rewrite history. */
  subtotal_cents: number;
  hst_cents: number;
  total_cents: number;
  deposit_cents: number;
  deposit_status: DepositStatus;
  stripe_session_id?: string;
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

/** What the booking form posts. Prices are deliberately absent — the server
 *  recalculates them from rate_id and addon_ids. */
export interface BookingFormData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  event_date: string;
  event_time: string;
  event_title: string;
  booth_id: BoothId;
  rate_id: string;
  addon_ids: string[];
  venue?: string;
  guest_count?: number;
  special_requests?: string;
}
