import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Sites from './components/Sites'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import SingleSite from './components/SingleSite'
import User from './components/User'
import Verification from './components/Verification'
import EditUser from './components/EditUser'
import EditComment from './components/EditComment'



const App = () => (
  <BrowserRouter>
    <Navbar />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sites" component={Sites} />
      <Route exact path="/sites/:siteId" component={SingleSite} />
      <Route exact path="/verification/:id" component={Verification} />
      <Route exact path="/comment/:id" component={EditComment} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />

      <Route exact path='/user/:userId' component={User} />
      <Route exact path='/user/:userId/edit' component={EditUser} />



    </Switch>
  </BrowserRouter>
)

export default App