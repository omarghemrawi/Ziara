// import User from "../models/user.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // ? Status Code : 200 = OK , 201= created , 400= bad request (invalid input) , 401= Unauthorized (wrong credentials), 500 = internal server Error
// // ?? Done
// export const userSignUp = async (req, res) => {
//   try {
//     const { email, password, username } = req.body;

//     //Validate Required fields
//     if (!email || !password || !username) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All Fields are required" });
//     }

//     //Check If User is Already exist
//     const userIsExist = await User.findOne({ email });
//     if (userIsExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email Already Exists" });
//     }

//     //Hash passord for more security
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     //Create New User
//     const newUser = new User({ username, email, password: hashPassword });
//     await newUser.save(); // we used .save instead of .create directly before with newUser because if we wanna do some custom logic before saving

//     const token = jwt.sign(
//       { id: newUser._id, email: newUser.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );
//     // Remove Password before send to frontend
//     const userSafe = newUser.toObject();
//     delete userSafe.password;

//     return res.status(201).json({
//       success: true,
//       message: "User SignUp Successfully",
//       user: userSafe,
//       token: token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
// export const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //Validate required fields
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password are required" });
//     }

//     // check if user is exist
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Email is not exist" });
//     }
//     const passwordIsCorrect = await bcrypt.compare(password, user.password);

//     //check if password is correct
//     if (!passwordIsCorrect) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Password is not correct" });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // Remove Password before send to frontend
//     const userSafe = user.toObject();
//     delete userSafe.password;

//     res.status(200).json({ success: true, user: userSafe, token: token });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Invalid Credentials" });
//   }
// };
// export const updateProfile = async (req, res) => {
//   try {
//     const { userId, username, about, profile } = req.body;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required." });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         username,
//         about,
//         profile,
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully.",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Edit profile error:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };
// export const getUser = async (req,res)=>{
//   try {
//     const {id} = req.params;
//     if(!id){
//       return res.status(400).json({ message: "User ID is required." });
//     }
//     const user = await User.findById(id)

//     if(!user){
//       return res.status(404).json({ message: "User Not Found." });
//     }
//      res.status(200).json({
//       user: user,
//     });
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({success:false , message : "server error. Please try again later to get user. "})
//   }
// }
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const validateEmail = async (email) => {
  const apiKey = process.env.EMAIL_VALIDATION_API_KEY; // get from your email validation provider
  const resp = await axios.get(
    `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
  );
  return resp.data.deliverability === 'DELIVERABLE'; // true if email exists
};


// Email sender setup
const transporter = nodemailer.createTransport({
  service: "gmail", // Or your preferred SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


// ✅ Signup with email verification

export const userSignUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const isValidEmail = await validateEmail(email);
if (!isValidEmail) {
  return res.status(400).json({ success: false, message: "Email does not exist. Enter a valid email." });
}


    const existingUser = await User.findOne({ email });

    // User already exists
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      } else {
        // Resend verification email for unverified user
        const verificationToken = crypto.randomBytes(32).toString("hex");
        existingUser.verificationToken = verificationToken;
        await existingUser.save();

        const verifyUrl = `http://10.0.2.2:5000/api/user/verify/${verificationToken}`;
        await transporter.sendMail({
          to: email,
          subject: "Verify Your Email",
          html: `<p>Hi ${existingUser.username},</p>
                 <p>Please click the link below to verify your email address:</p>
                 <a href="${verifyUrl}">${verifyUrl}</a>
                 <p>This link will expire in 24 hours.</p>`
        });

        return res.status(200).json({
          success: true,
          message: "A verification email has been resent. Please check your inbox."
        });
      }
    }

    // New user signup
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken
    });

    await newUser.save();

    const verifyUrl = `http://10.0.2.2:5000/api/user/verify/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `<p>Hi ${username},</p>
             <p>Please click the link below to verify your email address:</p>
             <a href="${verifyUrl}">${verifyUrl}</a>
             <p>This link will expire in 24 hours.</p>`
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful! Please check your email to verify your account."
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Email verification route

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("Invalid or expired verification token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send("Email verified successfully! You can now log in.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// Login (blocked if not verified)

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email before logging in" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(200).json({ success: true, user: userSafe, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Invalid credentials" });
  }
};

// ========================
// ✅ Update profile
// ========================
export const updateProfile = async (req, res) => {
  try {
    const { userId, username, about, profile } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, about, profile },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


//Get user by ID

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
