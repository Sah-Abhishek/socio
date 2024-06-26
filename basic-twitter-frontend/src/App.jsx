/* eslint-disable no-unused-vars */
import './App.css'
import Signup from './components/Signup'
import { useSetAtom } from 'jotai'
import { uiAtom } from './state'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const setUi = useSetAtom(uiAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
      navigate('/feed');

  }, [])

  return (
    <>
      <Signup />
      {/* <Sidebar /> */}

      {/* <button onClick={() => setUi(
        (prev) => ({
          ...prev,
          modal: true
        })
      )} className='border rounded-md bg-red-400 m-5 p-5'>Toggle Modal</button> */}
    </>
  )
}

export default App
