import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async(event) => {
    event.preventDefault();
    // setSignupMessage('');
    // Add your validation and API call logic here
    
    setUserNameError(!userName ? "Username is required" : "");
    setPasswordError(!password ? "Password is required" : "");
    try{
      const response = await axios.post("https://socio-psi.vercel.app/login", {
        userName: userName,
        password: password,
      })
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
    //   .then((response) => {
    //     setLoginMessage(response.status != 200 ? "Username/Password incorrect" : "");
    //     console.log(passwordError)
    //     setToken(response.data.token);
    //     navigate("/feed");

    //     return response;
    // });

    if(response.data.status != 200){
        setLoginMessage("");
        navigate("/feed");
    }else{
        setLoginMessage("username/password incorrect")
    }
      
      console.log(response.data.status);

    }catch(err){
      console.log("Error occured while signing up", err);
    }
    
    
  };

  return (
    <div className='flex items-center justify-center h-screen'>
        
      <form onSubmit={handleSubmit} className='max-w-sm bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>Username:</label>
          <input type='text' id='username' value={userName} onChange={(event) => setUserName(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-400 text-black' />
          {userNameError && <p className='text-red-500 text-xs italic'>{userNameError}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
          <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-400 text-black' />
          {loginMessage && <p className='text-red-500 text-xs italic'>{loginMessage}</p>}

        </div>
        
        <button type='submit' className='w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'>Submit</button>
        {/* {<h1 className='text-green-900'>{loginMessage}</h1>} */}
      </form>
      
    </div>
  );
};

export default Login;
