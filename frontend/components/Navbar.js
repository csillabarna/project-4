import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const Navbar = (props) => {
  const [user, updateUser] = useState({})

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
        console.log(data)
        updateUser(data)
      })
  }, [])

  return <nav className="navbar is-link">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-light" to="/">Home</Link>
            <Link className="button is-light" to="/sites">List of Sites</Link>
          </div>

        </div>

      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">

            {!localStorage.getItem('token') && <Link className="button is-light" to="/signup">Sign up</Link>}
            {!localStorage.getItem('token') &&
              <Link className="button is-black" to="/login">Login</Link>}


            {localStorage.getItem('token') &&
              <div className="mr-3"> <p> Welcome back <Link className="is-capitalized" to={`/user/${currentUserId}`}>
                <strong className="is-link"> {user.username} </strong></Link></p></div>
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