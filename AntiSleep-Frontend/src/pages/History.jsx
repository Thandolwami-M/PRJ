import "./History.css";
import { Link } from "react-router-dom";

function History() {
  const driveHistory =
    JSON.parse(localStorage.getItem("driveHistory")) || [];

  return (
    <div className="history-page">

      <header className="history-header">
        <div className="history-brand">
          <div className="history-logo">AS</div>

          <div>
            <h2>AntiSleep</h2>
            <p>Driver Safety System</p>
          </div>
        </div>

        <Link to="/dashboard" className="history-back">
          ← Dashboard
        </Link>
      </header>

      <main className="history-content">

        <h1>Driving History</h1>
        <p>Review your previous driving and monitoring sessions.</p>

        <div className="history-card">
          <h2>Your Drives</h2>

          {driveHistory.length > 0 ? (
            driveHistory.map((drive, index) => (
              <div className="history-empty" key={index}>

                <h3>{drive.date}</h3>

                <p>
                  Duration: {Math.floor(drive.duration / 60)}:
                  {String(drive.duration % 60).padStart(2, "0")}
                </p>

                <p>
                  Drowsiness Alerts: {drive.alerts}
                </p>

                <p>
                  Final Status:{" "}
                  {drive.status ||
                    (drive.alerts > 0
                      ? "Drowsiness Detected"
                      : "Safe")}
                </p>

              </div>
            ))
          ) : (
            <div className="history-empty">
              <h3>No driving history yet</h3>
              <p>Your completed driving sessions will appear here.</p>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default History;