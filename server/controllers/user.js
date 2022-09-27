import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModal.js'


export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser)
            res.status(404).json({ message: "User doesnt exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect)
            res.status(400).json({ message: "Invalid Credential" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "CHROLLO", { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser)
            res.status(400).json({ message: "User already exist" })

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Password dont match" })
        }

        const hashedPassword = bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, "CHROLLO", { expiresIn: "1h" })

        res.status(200).json({ result: result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    } 
}