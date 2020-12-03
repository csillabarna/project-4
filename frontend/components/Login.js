import React, { useState } from 'react'
import axios from 'axios'


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
      .then(resp => {
        console.log(resp.data)
        localStorage.setItem('token', resp.data.token)
        props.history.push('/characters')

      })

  }
  console.log(loginData)


  return <form onSubmit={handleSubmit}>

    <div>
      <label>Email</label>
      <input
        type="text"
        onChange={handleChange}
        value={loginData.email}
        name="email"
      />
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        onChange={handleChange}
        value={loginData.password}
        name="password"
      />
    </div>

    <button>Login</button>

  </form>

}

export default Login
