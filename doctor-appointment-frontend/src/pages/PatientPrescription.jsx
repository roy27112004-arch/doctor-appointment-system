import React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";
import Message from "../components/Message";
import Loading from "../components/Loading";

export default function PatientPrescription() {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/auth/getmedicine");
        setState({ loading: false, error: "", data: response.data });
      } catch (err) {
        setState({ loading: false, error: err.response?.data?.massage || "Your prescription is not available yet.", data: null });
      }
    };
    load();
  }, []);

  return (
    <>
      <Link className="back-link" to="/patient"><ArrowLeft size={16}/> Back to dashboard</Link>
      <div className="page-header"><h1>My prescription</h1><p>View the prescription uploaded for your account.</p></div>
      <div className="content-card">
        {state.loading ? <Loading text="Checking prescription..." /> : state.error ? <Message type="info">{state.error}</Message> : (
          <div className="prescription-view">
            <div className="feature-icon"><FileText/></div>
            <div><h2>Prescription ready</h2><p>Your doctor has uploaded a prescription for you.</p></div>
            <a className="btn btn-primary" href={state.data.prescript} target="_blank" rel="noreferrer">Open prescription <ExternalLink size={17}/></a>
          </div>
        )}
      </div>
    </>
  );
}