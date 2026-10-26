import React from "react";
import { useState } from "react";
import { Activity, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";
import Message from "../components/Message";

export default function Disease() {
  const [form, setForm] = useState({ age: "", disease: "" });
  const [state, setState] = useState({ loading: false, error: "", success: "" });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: "", success: "" });
    try {
      const response = await api.post("/dis/disease", { age: Number(form.age), disease: form.disease });
      setState({ loading: false, error: "", success: response.data.massage || "Disease information submitted successfully." });
      setForm({ age: "", disease: "" });
    } catch (err) {
      setState({ loading: false, error: err.response?.data?.massage || "Could not submit your information.", success: "" });
    }
  };

  return (
    <>
      <Link className="back-link" to="/patient"><ArrowLeft size={16}/> Back to dashboard</Link>
      <div className="page-header"><h1>Describe your disease</h1><p>Enter your age and describe your current health concern.</p></div>
      <div className="content-card narrow">
        <div className="card-title"><div className="feature-icon"><Activity/></div><div><h2>Health information</h2><p>This information will be available to the doctor.</p></div></div>
        <Message type="error">{state.error}</Message>
        <Message type="success">{state.success}</Message>
        <form onSubmit={submit} className="form">
          <label className="field"><span>Age</span><input required min="1" max="120" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="Enter your age" /></label>
          <label className="field"><span>Disease / health concern</span><textarea required rows="6" value={form.disease} onChange={e => setForm({...form, disease: e.target.value})} placeholder="Describe your disease or symptoms..." /></label>
          <button className="btn btn-primary btn-full" disabled={state.loading}>{state.loading ? "Submitting..." : "Submit disease information"}</button>
        </form>
      </div>
    </>
  );
}