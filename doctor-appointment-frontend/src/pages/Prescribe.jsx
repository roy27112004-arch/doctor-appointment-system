import React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, FileUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import Message from "../components/Message";

export default function Prescribe() {
  const location = useLocation();
  const selected = location.state?.patient;
  const [form, setForm] = useState({ patientID: selected?.patient || selected?._id || "", name: selected?.username || "" });
  const [file, setFile] = useState(null);
  const [state, setState] = useState({ loading: false, error: "", success: "" });

  useEffect(() => {
    if (selected) setForm({ patientID: selected.patient || selected._id || "", name: selected.username || "" });
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      setState({ loading: false, error: "Please select the prescription file.", success: "" });
      return;
    }
    if (!form.patientID || !form.name) {
      setState({ loading: false, error: "Patient ID and patient name are required.", success: "" });
      return;
    }

    const data = new FormData();
    data.append("patientID", form.patientID);
    data.append("name", form.name);
    data.append("prescription", file);

    setState({ loading: true, error: "", success: "" });
    try {
      const response = await api.post("/auth/prescribe", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setState({ loading: false, error: "", success: response.data.massage || "Prescription uploaded successfully." });
      setFile(null);
    } catch (err) {
      setState({ loading: false, error: err.response?.data?.massage || "Prescription upload failed.", success: "" });
    }
  };

  return (
    <>
      <Link className="back-link" to="/doctor"><ArrowLeft size={16}/> Back to dashboard</Link>
      <div className="page-header"><h1>Prescribe medicine</h1><p>Upload a prescription for a patient.</p></div>
      <div className="content-card narrow">
        <Message type="error">{state.error}</Message>
        <Message type="success">{state.success}</Message>
        <form onSubmit={submit} className="form">
          <label className="field"><span>Patient ID</span><input required value={form.patientID} onChange={e => setForm({...form, patientID: e.target.value})} placeholder="Paste patient ObjectId" /></label>
          <label className="field"><span>Patient name</span><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Patient username" /></label>
          <label className="file-upload">
            <FileUp size={25}/>
            <strong>{file ? file.name : "Choose prescription file"}</strong>
            <small>PDF recommended</small>
            <input type="file" accept=".pdf,application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
          </label>
          <button className="btn btn-primary btn-full" disabled={state.loading}>{state.loading ? "Uploading..." : "Upload prescription"}</button>
        </form>
      </div>
    </>
  );
}