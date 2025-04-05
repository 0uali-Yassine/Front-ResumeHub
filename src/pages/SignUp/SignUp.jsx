import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError("Please enter your fullName")
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valide email address")
      return;
    }  
    if (!password) {
      setError("Please enter a password")
      return;
    }
    setError("")

    // Sign Up API
    try {
      const response = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      if(response.data && response.data.error){
        setError(response.data.message);
        return;
      }
      navigate('/');

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
            type="text" 
            className="input-box" 
            placeholder="fullName"
            onChange={(e)=> setfullName(e.target.value)}
            required />
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
          <button className="btn-primary" type="submit" >Create an account</button>
        </form>
        <p>Already have an account? <Link to="/" className="text-primary">Login</Link></p>    
      </div>
    </section>
  )
}

export default SignUp