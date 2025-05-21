'use client';

import { useEffect, useState } from 'react';

type Application = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  createdAt: string;
};

export default function CareersPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/career/getAll`); // your API endpoint
        if (!res.ok) throw new Error('Failed to fetch applications');
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Job Title</th>
              <th className="border border-gray-300 px-4 py-2">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{app.name}</td>
                <td className="border border-gray-300 px-4 py-2">{app.email}</td>
                <td className="border border-gray-300 px-4 py-2">{app.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{app.jobTitle}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
