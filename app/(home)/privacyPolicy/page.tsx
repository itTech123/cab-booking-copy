import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Privacy Policy
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Effective Date: January 01, 2025
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>
              TXIGO ("we", "our", "us") is committed to protecting your privacy.
              This Privacy Policy outlines how we collect, use, disclose, and
              safeguard your personal information in compliance with applicable
              laws, including the Information Technology Act, 2000, and the
              Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">Personal Information:</h3>
              <p>
                When you register, book a ride, or contact us, we may collect
                your name, email address, phone number, payment details, and
                other necessary information.
              </p>
              <h3 className="font-semibold">Location Data:</h3>
              <p>
                We collect real-time location data to facilitate ride bookings
                and provide accurate pickup and drop-off information.
              </p>
              <h3 className="font-semibold">Device Information:</h3>
              <p>
                We gather details about your device, including IP address,
                browser type, operating system, and device identifiers, to
                enhance user experience and troubleshoot issues.
              </p>
              <h3 className="font-semibold">Usage Data:</h3>
              <p>
                We monitor how you interact with our website and app, including
                pages visited, features used, and time spent, to improve our
                services.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Use of Information</h2>
            <p>We utilize the collected information for the following purposes:</p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">Service Provision:</h3>
              <p>To process ride bookings, manage accounts, and provide customer support.</p>
              <h3 className="font-semibold">Communication:</h3>
              <p>To send updates, confirmations, promotional offers, and other relevant information.</p>
              <h3 className="font-semibold">Improvement of Services:</h3>
              <p>To analyze usage patterns and enhance the functionality and performance of our platform.</p>
              <h3 className="font-semibold">Legal Compliance:</h3>
              <p>To comply with legal obligations and resolve disputes.</p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
            <p>We may share your information in the following circumstances:</p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">Service Providers:</h3>
              <p>
                With third-party vendors who assist in providing services such as
                payment processing, data storage, and customer support.
              </p>
              <h3 className="font-semibold">Legal Requirements:</h3>
              <p>
                When required by law or to protect our rights, property, or
                safety, we may disclose your information to authorities.
              </p>
              <h3 className="font-semibold">Business Transfers:</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred as part of the transaction.
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              personal information. However, please be aware that no method of
              data transmission over the internet is entirely secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfill the purposes outlined in this policy or as required by law.
              After this period, we will securely delete or anonymize your
              information.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">Access:</h3>
              <p>Request a copy of the personal information we hold about you.</p>
              <h3 className="font-semibold">Correction:</h3>
              <p>Request correction of any inaccurate or incomplete data.</p>
              <h3 className="font-semibold">Deletion:</h3>
              <p>Request deletion of your personal information, subject to certain exceptions.</p>
              <h3 className="font-semibold">Objection:</h3>
              <p>Object to the processing of your personal information in certain circumstances.</p>
            </div>
            <p>
              To exercise these rights, please contact us at{" "}
              <a href="mailto:info@txigo.com" className="underline">
                info@txigo.com
              </a>
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              we become aware that we have inadvertently collected such
              information, we will take steps to delete it promptly.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. Any updates will be posted
              on this page, and the effective date will be revised accordingly.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
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