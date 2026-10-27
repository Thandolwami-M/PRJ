import "./LiveDrive.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LiveDrive() {
  const navigate = useNavigate();

  const [isDrowsy, setIsDrowsy] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const glassesConnected =
    localStorage.getItem("glassesConnected") === "true";

  const alertSound =
    localStorage.getItem("alertSound") !== "false";

  const vibrationAlert =
    localStorage.getItem("vibrationAlert") !== "false";

  useEffect(() => {
    if (!glassesConnected) {
      navigate("/dashboard");
      return;
    }

    const timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [glassesConnected, navigate]);

  const playAlertSound = () => {
    if (!alertSound) {
      return;
    }

    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(
      0.3,
      audioContext.currentTime
    );

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.5
    );
  };

  return (
    <div className="live-drive-page">

      <header className="live-drive-header">
        <div>
          <h2>AntiSleep</h2>
          <p>Live Driver Monitoring</p>
        </div>

        <span className="monitoring-status">
          Monitoring Active
        </span>
      </header>

      <main className="live-drive-content">

        <div
          className={`driver-status-panel ${
            isDrowsy ? "drowsy" : "awake"
          }`}
        >
          <p>Driver Status</p>

          <h1>
            {isDrowsy ? "DROWSINESS DETECTED" : "AWAKE"}
          </h1>

          <span>
            {isDrowsy
              ? "Driver appears drowsy — take a break."
              : "No signs of drowsiness detected"}
          </span>
        </div>

        <div className="live-stats">

          <div className="live-stat-card">
            <p>Drive Time</p>
            <h3>
              {Math.floor(seconds / 60)}:
              {String(seconds % 60).padStart(2, "0")}
            </h3>
          </div>

          <div className="live-stat-card">
            <p>Glasses</p>
            <h3>Connected</h3>
          </div>

          <div className="live-stat-card">
            <p>Battery</p>
            <h3>85%</h3>
          </div>

          <div className="live-stat-card">
            <p>Drowsiness Alerts</p>
            <h3>{alertCount}</h3>
          </div>

          <div className="live-stat-card">
            <p>Vibration Alert</p>
            <h3>{vibrationAlert ? "ON" : "OFF"}</h3>
          </div>

        </div>

        <button
          className="simulate-drowsy-button"
          onClick={() => {
            if (!isDrowsy) {
              setAlertCount((count) => count + 1);
              playAlertSound();
            }

            setIsDrowsy(true);
          }}
        >
          Simulate Drowsiness
        </button>

        <button
          className="simulate-awake-button"
          onClick={() => setIsDrowsy(false)}
        >
          Simulate Awake
        </button>

        <button
          className="end-drive-button"
          onClick={() => {
            localStorage.setItem("lastDriveAlerts", alertCount);
            localStorage.setItem("lastDriveDuration", seconds);

            const finalStatus =
              alertCount > 0 ? "Drowsiness Detected" : "Safe";

            const completedDrive = {
              duration: seconds,
              alerts: alertCount,
              status: finalStatus,
              date: new Date().toLocaleString(),
            };

            localStorage.setItem(
              "lastCompletedDrive",
              JSON.stringify(completedDrive)
            );

            const savedHistory =
              JSON.parse(localStorage.getItem("driveHistory")) || [];

            const updatedHistory = [
              completedDrive,
              ...savedHistory,
            ];

            localStorage.setItem(
              "driveHistory",
              JSON.stringify(updatedHistory)
            );

            navigate("/trip-summary");
          }}
        >
          End Drive
        </button>

      </main>

    </div>
  );
}

export default LiveDrive;