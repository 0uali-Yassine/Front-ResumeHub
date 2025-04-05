import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../../components/PasswordInput"
import { validateEmail } from "../../utils/helper";
import axiosInstance  from "../../utils/axiosInstance";
const Login = () => {

  // Instead of creating email state and pass create a state called formData and store all the data there !!!
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)) {
      setError("Please enter a valide email address")
      return;
    }  
    if (!password) {
      setError("Please enter a password")
      return;
    }
    setError("")

    // Login API Call
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if(response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("fullName", response.data.fullName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.userId);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }else {
        setError("An unexpected error occurred. Please Try again")
      }
    }
  }
  return (
    <section className="section">
      <div className="w-96 border rounded-[10px] bg-white px-7 py-10">
        <h1 className="text-primary">Access your thoughts</h1>
        <form onSubmit={handleSubmit} className=" flex justify-center items-center flex-col gap-2 py-5">
          <input  
            type="email" 
            className="input-box" 
            placeholder="email"
            onChange={(e)=> setEmail(e.target.value)}
            required />
          <PasswordInput 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}  
          />
          {error && <p className="text-red-500 text-x5 pb-1"> {error} </p> }
          <button className="btn-primary" type="submit" >Login</button>
        </form>
        <p>Dont have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>    
      </div>
    </section>
  )
}

export default Login