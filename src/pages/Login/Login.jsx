import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }  
    if(password.length < 6) {
      setError("Password must be at least 6 characters long")
      return;
    }
    
    setError(null);

    // try successful login
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      // handle success response
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard");
      } else {
        setError(response?.data?.message);
      }
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Invalid credentials");
    }

  };
  

  return (
    <section className="section">
    <Navbar />
    <div className="container w-50 border rounded-3 bg-white mt-4 px-4 py-5">
      <h1 className="text-primary text-center">Access Your Resume</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column justify-content-center align-items-center gap-3 py-4">
        <div className="mb-3 w-100">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
          />
        </div>
        <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="text-danger text-start small mb-1">{error}</p>}
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
      <p className="text-center">Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
    </div>
  </section>
  
  )
}

export default Login