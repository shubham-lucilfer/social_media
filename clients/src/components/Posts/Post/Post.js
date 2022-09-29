import React from 'react'
import useStyle from './Style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost,updateLike } from '../../../actions/postAction';


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  let tag = post.tags[0];
  let arr = tag.split('#');
  const ntags = arr.splice(1);
  return (
    <Card className={classes.card} >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6' >
          {post.name}
        </Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{ntags.map((tag) => (
          `#${tag} `
        ))}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' >{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={() => dispatch(updateLike(post._id))}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
    )
}

export default Post