import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: `${__dirname}/../../.env`}); // For Secrets, dotenv config

const SECRET = process.env.JWT_SECRET

export const decodeUserFromToken = (req, res, next) => {
    let token = req.get('Authorization') || req.query.token || req.body.token // Store token in a variable to fetch the token
    if (!token) return next() // if token wasn't found, doesn't go on with the rest of the function

    token = token.replace('Bearer ', '') // else, remove Bearer prefix
    jwt.verify(token, SECRET, (err, decoded) => { // Verify the token
        if (err) return next(err) // If there's an error, return the next function with the error (i.e if it's expired)

        req.user = decoded.user // the requested user is equal to the decoded user
        next() // call next explicitly again after attatching user to the request
    })
}

export function checkAuth(req, res, next) {
    return req.user ? next() : res.status(401).json({msg: 'Not Authorized'}) // Check if the user object exists, else send a msg for not authorized.
}