import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const Navbar = (props) => {
  const [user, updateUser] = useState({})
  const [isActive, setisActive] = useState(false)

  const currentUserId = getUserId()
  // console.log(currentUserId)

  function handleLogout() {
    localStorage.removeItem('token')

    props.history.push('/sites')
  }
  currentUserId !== true && useEffect(() => {
    axios.get(`/api/users/${currentUserId}`)
      .then(res => {
        const data = res.data
        // console.log(data)
        updateUser(data)
      })
  }, [props.match])

  return <nav className="navbar is-link" role='navigation' aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/">
        <img className="image is-64x64" src="https://res.cloudinary.com/greenupload/image/upload/v1607631126/logo_gva9qr.jpg" alt="logo" /></Link>
      <a role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarinfo" onClick={() => setisActive(!isActive)}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarinfo" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
      <div className="navbar-start">
        <div className="navbar-item">
          <div className="buttons ">
            <Link className="button is-light" to="/">Home</Link>
            <Link className="button is-grey-light has-text-weight-semibold" to="/sites">KNOW YOUR HERITAGE</Link>
          </div>

        </div>

      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">

            {!localStorage.getItem('token') && <Link className="button is-light" to="/signup">Sign up</Link>}
            {!localStorage.getItem('token') &&
              <Link className="button is-primary has-text-weight-semibold" to="/login">Login</Link>}


            {localStorage.getItem('token') &&
              <div className="mr-3"> <p> Welcome back <Link className="is-capitalized" to={`/user/${currentUserId}`}>
                <strong id="stronguser"> {user.username} </strong></Link></p></div>
            }

            {localStorage.getItem('token') && <button
              className="button is-light"
              onClick={handleLogout}
            >
              Logout
          </button>}
          </div>

        </div>
      </div>

    </div>


  </nav>
}

//  withRouter will give us the route props we have on every route, e.g. match, location, history
export default withRouter(Navbar)