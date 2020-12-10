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
    user_bio: '',
    user_avatar: '',
    user_city: '',
    password: '',
    password_confirmation: ''
  })



  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    user_bio: '',
    user_avatar: '',
    user_city: '',
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
      <div className="modal-card">
        <Link to={'/'}><button className="button is-black">ok</button></Link>
      </div>
    </Modal>

    <form onSubmit={handleSubmit} className='m-5 mx-6'>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.username}
            name="username"
            className="input"

          />
          {errors.username && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your Username'}
          </p>}
        </div>
        <p className="help">Please choose a unique username</p>

      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
            className="input"
          />

          {errors.email && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your Email'}
          </p>}
        </div >
        <p className="help">e.g. example@example.com</p>

      </div>


      <div className="field">
        <label className="label">Bio</label>
        <div className="control">
          <textarea
            placeholder="Describe yourself.."
            type="text"
            onChange={handleChange}
            value={formData.user_bio}
            name="user_bio"
            className="textarea"
          />
        </div>
        <p className="help">Tell us a bit about yourself</p>
      </div>
      <div className="field">
        <label className="label">City</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.user_city}
            name="user_city"
            className="input"
          />
          {errors.city && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your City'}
          </p>}
        </div>
        <p className="help">Let us know which city you are based in</p>
      </div>
      <div className="field">
        <label className="label">Profile Picture</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.user_avatar}
          name="user_avatar"
          className="input"

        />
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            className="input"
          />

          {errors.password && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your Password'}
          </p>}
        </div>
        <p className="help">Create a password</p>

      </div>
      <div className="field">
        <label className="label">Confirm your password</label>
        <div className="control">
          <input
            type="password"
            onChange={handleChange}
            value={formData.password_confirmation}
            name="password_confirmation"
            className="input"
          />
          {errors.passwordConfirmation && <p className="help" style={{ color: 'red' }}>
            {'Does not match password'}
          </p>}
        </div>
        <p className="help">Please make sure your passwords match</p>

      </div>
      <button className='button mb-3 is-link'>Signup</button>
    </form>
  </>
}

export default Signup
