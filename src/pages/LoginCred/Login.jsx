/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data,setData] = useState([])
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      if (!username || !password) {
         toast.error('Please fill all the fields');
         return
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/login`,{
        username: username,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(response.status===200){
      setData(response.data);
      toast.success('Login Successful');
      document.cookie = `token = ${response.data.token}`
      navigate('/home')
      }
    } catch (err) {
      toast.error('Login failed')
      console.error(err);
    }
  };
  return (
    <>
  <div className="relative h-[100vh] flex flex-col items-center justify-center bg-black">
  <div className="absolute bottom-10  flex items-center justify-center opacity-10 pointer-events-none">
    <p className="hidden md:block text-[10rem] text-white text-right p-[1rem]">Get your actionable insights done here</p>
  </div>
  <div className="relative z-10 container shadow-sm shadow-white flex flex-col">
    <div className="heading">Sign In</div>
    <div className="form" action="">
      <input
        placeholder="Username"
        id="username"
        type="text"
        className="input"
        onChange={((e)=>setUsername(e.target.value))}
      />
      <input
        placeholder="Password"
        id="password"
        type="password"
        className="input"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <span className="forgot-password">
        <a href="#">Forgot Password ?</a>
      </span>
      <button onClick={(e)=>handleLogin(e)} className="login-button" >Sign In</button>
      <p className="text-white text-center">
          Don't have an account ?
          <Link to='/signup'><span className="text-gray-400 hover:text-gray-300"> Register</span></Link>
        </p>
    </div>
  </div>
  <Toaster/>
  </div>

    </>
  )
}

export default Login