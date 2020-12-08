import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'


const Signup = () => {
  const [closed, updateClosed] = useState(false)
  function modal() {
    updateClosed(true)
  }
  const [formData, updateFormData] = useState({
  
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
    
    
  })

  function handleChange(event) {
    const name = event.target.name 
    const value = event.target.value 
    const data = {
      ...formData,
      // this syntax will reassign every name filed to this key and value pair
      [name]: value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('api/signup', formData)
      .then(resp => {
        console.log(resp.data)
      })  
    
  }
  // console.log(formData)

 
  return <>
  {/* alert */}
    <Modal isOpen={closed}>
      <p>Please check your inbox to confirm your email address </p>
      <div className="modal-buttons">
        <Link to={'/'}><button className="button is-black">ok</button></Link>
      </div>
    </Modal>

  <form onSubmit={handleSubmit}>
    <div>
      <label>Username</label>
      <input
        type="text"
        onChange ={handleChange}
        value={formData.username}
        name="username"
      />
    </div>
    <div>
      <label>Email</label>
      <input
        type="text"
        onChange ={handleChange}
        value={formData.email}
        name="email"
      />
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        onChange ={handleChange}
        value={formData.password}
        name="password"
      />
    </div>
    <div>
      <label>Confirm your password</label>
      <input
        type="password"
        onChange ={handleChange}
        value={formData.password_confirmation}
        name="password_confirmation"
      />
    </div>
    
    <button onClick={modal}>Signup</button>

  </form>
</>  
}

export default Signup
