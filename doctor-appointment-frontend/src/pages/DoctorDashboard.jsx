import React from "react";
import { Link } from "react-router-dom";
import { FileText, HeartPulse, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
  return (
    <>
      <div className="page-header"><h1>Doctor dashboard</h1><p>Welcome, Dr. {user?.username || "Doctor"}. Manage patients and prescriptions.</p></div>
      <div className="stats-grid">
        <Stat icon={<Users/>} title="Patients" value="Review patient list" />
        <Stat icon={<FileText/>} title="Prescriptions" value="Manage digitally" />
      </div>
      <div className="section-grid">
        <ActionCard icon={<Users/>} title="Patient list" text="Review submitted disease information and identify patients who need a prescription." to="/doctor/patients" button="View patients" />
        <ActionCard icon={<FileText/>} title="Prescribe medicine" text="Upload a prescription PDF for an existing patient." to="/doctor/prescribe" button="Create prescription" />
      </div>
    </>
  );
}

function Stat({ icon, title, value }) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><span>{title}</span><strong>{value}</strong></div></div>;
}
function ActionCard({ icon, title, text, to, button }) {
  return <div className="action-card"><div className="action-icon">{icon}</div><h3>{title}</h3><p>{text}</p><Link className="btn btn-secondary" to={to}>{button}</Link></div>;
}