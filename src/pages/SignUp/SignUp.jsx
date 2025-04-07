import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/PasswordInput";

const SignUp = () => {

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleSignUp =  (e) => {
    e.preventDefault()
    if(fullName.length < 4 || fullName.length > 25) {
      setError("Name must be between 4 and 25 characters long")
      return;
    }
    if(!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }
    if(password.length < 6) {
      setError("Password must be at least 6 characters long")
      return;
    }
    setError(null);
  }

  return (
    <section className="section">
          <Navbar />
      <div className="container w-50 border rounded-3 bg-white mt-5 px-4 py-5">
        <h1 className="text-primary text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="d-flex flex-column justify-content-center align-items-center gap-3 py-4">
          <div className="mb-3 w-100">
            <input
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-3 w-100">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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
          <button className="btn btn-primary w-100" type="submit">
            Create an account
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/" className="text-primary">Login</Link>
        </p>
      </div>
    </section>

  )
}

export default SignUp