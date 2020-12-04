import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'
import 'bulma'

import Sites from './components/Sites'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Create from './components/Create'
import SingleSite from './components/SingleSite'



const App = () => (
  <BrowserRouter>
    <Navbar />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sites" component={Sites} />
      <Route exact path="/sites/:siteId" component={SingleSite} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />

      <Route exact path="/sites/add-site" component={Create} />


    </Switch>
  </BrowserRouter>
)

export default App