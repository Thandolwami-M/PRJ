import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-brand">
          <div className="register-logo">AS</div>
          <h1>AntiSleep</h1>
          <p>AI Driver Safety System</p>
        </div>

        <div className="register-card">
          <h2>Create Account</h2>
          <p className="register-description">
            Create your driver account
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="driver@example.com" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" />
            </div>

            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;