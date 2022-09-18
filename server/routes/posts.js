import express from 'express'
const router = express.Router();
import { getPost, createPost, updatePost, deletePost,updateLike } from "../controllers/post.js";

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id",updatePost)
router.delete("/:id",deletePost);
router.patch("/:id/updatePost",updateLike);
export default router;