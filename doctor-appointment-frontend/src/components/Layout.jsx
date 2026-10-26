import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HeartPulse, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Layout({ role }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const patientLinks = [
    ["/patient", "Dashboard"],
    ["/patient/disease", "Describe Disease"],
    ["/patient/prescription", "My Prescription"],
  ];

  const doctorLinks = [
    ["/doctor", "Dashboard"],
    ["/doctor/patients", "Patients"],
    ["/doctor/prescribe", "Prescribe"],
    ["/doctor/prescriptions", "Prescriptions"],
  ];

  const links = role === "Doctor" ? doctorLinks : patientLinks;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <NavLink to={role === "Doctor" ? "/doctor" : "/patient"} className="brand">
          <span className="brand-icon"><HeartPulse size={22} /></span>
          <span>MediCare</span>
        </NavLink>
        <div className="user-chip">
          <div className="avatar">{user?.username?.[0]?.toUpperCase() || "U"}</div>
          <div className="user-chip-text">
            <strong>{user?.username}</strong>
            <small>{role === "Doctor" ? "Doctor" : "Patient"}</small>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <nav>
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/patient" || to === "/doctor"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}