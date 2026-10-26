import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/PatientDashboard";
import Disease from "./pages/Disease";
import PatientPrescription from "./pages/PatientPrescription";
import DoctorDashboard from "./pages/DoctorDashboard";
import Patients from "./pages/Patients";
import Prescribe from "./pages/Prescribe";
import DoctorPrescriptions from "./pages/DoctorPrescriptions";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === "Doctor" ? "/doctor" : "/patient"} replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to={user.role === "Doctor" ? "/doctor" : "/patient"} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={user.role === "Doctor" ? "/doctor" : "/patient"} replace /> : <Register />} />

      <Route element={<ProtectedRoute role="patient" />}>
        <Route element={<Layout role="patient" />}>
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/disease" element={<Disease />} />
          <Route path="/patient/prescription" element={<PatientPrescription />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="Doctor" />}>
        <Route element={<Layout role="Doctor" />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/prescribe" element={<Prescribe />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}