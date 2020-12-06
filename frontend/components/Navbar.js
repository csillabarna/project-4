import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'


const Navbar = (props) => {
  const [user, updateUser] = useState({})

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/sites')
  }
  useEffect(() => {
    axios.get(`/api/users/1`)
      .then(res => {
        const data = res.data
        console.log(data)
        updateUser(data)
      })
  }, []) 

  return <nav className="navbar is-black">
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-light" to="/">Home</Link>
            <Link className="button is-light" to="/sites">List of Sites</Link>
            <Link className="button is-light" to="/signup">Sign up</Link>
            <Link className="button is-light" to="/login">Login</Link>
            {localStorage.getItem('token') && <p>Welcome back <Link className="is-capitalized" to={`/user/${user.id}`}><strong className="is-link">{user.username}</strong></Link></p>}


            {localStorage.getItem('token')
              && <Link className="button is-light" to="/sites/add-site">Add Site</Link>}

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