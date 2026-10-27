import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-brand">
          <div className="logo">AS</div>

          <h1>AntiSleep</h1>
          <p>AI Driver Safety System</p>
        </div>

        <div className="login-card">

          <h2>Welcome Back</h2>
          <p className="login-description">
            Sign in to your driver dashboard
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="driver@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>

        </div>

        <p className="safety-text">
          Helping drivers stay alert. Helping roads stay safer.
        </p>

      </div>

    </div>
  );
}

export default Login;