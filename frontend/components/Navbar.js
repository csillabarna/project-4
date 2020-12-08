import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const Navbar = (props) => {
  const [user, updateUser] = useState({})

  const currentUserId = getUserId()
  console.log(currentUserId)
  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/sites')
  }
  useEffect(() => {
    axios.get(`/api/users/${currentUserId}`)
      .then(res => {
        const data = res.data
        console.log(data)
        updateUser(data)
      })
  }, []) 

  return <nav className="navbar is-black">
    <div className="navbar-menu is-active">
      {localStorage.getItem('token') &&
       <div className="navbar-start"> <span> Welcome back </span>
         <Link className="is-capitalized" to={`/user/${currentUserId}`}>
           <strong className="is-link">{user.username}</strong></Link></div>}

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            
            

            <Link className="button is-light" to="/">Home</Link>
            <Link className="button is-light" to="/sites">List of Sites</Link>
            {!localStorage.getItem('token') ?
              <Link className="button is-light" to="/signup">Signup</Link> : ''}
            {!localStorage.getItem('token') ?
              <Link className="button is-light" to="/login">Login</Link> : ''}
            
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