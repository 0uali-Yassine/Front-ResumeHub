import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
const Login = () => {

  // Instead of creating email state and pass create a state called formData and store all the data there !!!
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  

  return (
    <section className="section">
      <div className="w-96 border rounded-[10px] bg-white px-7 py-10">
        <h1 className="text-primary">Access your thoughts</h1>
        <form onSubmit={handleSubmit} className=" flex justify-center items-center flex-col gap-2 py-5">
          <input
            type="email"
            className="input-box"
            placeholder="email"
            required />
          <button className="btn-primary" type="submit" >Login</button>
        </form>
        <p>Dont have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
      </div>
    </section>
  )
}

export default Login