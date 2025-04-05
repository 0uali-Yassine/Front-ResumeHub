import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

 

  return (
    <section className="section">
      <div className="w-96 border rounded-[10px] bg-white px-7 py-10">
        <h1 className="text-primary">Access your thoughts</h1>
        <form  className=" flex justify-center items-center flex-col gap-2 py-5">
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
         
          <button className="btn-primary" type="submit" >Create an account</button>
        </form>
        <p>Already have an account? <Link to="/" className="text-primary">Login</Link></p>    
      </div>
    </section>
  )
}

export default SignUp