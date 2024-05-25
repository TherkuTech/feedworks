/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("")
  const navigate = useNavigate();

  const handleSignup =  ()=>{
    navigate('/home')
  }
  return (
     <>
        <div className="relative h-[100vh] flex flex-col items-center justify-center bg-black">
    <div className="absolute bottom-10  flex items-center justify-center opacity-10 pointer-events-none">
      <p className="text-[10rem] hidden md:block text-white text-right p-[1rem]">Your Feedbacks into insightable actions</p>
    </div>
    <div className="relative z-10 container shadow-sm shadow-white flex flex-col">
      <div className="heading">Register</div>
      <form className="form" action="">
        <input
          placeholder="Username"
          id="username"
          type="text"
          className="input"
          required=""
          onChange={((e)=>setUsername(e.target.value))}
        />
          <input
          placeholder="E-Mail"
          id="email"
          type="email"
          className="input"
          required=""
          onChange={((e)=>setEmail(e.target.value))}
        />
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          className="input"
          required=""
          onChange={(e)=>setPassword(e.target.value)}
        />
        <input value="Register" onClick={()=>(handleSignup())} type="submit" className="login-button" />
        <p className="text-white text-center">
          Have an account ?
          <Link to='/login'><span className="text-gray-400 hover:text-gray-300"> Login</span></Link>
        </p>
      </form>
    </div>
    </div>
  
      </>
    )

}

export default Signup