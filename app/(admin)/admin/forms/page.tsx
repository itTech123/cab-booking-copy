'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function AllForms() {
  const [corporates, setCorporates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletter, setNewsletter] = useState<string[]>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Corporate
        const corpRes = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/corporate/getAll`);
        setCorporates(await corpRes.json());

        // Contact
        const contactRes = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/contact/getAll`);
        setContacts(await contactRes.json());

        // Newsletter
        const newsRes = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/newsletter/getAll`);
        const newsData: { email: string }[] = await newsRes.json();
        // extract just the email strings
        setNewsletter(newsData.map((n) => n.email));
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (data: any) => {
    setModalData(data);
    setOpen(true);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Corporate Requirement Table */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Corporate Requirement Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Company</th>
              </tr>
            </thead>
            <tbody>
              {corporates.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.contact}</td>
                  <td className="border px-4 py-2">{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Contact Request Table */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Contact Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Subject</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Newsletter Subscriptions (no modal) */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Newsletter Subscriptions</h2>
        <ul className="list-disc list-inside space-y-1">
          {newsletter.map((email, idx) => (
            <li key={idx} className="px-2 py-1 border rounded">
              {email}
            </li>
          ))}
        </ul>
      </Card>

      {/* Modal for Corporate/Contact Details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>Full information about the request.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {modalData &&
              Object.entries(modalData)
                .filter(([key]) => key !== '_id' && key !== '__v')
                .map(([key, value]) => (
                  <div key={key}>
                    <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
                    <span>{String(value)}</span>
                  </div>
                ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
