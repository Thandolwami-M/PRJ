import "./TripSummary.css";
import { useNavigate } from "react-router-dom";

function TripSummary() {
  const navigate = useNavigate();

  const alertCount =
    Number(localStorage.getItem("lastDriveAlerts")) || 0;

  const driveDuration =
    Number(localStorage.getItem("lastDriveDuration")) || 0;

  const finalStatus =
    alertCount > 0 ? "Drowsiness Detected" : "Safe";

  return (
    <div className="summary-page">

      <div className="summary-container">

        <div className="summary-header">
          <div className="summary-logo">AS</div>

          <div>
            <h2>AntiSleep</h2>
            <p>Driver Safety System</p>
          </div>
        </div>

        <div className="summary-card">

          <h1>Drive Complete</h1>

          <p className="summary-message">
            Your driving session has ended successfully.
          </p>

          <div className="summary-stats">

            <div className="summary-stat">
              <p>Drive Duration</p>
              <h3>
                {Math.floor(driveDuration / 60)}:
                {String(driveDuration % 60).padStart(2, "0")}
              </h3>
            </div>

            <div className="summary-stat">
              <p>Drowsiness Alerts</p>
              <h3>{alertCount}</h3>
            </div>

            <div className="summary-stat">
              <p>Final Status</p>
              <h3>{finalStatus}</h3>
            </div>

          </div>

          <button
            className="dashboard-button"
            onClick={() => navigate("/dashboard")}
          >
            Return to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default TripSummary;