import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(
  email: string,
  name: string,
  eventDate: string,
  eventTime: string,
  packageType: string
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    await resend.emails.send({
      from: 'noreply@seveneventsphotobooth.com',
      to: email,
      subject: 'Your Photobooth Booking Confirmed',
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #F5F1ED; padding: 2rem;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #FFFFFF; padding: 2rem; border-radius: 0.5rem;">
            <h1 style="color: #4A6B66; font-family: 'Fraunces', serif; margin-bottom: 1rem;">
              Booking Confirmed!
            </h1>
            <p style="color: #4A6B66; margin-bottom: 1rem;">
              Hi ${name},
            </p>
            <p style="color: #4A6B66; margin-bottom: 2rem;">
              Thank you for booking with Seven Events Photobooth! Your event has been confirmed.
            </p>

            <div style="background-color: #F0E8E0; padding: 1.5rem; border-radius: 0.25rem; margin-bottom: 2rem;">
              <p style="color: #4A6B66; margin: 0.5rem 0;"><strong>Event Date:</strong> ${eventDate}</p>
              <p style="color: #4A6B66; margin: 0.5rem 0;"><strong>Event Time:</strong> ${eventTime}</p>
              <p style="color: #4A6B66; margin: 0.5rem 0;"><strong>Package:</strong> ${packageType}</p>
            </div>

            <p style="color: #4A6B66; margin-bottom: 1rem;">
              Log in to your account to view more details and design your photo templates.
            </p>

            <a href="${siteUrl}/login" style="display: inline-block; background-color: #E8A89B; color: #4A6B66; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.25rem; font-weight: 600; margin-bottom: 2rem;">
              View Your Booking
            </a>

            <p style="color: #999; font-size: 0.875rem;">
              If you have any questions, please don't hesitate to contact us.
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
) {
  try {
    await resend.emails.send({
      from: 'noreply@seveneventsphotobooth.com',
      to: email,
      subject: 'Reset Your Photobooth Account Password',
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #F5F1ED; padding: 2rem;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #FFFFFF; padding: 2rem; border-radius: 0.5rem;">
            <h1 style="color: #4A6B66; font-family: 'Fraunces', serif; margin-bottom: 1rem;">
              Reset Your Password
            </h1>
            <p style="color: #4A6B66; margin-bottom: 2rem;">
              Click the link below to reset your password. This link expires in 1 hour.
            </p>

            <a href="${resetLink}" style="display: inline-block; background-color: #E8A89B; color: #4A6B66; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.25rem; font-weight: 600; margin-bottom: 2rem;">
              Reset Password
            </a>

            <p style="color: #999; font-size: 0.875rem;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
