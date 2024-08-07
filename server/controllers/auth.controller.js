import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";


export const register = async(req, res) => {
    try {
        const {fullName, email, password, confirmPassword} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({error: "All fields are required"});
        }
        const existingEmail = await User.findOne({email: email});
        if(existingEmail) {
            return res.status(400).json({error: "Email is already taken"});
        }
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Please, enter a valid email address"});
        }
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.fullName
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

        
    } catch(error) {
        console.log("Error in auth controller, register function: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch(error) {
        console.log("Error in auth controller, logout function: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

