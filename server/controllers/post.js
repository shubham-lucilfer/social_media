import postModal from "../models/postModal.js"
import mongoose from "mongoose";

export const getPost = async (req, res) => {
    try {
        const postMessages = await postModal.find();
        return res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ Error: error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new postModal(body);
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json({ Error: error.message })
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id")

    const updatedPost = await postModal.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost)
}


export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id")

    await postModal.findByIdAndRemove(id)

    res.json({ message: "Post has been deleted" })
}
export const updateLike = async (req, res) => {
    const { id } = req.params;

    if (!req.userId)
        return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id")

    const post = await postModal.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === - 1) {
        post.like.push(req.userId);
    } else {
        post.like = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await postModal.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)

}