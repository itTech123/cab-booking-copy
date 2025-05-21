import ClientAdminLayout from "@/components/admin/clientAdminlayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
