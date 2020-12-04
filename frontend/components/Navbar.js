import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = (props) => {

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/sites')
  }



  return <nav className="navbar is-black">
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-light" to="/">Home</Link>
            <Link className="button is-light" to="/sites">List of Sites</Link>
            <Link className="button is-light" to="/signup">Sign up</Link>
            <Link className="button is-light" to="/login">Login</Link>
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