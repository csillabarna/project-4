import React, { useState, useEffect } from 'react'
import axios from 'axios'


const EditUser = (props) => {
  const userId = props.match.params.userId
  const token = localStorage.getItem('token')

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    user_bio: '',
    user_avatar: '',
    user_city: '',
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(res => {
        updateFormData(res.data)
      })
  }, [])


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }


  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/api/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        props.history.push(`/user/${userId}`)
      })
  }

  function handleDelete() {
    axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem('token')
        props.history.push('/')
      })
  }

  return <main className="updateUserMain">

    <h1>Hi <strong>{formData.username}</strong></h1>
    <h2>Update your Profile</h2>
    <div className="userImage">
      <img src={formData.image} />
    </div>

    <form onSubmit={handleSubmit} className='m-5 mx-6'>
      <div className="field">
        <label className="label">Username</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
          className="input"
        />
      </div>
      <p className="help">Please choose a unique username</p>
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
        </div>
        <p className="help">e.g. example@example.com</p>

      </div>
      <div className="field">
        <label className="label">Bio</label>
        <div className="control">
          <input
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
        </div>
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
        </div>
        <p className="help">Create a password</p>

      </div>
      <div className="field">
        <label className="label">Confirm your password</label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password_confirmation}
          name="password_confirmation"
          className="input"

        />
      </div>


      <button className="button is-link">Update</button>

    </form>
    {token &&
      <button className="button is-danger" onClick={handleDelete}>
        Delete
      </button>}
  </main>
}

export default EditUser