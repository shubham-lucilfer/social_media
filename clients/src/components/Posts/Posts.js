import React from 'react'
import Post from './Post/Post'
import useStyle from './styles'
import { useSelector } from 'react-redux'
import { Grid,Typography,Button } from '@material-ui/core'


const Posts = ({setCurrentId }) => {
  const classes = useStyle();
  const posts = useSelector((state) => state.postReducer)
  

  return (
    !posts.length ? <Typography variant='h5'> No Posts to Show here</Typography> : (
      <Grid className={classes.container} container alignItems="stretch" spaceing={3}>
        {posts.map((post) => (
          <Grid key={post._id} xs={12} sm={6} item>
            <Post post={post} setCurrentId={setCurrentId}></Post>
          </Grid>
        ))
        }
      </Grid>
    )
  )
}

export default Posts