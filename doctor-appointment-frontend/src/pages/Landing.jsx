import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, FileText, ShieldCheck, Stethoscope ,HeartPulse} from "lucide-react";

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="brand"><span className="brand-icon"><Stethoscope size={22}/></span>MediCare</div>
        <div className="nav-actions">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Create account</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Simple healthcare management</span>
          <h1>Connect patients and doctors in one place.</h1>
          <p>Describe your health concern, let doctors review patient information, and receive prescriptions digitally.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Get started <ArrowRight size={18}/></Link>
            <Link to="/login" className="btn btn-secondary btn-lg">I already have an account</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-top">
            <span className="status-dot"></span>
            <span>Healthcare dashboard</span>
          </div>
          <div className="health-icon"><HeartPulse size={48}/></div>
          <h3>Care made simpler</h3>
          <p>Manage patient information and prescriptions from a clean, focused dashboard.</p>
        </div>
      </section>

      <section className="feature-grid">
        <Feature icon={<CalendarCheck/>} title="Patient dashboard" text="Submit your disease information and check your prescription." />
        <Feature icon={<FileText/>} title="Digital prescriptions" text="Doctors can upload prescriptions and patients can access them online." />
        <Feature icon={<ShieldCheck/>} title="Role-based access" text="Patient and doctor areas are separated using your logged-in role." />
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return <div className="feature-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>;
}