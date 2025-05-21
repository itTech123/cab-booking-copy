'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function ClientAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const adminData = localStorage.getItem('isAdmin');
        
        if (!adminData) {
          router.push('/adminLogin');
          return;
        }

        // Parse the stored JSON
        const parsedData = JSON.parse(adminData);
        
        // Check if the value is true AND not expired
        const now = new Date().getTime();
        if (parsedData.value === 'true' && parsedData.expiry > now) {
          setIsChecking(false);
        } else {
          router.push('/adminLogin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/adminLogin');
      }
    };

    checkAdmin();
  }, [router]);

  if (isChecking) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 w-full overflow-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}