import React from "react";
import { Link } from "react-router-dom";
import { FileText, HeartPulse, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PatientDashboard() {
  const { user } = useAuth();
  return (
    <>
      <PageHeader title={`Hello, ${user?.username || "Patient"}`} subtitle="Manage your health information from your dashboard." />
      <div className="stats-grid">
        <Stat icon={<HeartPulse/>} title="Patient account" value="Active" />
        <Stat icon={<FileText/>} title="Prescription" value="Check below" />
      </div>
      <div className="section-grid">
        <ActionCard icon={<Search/>} title="Describe your disease" text="Submit your age and current disease information for the doctor." to="/patient/disease" button="Submit information" />
        <ActionCard icon={<FileText/>} title="View prescription" text="Check whether your prescription is ready and open the uploaded file." to="/patient/prescription" button="View prescription" />
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

function PageHeader({ title, subtitle }) {
  return <div className="page-header"><h1>{title}</h1><p>{subtitle}</p></div>;
}