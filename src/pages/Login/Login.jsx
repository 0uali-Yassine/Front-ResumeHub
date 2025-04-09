import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard");
      } else {
        setError(response?.data?.message || "Login failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <div
          className={`bg-white p-5 rounded-4 shadow-lg mx-3 w-100`}
          style={{
            maxWidth: "500px",
            transition: "all 0.5s ease",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div
            className="badge mb-3 px-3 py-2 rounded-pill"
            style={{
              backgroundColor: "rgba(108, 92, 231, 0.1)",
              color: "#6c5ce7",
            }}
          >
            <span
              className="spinner-grow spinner-grow-sm me-2"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            ></span>
            Welcome Back!
          </div>

          <h2 className="fw-bold mb-4 text-center" style={{ color: "#6c5ce7" }}>
            Access Your Resume
          </h2>

          <form
            onSubmit={handleLogin}
            className="d-flex flex-column gap-3"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Email"
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control rounded-pill px-4 py-2"
            />

            {error && <p className="text-danger small mb-0">{error}</p>}

            <button
              className="btn btn-lg w-100 rounded-pill"
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#6c5ce7",
                color: "white",
                fontWeight: "500",
                boxShadow: "0 4px 15px rgba(108, 92, 231, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(108, 92, 231, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(108, 92, 231, 0.3)";
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging In...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center mt-3 text-muted">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#6c5ce7", fontWeight: "500" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Login;
