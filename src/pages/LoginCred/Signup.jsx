/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("")
  const navigate = useNavigate();

  const handleSignup = async()=>{
    try{
    console.log('in')
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, {
      username, password, email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data)
    if(response.status===201){
      document.cookie = `token = ${response.data.token}`
      toast.success('Successfully registered')
      navigate('/home')
    }
  }catch(err){
    console.log(err.message)
    toast.error('Registration failed')
  }
}

  return (
     <>
        <div className="relative h-[100vh] flex flex-col items-center justify-center bg-black">
    <div className="absolute bottom-10  flex items-center justify-center opacity-10 pointer-events-none">
      <p className="text-[10rem] hidden md:block text-white text-right p-[1rem]">Your Feedbacks into insightable actions</p>
    </div>
    <div className="relative z-10 container shadow-sm shadow-white flex flex-col">
      <div className="heading">Register</div>
      <div className="form">
        <input
          placeholder="Username"
          id="username"
          type="text"
          className="input"
          onChange={((e)=>setUsername(e.target.value))}
        />
          <input
          placeholder="E-Mail"
          id="email"
          type="email"
          className="input"
            onChange={((e)=>setEmail(e.target.value))}
        />
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          className="input"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={()=>(handleSignup())} type="submit" className="login-button" >Register</button>
        <p className="text-white text-center">
          Have an account ?
          <Link to='/login'><span className="text-gray-400 hover:text-gray-300"> Login</span></Link>
        </p>
      </div>
    </div>
    </div>
     <Toaster/>
  
      </>
    )

}

export default Signup