import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Terms and Conditions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Effective Date: January 01, 2025
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. General Provisions</h2>
            <p>
              Welcome to TXIGO, your trusted partner for online cab bookings. By
              accessing or using our website or mobile application (collectively,
              the "Services"), you agree to comply with and be bound by these
              Terms and Conditions. Please read them carefully before using our
              Services.
            </p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">1.1 Acceptance of Terms</h3>
              <p>
                By using TXIGO's Services, you acknowledge that you have read,
                understood, and agree to these Terms and Conditions, including
                any future amendments.
              </p>
              <h3 className="font-semibold">1.2 Eligibility</h3>
              <p>
                You must be at least 18 years old and capable of entering into a
                legally binding contract to use our Services.
              </p>
              <h3 className="font-semibold">1.3 Account Registration</h3>
              <p>
                To access certain features, you may need to create an account.
                You agree to provide accurate, current, and complete information
                during registration and to update it as necessary.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Services Provided</h2>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">2.1 Scope of Services</h3>
              <p>
                TXIGO facilitates the booking of transportation services through
                third-party providers. We do not own or operate the vehicles; our
                role is limited to connecting users with service providers.
              </p>
              <h3 className="font-semibold">2.2 Third-Party Providers</h3>
              <p>
                The drivers and vehicles are operated by independent third
                parties. TXIGO is not responsible for the actions or omissions of
                these providers.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">3.1 Lawful Use</h3>
              <p>
                You agree to use the Services only for lawful purposes and in
                accordance with all applicable local, state, and national laws.
              </p>
              <h3 className="font-semibold">3.2 Prohibited Activities</h3>
              <p>You shall not:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Engage in fraudulent activities.</li>
                <li>Misrepresent your identity.</li>
                <li>Interfere with or disrupt the Services.</li>
              </ul>
              <h3 className="font-semibold">3.3 Account Security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities under your account.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Booking and Payment</h2>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">4.1 Booking Process</h3>
              <p>
                To book a ride, you must provide accurate pickup and drop-off
                locations, preferred vehicle type, and any other required
                information.
              </p>
              <h3 className="font-semibold">4.2 Payment</h3>
              <p>
                All payments for services booked through TXIGO are processed
                through our platform. You agree to pay all applicable charges,
                including taxes and fees.
                <span className="font-semibold">
                  For Booking Confirmation, you must pay Advance amount as
                  Reservation Charge and this amount is Non Refundable
                </span>
              </p>
              <h3 className="font-semibold">4.3 Cancellation Policy</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <span className="font-semibold">
                    24 Hours or More Before Pickup:
                  </span>{" "}
                  If you cancel your booking at least 24 hours before the
                  scheduled pickup time, you may be eligible for a refund,
                  subject to the terms outlined below.
                </li>
                <li>
                  <span className="font-semibold">
                    Less Than 24 Hours Before Pickup:
                  </span>{" "}
                  Cancellations made less than 24 hours before the scheduled
                  pickup time may incur a cancellation fee, and refunds will be
                  processed at TXIGO's discretion.
                </li>
                <li>
                  <span className="font-semibold">No-Show:</span> If you do not
                  show up at the designated pickup location within 30 minutes of
                  the scheduled time, the booking will be treated as a no-show,
                  and no refund will be provided.
                </li>
              </ul>
              <h3 className="font-semibold">4.4 Refund Process</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <span className="font-semibold">Refund Method:</span> Eligible
                  refunds will be credited to your TXIGO app Wallet within 7 to
                  10 business days.
                </li>
                <li>
                  <span className="font-semibold">Wallet Usage:</span> Refunds
                  credited to your TXIGO Wallet can be used as a percentage of
                  the fare for future rides. The percentage usage will be
                  determined based on the refund amount and the total fare of the
                  new booking.
                </li>
                <li>
                  <span className="font-semibold">Validity:</span> TXIGO Wallet
                  credits are valid for a period of 12 months from the date of
                  issuance. Unused credits will expire after this period.
                </li>
              </ul>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">
                5.1 No Liability for Third-Party Actions
              </h3>
              <p>
                TXIGO is not liable for any damages or losses resulting from the
                actions or omissions of third-party providers.
              </p>
              <h3 className="font-semibold">5.2 Service Interruptions</h3>
              <p>
                We are not responsible for delays or interruptions in service
                due to factors beyond our control, including but not limited to
                weather conditions, traffic, or technical issues.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              6. Privacy and Data Protection
            </h2>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">6.1 Data Collection</h3>
              <p>
                TXIGO collects personal information necessary for providing
                services, including contact details and payment information.
              </p>
              <h3 className="font-semibold">6.2 Data Usage</h3>
              <p>
                Your data will be used in accordance with our{" "}
                <a href="/privacy-policy" className="underline">
                  Privacy Policy
                </a>
                , which is incorporated into these Terms and Conditions.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Modifications to Terms</h2>
            <p>
              TXIGO reserves the right to modify these Terms and Conditions at
              any time. Any changes will be effective upon posting on our
              platform. Continued use of the Services constitutes acceptance of
              the modified terms.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              8. Governing Law and Dispute Resolution
            </h2>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">8.1 Governing Law</h3>
              <p>These Terms and Conditions are governed by the laws of India.</p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Contact Information</h2>
            <p>
              For any questions or concerns regarding these Terms and Conditions,
              please contact us at:
            </p>
            <div className="ml-4 space-y-2">
              <p className="font-semibold">TXIGO</p>
              <p>
                Email:{" "}
                <a href="mailto:support@txigo.com" className="underline">
                  support@txigo.com
                </a>
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}