import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'


const Signup = () => {
  const [closed, updateClosed] = useState(false)
  // function modal() {
  // }
  const [formData, updateFormData] = useState({

    username: '',
    email: '',
    password: '',
    password_confirmation: ''


  })
  const [errors, updateErrors] = useState({
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
    const newErrors = {
      ...errors,
      [name]: ''
    }
    updateFormData(data)
    updateErrors(newErrors)

  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('api/signup', formData)
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
          console.log(errors)
        } else {
          console.log(formData)
          updateClosed(true)
        }
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
          onChange={handleChange}
          value={formData.username}
          name="username"
        />
        {errors.username && <p className="help" style={{ color: 'red' }}>
          {'There was a problem with your Username'}
        </p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        {errors.email && <p className="help" style={{ color: 'red' }}>
          {'There was a problem with your Email'}
        </p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        {errors.password && <p className="help" style={{ color: 'red' }}>
          {'There was a problem with your Password'}
        </p>}
      </div>
      <div>
        <label>Confirm your password</label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password_confirmation}
          name="password_confirmation"
        />
        {errors.passwordConfirmation && <p className="help" style={{ color: 'red' }}>
          {'Does not match password'}
        </p>}
      </div>

      <button>Signup</button>
      {/* // onClick={modal} */}


    </form>
  </>
}

export default Signup
