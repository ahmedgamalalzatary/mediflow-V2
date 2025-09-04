import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Mediflow",
  description: "Manage your healthcare appointments, records, and communications.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}