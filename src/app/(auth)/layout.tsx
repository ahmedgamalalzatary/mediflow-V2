import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Mediflow",
  description: "Sign in or create your Mediflow account to access healthcare services.",
};

export default function AuthLayout({
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