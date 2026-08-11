const BOOQABLE_API_KEY = process.env.BOOQABLE_API_KEY;
const BOOQABLE_API_URL = 'https://api.booqable.com/v1';

export interface BooqableBooking {
  id: string;
  customer_id: string;
  starts_at: string;
  stops_at: string;
  status: string;
  customer: {
    email: string;
    name: string;
    phone: string;
  };
  lines: Array<{
    product_id: string;
    product: {
      name: string;
    };
  }>;
}

export interface BooqableCustomer {
  id: string;
  email: string;
  name: string;
  phone: string;
}

export async function getBooqableBookings() {
  try {
    const response = await fetch(`${BOOQABLE_API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BOOQABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Booqable API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Booqable bookings:', error);
    return [];
  }
}

export async function getBooqableBookingByEmail(email: string) {
  try {
    const bookings = await getBooqableBookings();
    return bookings.filter((booking: BooqableBooking) =>
      booking.customer?.email?.toLowerCase() === email.toLowerCase()
    );
  } catch (error) {
    console.error('Error fetching booking by email:', error);
    return [];
  }
}

export async function getBooqableCustomers() {
  try {
    const response = await fetch(`${BOOQABLE_API_URL}/customers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BOOQABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Booqable API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Booqable customers:', error);
    return [];
  }
}

export function formatBookingDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateStr = start.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  return `${dateStr} from ${startTime} to ${endTime}`;
}
