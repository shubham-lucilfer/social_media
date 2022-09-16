import React from 'react'
import Post from './Post/Post'
import useStyle from './styles'
import { useSelector } from 'react-redux'

const Posts = () => {
  const classes = useStyle();
  const posts = useSelector((state) => state.postReducer)
  console.log(posts);
  return (
    <>
      <Post />
      <Post />
    </>
  )
}

export default Posts