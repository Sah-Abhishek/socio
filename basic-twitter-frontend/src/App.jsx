/* eslint-disable no-unused-vars */
import './App.css'
import Signup from './components/Signup'
import { useSetAtom } from 'jotai'
import { uiAtom } from './state'

function App() {
  const setUi = useSetAtom(uiAtom)

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
