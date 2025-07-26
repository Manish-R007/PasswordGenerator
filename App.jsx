import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, SetNumberAllowed] = useState(false)
  const [isCharAllowed, SetCharAllowed] = useState(false)
  const [Password, setpassword] = useState("")
  const [isSelected, setIsSelected] = useState(false)
  const passwordref = useRef(null)

  const generatepassword = useCallback(() => {
    let pass = ""
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += "0123456789"
    if (isCharAllowed) str += "@#$%^&*"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char)
    }

    setpassword(pass)
    setIsSelected(false)

  }, [length, numberAllowed, isCharAllowed])

  

 const selectPassword = () => {
    passwordref.current?.select()
    setIsSelected(true)
    window.navigator.clipboard.writeText(Password)

    setTimeout(() => {
      setIsSelected(false)
      passwordref.current?.blur()
    }, 2000);
 }


  useEffect(() => { generatepassword() }, [length, numberAllowed, isCharAllowed])

  return (
    <>
      <div className='bg-gray-600 rounded-lg mx-auto max-w-md px-4 py-3 my-8'>
        <h1 className='text-white text-center my-3 text-xl font-bold'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            defaultValue={Password}
          />
            <button
          onClick={selectPassword}
          className={`outline-none ${isSelected ? 'bg-green-500' : 'bg-blue-700'} text-white px-3 py-0.5 shrink-0 transition-colors duration-200`}
        >
          {isSelected?'Copied!':'Copy'}
        </button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              name=""
              id=""
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setlength(e.target.value)}
            />
            <label htmlFor="length" className='text-white'>length :{length}</label>
          </div>

          <div className='flex items-center gap-x-1 text-white'>
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={numberAllowed}
              onChange={() => {
                SetNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="number">Number</label>

            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={isCharAllowed}
              onChange={() => {
                SetNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="char">Character</label>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
