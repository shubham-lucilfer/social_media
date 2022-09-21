import React from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import useStyle from './styles'
import memories from "../../images/memories.png"
import { Link } from 'react-router-dom'
import { useState } from 'react'



const NavBar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(null);
  // console.log(user);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/" variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} height='60'></img>
      </div>
      <Toolbar>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
              <Button variant='contained' className={classes.logout} color="secondary" onClick={() => { }}>Log Out</Button>
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