/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = ()=>{
    navigate('/home')
  }
  return (
    <>
  <div className="relative h-[100vh] flex flex-col items-center justify-center bg-black">
  <div className="absolute bottom-10  flex items-center justify-center opacity-10 pointer-events-none">
    <p className="hidden md:block text-[10rem] text-white text-right p-[1rem]">Get your actionable insights done here</p>
  </div>
  <div className="relative z-10 container shadow-sm shadow-white flex flex-col">
    <div className="heading">Sign In</div>
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
        placeholder="Password"
        id="password"
        name="password"
        type="password"
        className="input"
        required=""
        onChange={(e)=>setPassword(e.target.value)}
      />
      <span className="forgot-password">
        <a href="#">Forgot Password ?</a>
      </span>
      <button onClick={()=>handleLogin()} className="login-button" >Sign In</button>
      <p className="text-white text-center">
          Don't have an account ?
          <Link to='/signup'><span className="text-blue-500 hover:text-blue-400"> Register</span></Link>
        </p>
    </form>
  </div>
  </div>

    </>
  )
}

export default Login