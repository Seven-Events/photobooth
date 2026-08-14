import { Resend } from 'resend';
import { DEPOSIT_PERCENT, formatPrice, getRate } from './packages';
import { daysBeforeDisplay } from './time';

let client: Resend | null = null;

function resend() {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

const INK = '#254641';
const CLAY = '#e58b82';
const CREAM = '#faf7ef';
const BLUSH = '#f5efe8';

function shell(heading: string, body: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seveneventsphotobooth.com';
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; background-color: ${CREAM}; padding: 32px 16px;">
    <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; padding: 32px; border-radius: 16px;">
      <p style="margin: 0 0 24px; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: ${CLAY}; font-weight: 700;">
        Seven Events Photobooth
      </p>
      <h1 style="color: ${INK}; font-size: 24px; margin: 0 0 16px;">${heading}</h1>
      ${body}
      <p style="color: #999; font-size: 13px; margin: 32px 0 0; border-top: 1px solid #eee; padding-top: 16px;">
        Questions? Just reply to this email — it reaches us directly.<br>
        <a href="${siteUrl}" style="color: ${CLAY};">seveneventsphotobooth.com</a>
      </p>
    </div>
  </div>`;
}

function detailBox(rows: Array<[string, string]>) {
  return `
  <div style="background-color: ${BLUSH}; padding: 20px; border-radius: 12px; margin: 0 0 24px;">
    ${rows
      .map(
        ([label, value]) =>
          `<p style="color: ${INK}; margin: 6px 0; font-size: 15px;"><strong>${label}:</strong> ${value}</p>`
      )
      .join('')}
  </div>`;
}

/** Sent when a booking is saved but no deposit was taken. */
export async function sendBookingReceivedEmail(opts: {
  email: string;
  name: string;
  eventDate: string;
  eventTime: string;
  packageLabel: string;
  totalCents: number;
}) {
  if (!isEmailConfigured()) {
    console.warn('RESEND_API_KEY not set — skipping booking received email');
    return { success: false, skipped: true };
  }

  try {
    await resend().emails.send({
      from: 'Seven Events <noreply@seveneventsphotobooth.com>',
      to: opts.email,
      subject: 'We have got your booking request',
      html: shell(
        'Thanks — we have got it',
        `<p style="color: ${INK}; margin: 0 0 20px;">Hi ${opts.name},</p>
         <p style="color: ${INK}; margin: 0 0 20px;">
           Your request is in. We will check the date and confirm by email within 24 hours.
           Nothing is charged yet.
         </p>
         ${detailBox([
           ['Date', opts.eventDate],
           ['Start time', opts.eventTime],
           ['Package', opts.packageLabel],
           ['Total', `${formatPrice(opts.totalCents)} incl. HST`],
         ])}`
      ),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending booking received email:', error);
    return { success: false, error };
  }
}

/** Sent once the deposit has actually been paid. */
export async function sendBookingConfirmationEmail(opts: {
  email: string;
  name: string;
  eventDate: string;
  eventTime: string;
  packageLabel: string;
  depositCents: number;
  balanceCents: number;
}) {
  if (!isEmailConfigured()) {
    console.warn('RESEND_API_KEY not set — skipping confirmation email');
    return { success: false, skipped: true };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seveneventsphotobooth.com';
  const label = getRate(opts.packageLabel)?.label ?? opts.packageLabel;
  const dueDate = daysBeforeDisplay(opts.eventDate, 7);

  try {
    await resend().emails.send({
      from: 'Seven Events <noreply@seveneventsphotobooth.com>',
      to: opts.email,
      subject: 'Your date is held — deposit received',
      html: shell(
        'Your date is held',
        `<p style="color: ${INK}; margin: 0 0 20px;">Hi ${opts.name},</p>
         <p style="color: ${INK}; margin: 0 0 20px;">
           Your ${DEPOSIT_PERCENT}% deposit came through and your date is locked in. We will be in touch
           shortly with a questionnaire so we can build your custom print template.
         </p>
         ${detailBox([
           ['Date', opts.eventDate],
           ['Start time', opts.eventTime],
           ['Package', label],
           ['Deposit paid', formatPrice(opts.depositCents)],
           ['Balance due', `${formatPrice(opts.balanceCents)}${dueDate ? ` by ${dueDate}` : ' — 7 days before your event'}`],
         ])}
         <a href="${siteUrl}/login" style="display: inline-block; background-color: ${CLAY}; color: ${INK}; padding: 14px 28px; text-decoration: none; border-radius: 999px; font-weight: 700;">
           View your booking
         </a>`
      ),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  if (!isEmailConfigured()) {
    console.warn('RESEND_API_KEY not set — skipping password reset email');
    return { success: false, skipped: true };
  }

  try {
    await resend().emails.send({
      from: 'Seven Events <noreply@seveneventsphotobooth.com>',
      to: email,
      subject: 'Reset your password',
      html: shell(
        'Reset your password',
        `<p style="color: ${INK}; margin: 0 0 20px;">
           Click below to set a new password. The link expires in one hour.
         </p>
         <a href="${resetLink}" style="display: inline-block; background-color: ${CLAY}; color: ${INK}; padding: 14px 28px; text-decoration: none; border-radius: 999px; font-weight: 700;">
           Reset password
         </a>
         <p style="color: #999; font-size: 13px; margin: 24px 0 0;">
           If you did not request this, you can ignore this email.
         </p>`
      ),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
