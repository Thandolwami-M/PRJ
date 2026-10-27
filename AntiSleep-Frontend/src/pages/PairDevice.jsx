import "./PairDevice.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function PairDevice() {
  const [pairingStatus, setPairingStatus] = useState(
    localStorage.getItem("glassesConnected") === "true"
      ? "connected"
      : "idle"
  );

  return (
    <div className="pair-page">

      <div className="pair-container">

        <div className="pair-brand">
          <div className="pair-logo">AS</div>

          <div>
            <h2>AntiSleep</h2>
            <p>Driver Safety System</p>
          </div>
        </div>

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <div className="pair-card">
          <h1>Pair Your Glasses</h1>

          <p>
            Connect your AntiSleep glasses before starting a driving session.
          </p>

          {pairingStatus !== "connected" && (
            <button
              className="scan-button"
              onClick={() => {
                setPairingStatus("scanning");

                setTimeout(() => {
                  setPairingStatus("found");
                }, 2000);
              }}
            >
              {pairingStatus === "scanning"
                ? "Scanning..."
                : "Scan for Glasses"}
            </button>
          )}

          {pairingStatus === "found" && (
            <div className="device-found">
              <div>
                <h3>AntiSleep Glasses</h3>
                <p>Device found and ready to pair</p>
              </div>

              <button
                className="connect-button"
                onClick={() => {
                  setPairingStatus("connected");
                  localStorage.setItem("glassesConnected", "true");
                }}
              >
                Connect
              </button>
            </div>
          )}

          {pairingStatus === "connected" && (
            <div className="device-connected">
              <h3>✓ Glasses Connected</h3>

              <p>
                AntiSleep Glasses are ready for driver monitoring.
              </p>

              <Link to="/dashboard" className="continue-button">
                Continue to Dashboard
              </Link>

              <button
                className="disconnect-button"
                onClick={() => {
                  localStorage.removeItem("glassesConnected");
                  setPairingStatus("idle");
                }}
              >
                Disconnect Glasses
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default PairDevice;