import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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


export const userSignUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    // User already exists
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      } else {
        // Resend verification code for unverified user
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        existingUser.verificationCode = verificationCode;
        await existingUser.save();

        await transporter.sendMail({
          to: email,
          subject: "Verify Your Email",
          html: `<p>Hi ${existingUser.username},</p>
                 <p>Your verification code is: <b>${verificationCode}</b></p>
                 <p>This code will expire in 10 minutes.</p>`,
        });

        return res.status(200).json({
          success: true,
          message: "A verification code has been resent. Please check your inbox.",
        });
      }
    }

    // New user signup
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationCode,
    });

    await newUser.save();

    // Send verification code
    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `<p>Hi ${username},</p>
             <p>Your verification code is: <b>${verificationCode}</b></p>
             <p>This code will expire in 10 minutes.</p>`,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful! Please check your email to verify your account.",
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
      { id: user._id, email: user.email , role: user.role },
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
    const { username, about, profile } = req.body;
    const userId = req.userId

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, about, profile },
      { new: true }
    ).select("-password");

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


//Get single user by ID
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
//Get all user 
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
// Delete User
export const deleteUser = async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findOneAndDelete(id).select("-password");
    if (!user) {
  return res.status(404).json({ message: "User not found." });
}
    res.status(200).json({ success:true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
export const verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: "Email and code are required" });
    }

    const user = await User.findOne({ email, verificationCode:code.toString()});

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid code or email" });
    }

    user.isVerified = true;
    user.verificationCode = undefined; // remove code after verification
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified' });
    }

    // Generate new 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = code;
    await user.save();

    // Send code via email
    await transporter.sendMail({
      to: email,
      subject: 'Your verification code',
      html: `<p>Hi ${user.username},</p>
             <p>Your new verification code is: <b>${code}</b></p>
             <p>This code will expire in 10 minutes.</p>`,
    });

    res.status(200).json({
      success: true,
      message: 'Verification code has been resent. Please check your email.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Forgot Password (send reset code)
// ========================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    // Generate reset code (6-digit)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    user.resetCodeExpire = Date.now() + 10 * 60 * 1000; // valid for 10 minutes
    await user.save();

    // Send email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hi ${user.username},</p>
             <p>Your password reset code is: <b>${resetCode}</b></p>
             <p>This code will expire in 10 minutes.</p>`,
    });

    return res.status(200).json({
      success: true,
      message: "Reset code sent to your email.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ========================
// Reset Password (with code)
// ========================
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email, resetCode: code });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid code or email" });
    }

    // Check expiration
    if (Date.now() > user.resetCodeExpire) {
      return res.status(400).json({ success: false, message: "Reset code expired" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
