import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import User from '../models/User.js';

export const postSignUp = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        if(!(email && password && username)) {
            return res.status(400).json({
                success: false,
                message: "Please send all the details"
            })
        }



        try {
            const existingUser = await User.findOne({email});
            if(existingUser) {
                return res.status(200).json({
                    success: true,
                    message: "User is already registered"
                })
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            cardCollection: [
                {
                    cardType: "pokemon"
                },
                {
                    cardType: "avengers"
                }
            ]
        });


        const token = jwt.sign({email: user.email, id: user._id}, "very-long-secret-jwt-token", {expiresIn: '2hr'});
        user.password = undefined;

        console.log("User registered");

        return res.status(200).json({
            success: true,
            message: "User has been registered",
            user,
            token
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}


export const postLogin = async (req, res, next) => {

    try{
        const { email, password } = req.body;
        if(!(email && password)) {
            return res.status(400).json({
                success: false,
                message: "Please send all the details"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }

        const isPasswordCorrect = await bcrypt.comapare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Password entered is incorrect!"
            })
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "very-long-secret-jwt-token", {expiresIn: '2hr'});

        return res.status(200).json({
            success: true,
            message: "User logged in!",
            user: existingUser,
            token
        })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }







}