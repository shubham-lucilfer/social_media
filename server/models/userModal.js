import mongoose from 'mongoose'

const userScheme = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    id: { type: String, require: true },
})

export default mongoose.model("User", userScheme);