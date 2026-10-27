import "./Settings.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Settings() {
  const [alertSound, setAlertSound] = useState(
    localStorage.getItem("alertSound") !== "false"
  );

  const [vibrationAlert, setVibrationAlert] = useState(
    localStorage.getItem("vibrationAlert") !== "false"
  );

  const handleAlertSound = () => {
    const newValue = !alertSound;

    setAlertSound(newValue);

    localStorage.setItem(
      "alertSound",
      newValue.toString()
    );
  };

  const handleVibrationAlert = () => {
    const newValue = !vibrationAlert;

    setVibrationAlert(newValue);

    localStorage.setItem(
      "vibrationAlert",
      newValue.toString()
    );
  };

  return (
    <div className="settings-page">

      <header className="settings-header">
        <div className="settings-brand">
          <div className="settings-logo">AS</div>

          <div>
            <h2>AntiSleep</h2>
            <p>Driver Safety System</p>
          </div>
        </div>

        <Link to="/dashboard" className="settings-back">
          ← Dashboard
        </Link>
      </header>

      <main className="settings-content">

        <h1>Settings</h1>

        <p>
          Manage your AntiSleep preferences and device settings.
        </p>

        <div className="settings-card">

          <div>
            <h3>Alert Sound</h3>

            <p>
              Enable dashboard warning sounds when drowsiness is detected.
            </p>
          </div>

          <button
            className={`setting-toggle ${
              alertSound ? "sound-on" : "sound-off"
            }`}
            onClick={handleAlertSound}
          >
            {alertSound ? "ON" : "OFF"}
          </button>

        </div>

        <div className="settings-card">

          <div>
            <h3>Vibration Alert</h3>

            <p>
              Enable vibration alerts on the AntiSleep glasses when
              drowsiness is detected.
            </p>
          </div>

          <button
            className={`setting-toggle ${
              vibrationAlert ? "sound-on" : "sound-off"
            }`}
            onClick={handleVibrationAlert}
          >
            {vibrationAlert ? "ON" : "OFF"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default Settings;