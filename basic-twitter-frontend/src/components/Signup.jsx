import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
const Signup = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirlPasswordError, setconfirmPasswordError] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupMessage('');
    // Add your validation and API call logic here
    if (password != confirmPassword) {
      setconfirmPasswordError("Password does not match")
      return;
    }
    setUserNameError(!userName ? "Username is required" : "");
    setPasswordError(!password ? "Password is required" : "");
    setEmailError(!password ? "Email is required" : "");
    setconfirmPasswordError(!password ? "Confirm password is required" : "");

    try {
      const response = await axios.post("https://socio-psi.vercel.app/signup", {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        password: password,
        year: year,
        email: email
      }).then(res => {
        setSignupMessage("You are signed up");
        navigate('/login');

      });

    } catch (err) {
      console.log("Error occured while signing up");
    }


  };

  return (
    <div className='flex items-center justify-center h-screen '>
      <form onSubmit={handleSubmit} className='max-w-sm bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>Username:</label>
          <input type='text' id='username' value={userName} onChange={(event) => setUserName(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {userNameError && <p className='text-red-500 text-xs italic'>{userNameError}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='firstName' className='block text-gray-700 text-sm font-bold mb-2'>FirstName:</label>
          <input type='text' id='firstName' value={firstName} onChange={(event) => setFirstName(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {userNameError && <p className='text-red-500 text-xs italic'>{userNameError}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='lastName' className='block text-gray-700 text-sm font-bold mb-2'>LastName:</label>
          <input type='text' id='lastName' value={lastName} onChange={(event) => setLastName(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {userNameError && <p className='text-red-500 text-xs italic'>{userNameError}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
          <input type='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {emailError && <p className='text-red-500 text-xs italic'>{emailError}</p>}

        </div>
        <div className='mb-4'>
          <label htmlFor='year' className='block text-gray-700 text-sm font-bold mb-2'>Year:</label>
          <input type='text' id='year' value={year} onChange={(event) => setYear(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {emailError && <p className='text-red-500 text-xs italic'>{emailError}</p>}

        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
          <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {passwordError && <p className='text-red-500 text-xs italic'>{passwordError}</p>}

        </div>
        <div className='mb-6'>
          <label htmlFor='confirmPassword' className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password:</label>
          <input type='password' id='confirmPassword' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-gray-200 text-black' />
          {confirlPasswordError && <p className='text-red-500 text-xs italic'>{confirlPasswordError}</p>}

        </div>
        <button type='submit' className='w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'>Submit</button>
        <div>{<h1 className='text-green-900 bold'>{signupMessage}</h1>}</div>
        <div><p className='text-xs text-blue-500'>Already have an account <NavLink to="/login" ><span className='text-blue-1000'>Log In</span></NavLink></p></div>
      </form>

    </div>
  );
};

export default Signup;
