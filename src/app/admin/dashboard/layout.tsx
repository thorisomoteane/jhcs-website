import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin/dashboard">) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 overflow-x-auto">
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
