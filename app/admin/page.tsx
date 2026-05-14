import { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard — ResumeBoosters",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
