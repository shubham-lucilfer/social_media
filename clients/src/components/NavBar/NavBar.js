import React from 'react'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import useStyle from './styles'
import memories from "../../images/memories.png"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import context from '../../context/AuthContext'

const NavBar = () => {
  const { Name, setname } = useContext(context);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyle();

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    history.push('/')
    setname(null);
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/" variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} height='60'></img>
      </div>
      <Toolbar>
        {
          Name ? (
            <div className={classes.profile}>
              <Typography variant='h6'>Welcome</Typography>
              <Typography variant='h5'>{Name}</Typography>
              <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
            </div>
          ) : (
            <Button variant='contained' component={Link} to='/auth' color='primary'>Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar