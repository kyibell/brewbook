import User from '../models/users'; // Import User Model
import jwt, { JsonWebTokenError } from 'jsonwebtoken'; // JWT

export async function signup(req, res) {
    try {
        if (!process.env.JWT_SECRET)  { 
            return res.status(400).json({ message: "no JWT Secret! "});
        }
        
        const existingUser = await User.findOne({ where: { email: req.body.email }});
        if (existingUser) { // If a user with the email exists
            return res.status(400).json({message: "Account with email already exists! Please try a new email."});
        } 
        const {email, username, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password

        // Create new User
        const newUser = await User.crate({
            username,
            email,
            password: hashedPassword,
        });

        
    } catch (error) {
        
    }
}