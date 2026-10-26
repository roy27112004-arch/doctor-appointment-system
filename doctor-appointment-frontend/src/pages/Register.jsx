import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Message from "../components/Message";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "patient" });
  const [state, setState] = useState({ loading: false, error: "", success: "" });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: "", success: "" });
    try {
      await register(form);
      setState({ loading: false, error: "", success: "Account created. Please log in to continue." });
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setState({ loading: false, error: err.response?.data?.massage || "Registration failed.", success: "" });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand"><span className="brand-icon"><HeartPulse/></span> MediCare</div>
      <div className="auth-card">
        <div className="auth-heading"><h1>Create your account</h1><p>Choose your role and enter your account details.</p></div>
        <form onSubmit={submit} className="form">
          <Message type="error">{state.error}</Message>
          <Message type="success">{state.success}</Message>
          <Field icon={<UserRound/>} label="Username">
            <input required value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="Choose a username" />
          </Field>
          <Field icon={<Mail/>} label="Email">
            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
          </Field>
          <Field icon={<LockKeyhole/>} label="Password">
            <input required minLength={6} type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Create a password" />
          </Field>
          <label className="field"><span>Account type</span>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
              <option value="patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </label>
          <button className="btn btn-primary btn-full" disabled={state.loading}>
            {state.loading ? "Creating..." : "Create account"}
          </button>
          <p className="form-footer">Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

function Field({ icon, label, children }) {
  return <label className="field"><span>{label}</span><div className="input-wrap">{icon}{children}</div></label>;
}