import postModal from "../models/postModal.js"


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