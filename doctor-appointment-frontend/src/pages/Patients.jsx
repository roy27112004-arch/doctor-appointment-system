import React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";
import Loading from "../components/Loading";
import Message from "../components/Message";

export default function Patients() {
  const [state, setState] = useState({ loading: true, error: "", patients: [] });

  useEffect(() => {
    api.get("/list/patientlist")
      .then(response => {
        const raw = response.data.patientlist || [];
        const patients = Array.isArray(raw[0]) ? raw[0] : raw;
        setState({ loading: false, error: "", patients });
      })
      .catch(err => setState({ loading: false, error: err.response?.data?.massage || "Could not load patients.", patients: [] }));
  }, []);

  return (
    <>
      <Link className="back-link" to="/doctor"><ArrowLeft size={16}/> Back to dashboard</Link>
      <div className="page-header"><h1>Patient list</h1><p>Review disease information submitted by patients.</p></div>
      <div className="content-card">
        {state.loading ? <Loading text="Loading patients..." /> : state.error ? <Message type="error">{state.error}</Message> : state.patients.length === 0 ? <Message type="info">No patient records found.</Message> : (
          <div className="patient-grid">
            {state.patients.map((patient, index) => (
              <div className="patient-card" key={patient._id || `${patient.patient}-${index}`}>
                <div className="patient-head">
                  <div className="avatar large">{patient.username?.[0]?.toUpperCase() || "P"}</div>
                  <div><h3>{patient.username}</h3><span>{patient.age} years old</span></div>
                </div>
                <div className="patient-info"><span><Mail size={15}/> {patient.email}</span><span><UserRound size={15}/> ID: {String(patient.patient || "").slice(-8) || "N/A"}</span></div>
                <div className="disease-box"><strong>Health concern</strong><p>{patient.disease}</p></div>
                <Link to="/doctor/prescribe" state={{ patient }} className="btn btn-primary btn-full">Prescribe for patient</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}