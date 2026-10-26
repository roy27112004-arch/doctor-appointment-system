import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeartPulse, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Message from "../components/Message";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [state, setState] = useState({ loading: false, error: "" });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: "" });
    try {
      const data = await login(form);
      navigate(data.user?.role === "Doctor" ? "/doctor" : "/patient", { replace: true });
    } catch (err) {
      setState({ loading: false, error: err.response?.data?.massage || "Login failed. Please check your details." });
    }
  };

  return (
    <AuthPage title="Welcome back" subtitle="Sign in to continue to your MediCare dashboard.">
      <form onSubmit={submit} className="form">
        <Message type="error">{state.error}</Message>
        <Field icon={<UserRound/>} label="Username">
          <input required value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="Enter username" />
        </Field>
        <Field icon={<Mail/>} label="Email">
          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Enter email" />
        </Field>
        <Field icon={<LockKeyhole/>} label="Password">
          <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Enter password" />
        </Field>
        <button className="btn btn-primary btn-full" disabled={state.loading}>
          {state.loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="form-footer">Don't have an account? <Link to="/register">Create one</Link></p>
      </form>
    </AuthPage>
  );
}

function AuthPage({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-brand"><span className="brand-icon"><HeartPulse/></span> MediCare</div>
      <div className="auth-card">
        <div className="auth-heading"><h1>{title}</h1><p>{subtitle}</p></div>
        {children}
      </div>
    </div>
  );
}

function Field({ icon, label, children }) {
  return <label className="field"><span>{label}</span><div className="input-wrap">{icon}{children}</div></label>;
}