"use client";

import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [isPending, startTransition] = useTransition();

function handleAction(formData: FormData) {
  const email = formData.get('email');

  startTransition(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/newsletter/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to save email');

      toast.success('Subscribed successfully!');
    } catch (err) {
      toast.error('Failed to subscribe');
    }
  });
}
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">TxiGo</h2>
          <p className="text-gray-400">Your trusted cab booking partner.</p>

          {/* Social Media */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 rounded-full"
              >
                <Facebook className="text-white hover:text-blue-400 transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 rounded-full"
              >
                <Instagram className="text-white hover:text-pink-500 transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 rounded-full"
              >
                <Twitter className="text-white hover:text-blue-400 transition-colors" />
              </Button>
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:underline hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/investors" className="hover:underline hover:text-white transition-colors">Investor Relations</Link></li>
            <li><Link href="/media-coverage" className="hover:underline hover:text-white transition-colors">Media Coverage</Link></li>
            <li><Link href="/careers" className="hover:underline hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/privacyPolicy" className="hover:underline hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/refunds" className="hover:underline hover:text-white transition-colors">Refunds</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Services</h3>
          <ul className="space-y-2">
            <li><Link href="/services/local-rentals" className="hover:underline hover:text-white transition-colors">Local Car Rentals</Link></li>
            <li><Link href="/services/outstation" className="hover:underline hover:text-white transition-colors">Outstation Taxi</Link></li>
            <li><Link href="/oneWayCabs" className="hover:underline hover:text-white transition-colors">One way cabs</Link></li>
            <li><Link href="/services/corporate" className="hover:underline hover:text-white transition-colors">Corporate Car Rental</Link></li>
            <li><Link href="/services/airport" className="hover:underline hover:text-white transition-colors">Airport Taxi</Link></li>
            <li><Link href="/services/tempo-travellers" className="hover:underline hover:text-white transition-colors">Tempo Travellers and Minibuses</Link></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Get in Touch</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} /> +1 234 567 890
              </p>
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={16} /> support@cabgo.com
              </p>
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                123 Main Street, Cityville
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/contact-us" className="block hover:underline hover:text-white transition-colors">Contact Us</Link>
              <Link href="/travel-agent" className="block hover:underline hover:text-white transition-colors">Travel Agent</Link>
              <Link href="/sitemap" className="block hover:underline hover:text-white transition-colors">Sitemap</Link>
              <Link href="/xml-sitemap" className="block hover:underline hover:text-white transition-colors">XML Sitemap</Link>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
              <div className="flex">
                <form action={handleAction}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="px-3 py-2 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded-r transition-colors"
                  >
                    {isPending ? 'Sending...' : 'Subscribe'}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} CabGo. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:underline hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:underline hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}