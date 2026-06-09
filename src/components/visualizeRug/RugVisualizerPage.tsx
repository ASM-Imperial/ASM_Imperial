import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RugViz from "./RugViz"; // adjust path
import Footer from "../ui/Footer";

export default function RugVisualizerPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [payload, setPayload] = useState(state || null);

  // Fallback for refresh: read from localStorage
  useEffect(() => {
    if (!payload) {
      const raw = localStorage.getItem("rugviz_payload");
      if (raw) setPayload(JSON.parse(raw));
    }
  }, [payload]);

  if (!payload) {
    return (
      <div style={{ padding: 16 }}>
        <p>No rug data found. Please customize a rug first.</p>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

  return (
    <>
    <RugViz
      apiEndpoint="https://modernnaturedesignnepal46--sam3-flask-api-create-wsgi.modal.run/api/analyze"
      rugImageUrl={payload.rugImageUrl}
      rugName={payload.rugName}
      onExit={() => navigate(-1)}
      onProductPage={() => navigate(`/collections`)}
    />

    <Footer />
    </>
  );
}
