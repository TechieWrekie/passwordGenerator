import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  //All the required useStates
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState();
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);

  //useRef is used for better user Experienct
  const passwordRef = useRef()

  //Generate Random Password Function used with useCall back for optimiztion
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+?><{}/*-"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, numAllowed, charAllowed])


  //Password Generator function called on page start and when dependencies changed
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed])

  //Funtion to Copy the password
  const handleCopy = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
      <div className='container my-5  rounded-4 text-white' style={{ backgroundColor: "#1E2434", width: "800px", height: "290px" }}>
        {/* Row first for heading */}
        <div className='row'>
          <div className='col-lg-12'>
            <h1 className='text-center py-5 '>Password Generator</h1>
          </div>
        </div>
        {/* Row second for input field and button */}
        <div className='row'>
          <div className='col-lg-10 g-0 ps-4'>
            <input className='form-control' placeholder='Random Password' readOnly value={password} ref={passwordRef} onChange={(e) => { setpassword(e.target.value) }} />
          </div>
          <div className='col-lg-2 '>
            <button className='btn btn-primary' onClick={handleCopy}>Copy</button>
          </div>
        </div>
        {/* Row third for operation */}
        <div className='row mt-3 '>
          <div className='col-lg-5  d-flex align-items-center'>
            <input className='mx-2' type='range' min={8} max={50} value={length} onChange={(e) => { setlength(e.target.value) }} />
            <label style={{ marginBottom: "5px", color: "orange" }} className='fs-5'>Length : {length}</label>
          </div>
          <div className='col-lg-7  d-flex align-items-center'>
            <input className="form-check-input mx-2 mb-2 " type="checkbox" value={numAllowed} onChange={() => { setnumAllowed((prev) => !prev) }} id="flexCheckDefault" />
            <label style={{ marginBottom: "4px", color: "orange" }} className="form-check-label mx-2 fs-5" for="flexCheckDefault">
              Numbers
            </label>
            <input className="form-check-input mx-2 mb-2" type="checkbox" value={charAllowed} onChange={() => { setcharAllowed((prev) => !prev) }} id="flexCheckDefault" />
            <label style={{ marginBottom: "4px", color: "orange" }} className="form-check-label mx-2 fs-5" for="flexCheckDefault">
              Characters
            </label>
          </div>
        </div>
        {/* Row Fourth as a footer */}
        <div className="row pt-3 ">
          <div className='d-flex justify-content-end '>
            <h6>Made By : <a className='text-decoration-none text-danger' target='_blank' href="https://github.com/TechieWrekie">Paras dhiman</a></h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
