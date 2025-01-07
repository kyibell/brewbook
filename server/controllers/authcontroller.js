import User from '../models/users.js'; // Import User Model
import jwt from 'jsonwebtoken'; // JWT

const MIN_PASSWORD_LENGTH = 8;
const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email regex for valid email format

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

        if (!username || !password || !email) {
          return res.status(400).json({ // Check for empty fields
                status: "FAILED",
                message: "Empty fields provided, please fill all fields."
            });
        } else if (password.length < MIN_PASSWORD_LENGTH) { // Check for password length
            return res.status(400).json({
                status: "FAILED",
                message: "Password is too short, please enter a longer password."
            });
        } else if (emailregex.test(email)) { // Check for valid email format
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid email format entered! Please enter a valid email."
            });
        } else {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            })
        }
       // await newUser.save();
        const token = createJWT(newUser); // Create a token for the new user
        res.status(200).json({ token });
        
    } catch (error) {
        console.log(error);
    }
    try {
        if (req.body.user_id) {
            await User.destroy({ where: {user_id: req.body.user_id}}); // Clean up just in case token doesn't work
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export async function login(req, res) {
    try {
        if(!process.env.SECRET) {
            throw new Error("No SECRET in backend env!");
        }
        const user = await User.findOne({ where: { email: req.body.email }}); // Find the User 
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Please input all fields."}); // If no email or password, check for empty fields
        }

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const hashedPassword = req.body.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password Entered."});
        }

        const token = createJWT(user);
        res.json({ token });

    } catch (error) {
        handleAuthError(error, res);
    }
}

export async function changePassword(req, res) {
    try {
        const user = await User.findbyPk(req.user.user_id);
        if (!user) {
            return res.status(400).json('User not Found');
        }

        const isMatch = bcrypt.compare(req.body.curPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password Entered."});
        }

        user.password = req.body.newPassword;

        await user.save();

        const token = createJWT(user);
        res.json({token});

    } catch (error) {
        handleAuthError(error, res);
    }
}



// Helper Functs.

function handleAuthError(err, res) {
    console.log(err);
    const { message } = err;

    if (message === "User not found." || message === "Invalid Password Entered.") {
        res.status(401).json({ err: message });
    }
    else {
        res.status(500).json({err: message });
    }
}

function createJWT(user) {
    return jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '24h'});
}