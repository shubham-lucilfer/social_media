import React from 'react'
import { Container } from '@material-ui/core'

import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {



  return (
    <GoogleOAuthProvider clientId='581846837752-ii1lsmc7suc7aug0earfv5v1e0db9lgl.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxidth='lg'>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}

export default App