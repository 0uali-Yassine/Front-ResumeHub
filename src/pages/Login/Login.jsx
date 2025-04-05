import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import { validateEmail } from "../../utils/helper";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('ezretz')
    if(!validateEmail(email)) {
      console.log(error)
      setError("Please enter a valide email address")
      return;
    }  
    if(password.length < 6) {
      setError("Password must be at least 6 characters long")
      return;
    }
    
    setError(null);

    // Simulate successful login
    navigate("/dashboard");

  };
  

  return (
    <section className="section">
    <Navbar />
    <div className="container w-50 border rounded-3 bg-white px-4 py-5">
      <h1 className="text-primary">Access Your Resume</h1>
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