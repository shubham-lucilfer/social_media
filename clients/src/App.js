import React, { useState } from 'react'
import { Container } from '@material-ui/core'

import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import context from './context/AuthContext';

const App = () => {
  const [Name, setname] = useState(null);
  return (
    <context.Provider value={{ Name, setname }}>
      <BrowserRouter>
        <Container maxidth='lg'>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </context.Provider >



  )
}

export default App