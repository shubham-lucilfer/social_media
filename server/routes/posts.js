import express from 'express'
const router = express.Router();
import { getPost, createPost, updatePost, deletePost, updateLike } from "../controllers/post.js";
import auth from '../middleware/auth.js'

router.get("/", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost);
router.patch("/:id/updatePost",auth, updateLike);
export default router;