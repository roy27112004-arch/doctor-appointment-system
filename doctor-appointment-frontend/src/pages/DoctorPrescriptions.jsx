import React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";
import Loading from "../components/Loading";
import Message from "../components/Message";

export default function DoctorPrescriptions() {
  const [state, setState] = useState({ loading: true, error: "", items: [] });

  useEffect(() => {
    api.get("/auth/cheakprescribe")
      .then(response => setState({ loading: false, error: "", items: response.data.rawfiles || [] }))
      .catch(err => setState({ loading: false, error: err.response?.data?.massage || "Could not load prescriptions.", items: [] }));
  }, []);

  return (
    <>
      <Link className="back-link" to="/doctor"><ArrowLeft size={16}/> Back to dashboard</Link>
      <div className="page-header"><h1>Prescriptions</h1><p>View prescriptions that have been uploaded.</p></div>
      <div className="content-card">
        {state.loading ? <Loading text="Loading prescriptions..." /> : state.error ? <Message type="error">{state.error}</Message> : state.items.length === 0 ? <Message type="info">No prescriptions found.</Message> : (
          <div className="prescription-list">
            {state.items.map((item, index) => (
              <div className="prescription-row" key={`${item.name}-${index}`}>
                <div className="feature-icon"><FileText/></div>
                <div><strong>{item.name}</strong><span>Prescription document</span></div>
                <a href={item.prescription} target="_blank" rel="noreferrer" className="btn btn-secondary">Open <ExternalLink size={16}/></a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}