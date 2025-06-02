

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CancellationRefundPolicyPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Cancellation and Refund Policy
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Effective Date: January 01, 2025
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Cancellation Policy</h2>
            <p>
              This Cancellation Policy outlines the terms and conditions for
              cancelling your bookings or services with TXIGO ("we", "our",
              "us"). Please read this policy carefully before making a booking.
            </p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">1.1 User Cancellation</h3>
              <p>
                Users may have the option to cancel their bookings, subject to
                the following conditions:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Cancellation requests must be made through our platform (website
                  or app) within the specified timeframe before the scheduled
                  service.
                </li>
                <li>
                  The applicable cancellation charges, if any, will be clearly
                  displayed at the time of cancellation. These charges may vary
                  based on the type of service, the time of cancellation, and other
                  factors.
                </li>
                <li>
                  In some cases, cancellations made close to the scheduled time
                  may not be eligible for a refund.
                </li>
                <li>
                  We reserve the right to modify our cancellation policy at any
                  time, and the terms applicable to your booking will be those in
                  effect at the time of your cancellation request.
                </li>
              </ul>

              <h3 className="font-semibold">1.2 TXIGO Cancellation</h3>
              <p>
                We reserve the right to cancel bookings under certain
                circumstances, including but not limited to:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Unavailability of service providers.</li>
                <li>Technical issues or system failures.</li>
                <li>Force majeure events.</li>
                <li>Safety concerns.</li>
                <li>Violation of our terms of service.</li>
              </ul>
              <p>
                In the event of a cancellation by TXIGO, you will typically be
                notified, and a full refund will be processed according to our
                Refund Policy (Section 2).
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Refund Policy</h2>
            <p>
              This Refund Policy outlines the terms and conditions under which
              refunds will be provided for cancelled bookings or services with
              TXIGO.
            </p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">2.1 Eligibility for Refunds</h3>
              <p>Refunds may be applicable in the following situations:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Cancellation by TXIGO (as per Section 1.2 of the Cancellation
                  Policy).
                </li>
                <li>
                  Successful cancellation by the user within the eligible
                  timeframe, as per the applicable cancellation terms displayed
                  at the time of booking.
                </li>
                <li>
                  Genuine issues with the service provided that are verified by
                  TXIGO.
                </li>
              </ul>

              <h3 className="font-semibold">2.2 Non-Eligibility for Refunds</h3>
              <p>Refunds will typically not be provided in the following
                circumstances:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  User cancellation outside the eligible timeframe or failure to
                  cancel.
                </li>
                <li>
                  No-shows or failure to utilize the booked service.
                </li>
                <li>
                  Disputes arising from subjective dissatisfaction with the
                  service where the service was provided as described.
                </li>
                <li>
                  Partial use of a service (refunds may be considered on a
                  case-by-case basis).
                </li>
              </ul>

              <h3 className="font-semibold">2.3 Refund Process</h3>
              <p>To request a refund, please follow these steps:</p>
              <ul className="list-decimal ml-6 space-y-2">
                <li>
                  Contact our customer support team through the designated channels
                  (e.g., email, in-app support) with your booking details and the
                  reason for the refund request.
                </li>
                <li>
                  Provide any supporting documentation or evidence as requested
                  by our support team.
                </li>
                <li>
                  Your refund request will be reviewed, and you will be notified
                  of the outcome within a reasonable timeframe.
                </li>
                <li>
                  If the refund is approved, it gets processed and credited within 5-7 business working days to the original payment source. The time it takes for the refund to reflect in your account may vary depending on your bank or payment provider.
                </li>
              </ul>

              <h3 className="font-semibold">2.4 Refund Amount</h3>
              <p>
                The amount of the refund, if applicable, will be determined based
                on the specific circumstances and the terms outlined in this
                policy and at the time of booking. Cancellation charges, if
                applicable, may be deducted from the refund amount.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Cancellation and
              Refund Policy, please contact us at:
            </p>
            <div className="ml-4 space-y-2">
              <p className="font-semibold">TXIGO</p>
              <p>
                Email:{" "}
                <a href="mailto:info@txigo.com" className="underline">
                  info@txigo.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://www.txigo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  www.txigo.com
                </a>
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}