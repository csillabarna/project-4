import React, { useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

// import { getUserId } from '../../../project-3/frontend/lib/auth'


const Login = (props) => {

  const [loginData, updateLoginData] = useState({

    email: '',
    password: ''

  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...loginData,
      // this syntax will reassign every name filed to this key and value pair
      [name]: value
    }
    updateLoginData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('api/login', loginData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        props.history.push('/sites')

      })

  }
  console.log(loginData)


  return <>
    <form onSubmit={handleSubmit} className='m-5 mx-6'>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={loginData.email}
            name="email"
            className="input"

          />
        </div>
        <p className="help">e.g. example@example.com</p>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            onChange={handleChange}
            value={loginData.password}
            name="password"
            className="input"
          />
        </div>

      </div>

      <button className='button mb-3 is-link'>Login</button>

    </form>
  </>
}

export default Login
