import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const glassesConnected =
    localStorage.getItem("glassesConnected") === "true";

  const driveHistory =
    JSON.parse(localStorage.getItem("driveHistory")) || [];

  const latestDrive =
    driveHistory.length > 0 ? driveHistory[0] : null;

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-logo">AS</div>

          <div>
            <h2>AntiSleep</h2>
            <p>Driver Safety System</p>
          </div>
        </div>

        <div className="dashboard-user">

          <button onClick={() => navigate("/settings")}>
            Settings
          </button>

          <span>Driver</span>

          <button onClick={() => navigate("/")}>
            Logout
          </button>

        </div>
      </header>

      <main className="dashboard-content">

        <h1>Driver Dashboard</h1>
        <p>Monitor your AntiSleep glasses and driving activity.</p>

        {/* GLASSES STATUS */}
        <div className="status-card">
          <div>
            <h3>AntiSleep Glasses</h3>

            <p>
              {glassesConnected
                ? "Device connected and ready"
                : "No device connected"}
            </p>
          </div>

          <button
            className="pair-button"
            onClick={() => navigate("/pair-device")}
          >
            {glassesConnected ? "Manage Glasses" : "Pair Glasses"}
          </button>
        </div>

        {/* STATUS CARDS */}
        <div className="dashboard-stats">

          <div className="stat-card">
            <p>Connection</p>
            <h3>
              {glassesConnected ? "Connected" : "Disconnected"}
            </h3>
          </div>

          <div className="stat-card">
            <p>Battery</p>
            <h3>{glassesConnected ? "85%" : "--%"}</h3>
          </div>

          <div className="stat-card">
            <p>Driver Status</p>
            <h3>Not Monitoring</h3>
          </div>

        </div>

        {/* START DRIVE */}
        <div className="drive-section">
          <div>
            <h2>Ready to Drive?</h2>
            <p>
              Connect your AntiSleep glasses and start a monitoring session.
            </p>
          </div>

          <button
            className="start-drive-button"
            onClick={() => {
              if (glassesConnected) {
                navigate("/live-drive");
              } else {
                alert(
                  "Please connect your AntiSleep glasses before starting a drive."
                );
              }
            }}
          >
            Start Drive
          </button>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="recent-section">

          <div className="recent-header">
            <h2>Recent Driving Activity</h2>

            <button
              className="view-history-button"
              onClick={() => navigate("/history")}
            >
              View History
            </button>
          </div>

          {latestDrive ? (
            <div className="empty-activity">
              <h3>{latestDrive.date}</h3>

              <p>
                Duration: {Math.floor(latestDrive.duration / 60)}:
                {String(latestDrive.duration % 60).padStart(2, "0")}
              </p>

              <p>
                Drowsiness Alerts: {latestDrive.alerts}
              </p>

              <p>
                Final Status:{" "}
                {latestDrive.status ||
                  (latestDrive.alerts > 0
                    ? "Drowsiness Detected"
                    : "Safe")}
              </p>
            </div>
          ) : (
            <div className="empty-activity">
              <h3>No driving sessions yet</h3>
              <p>Your completed drives will appear here.</p>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;