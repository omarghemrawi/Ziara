import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ClientPlace from "../models/clientPlace.model.js";
import { sendClientRegisterNotfication, sendBannednEmail, sendDeactivationEmail } from "../utils/emailSender.js";

//! Fetch all active client places
// ============================
export const getAllPlaces = async (req, res) => {
  try {
    const places = await ClientPlace.find({ "plan.active": true }).select("-password");
    if (!places.length) {
      return res.status(404).json({ success: false, message: "No active places found" });
    }
    res.status(200).json({ success: true, places });
  } catch (error) {
    console.error("Error fetching active places:", error);
    res.status(500).json({ success: false, message: "Failed to fetch active places" });
  }
};

//! Client Sign Up
// ============================
export const SignUp = async (req, res) => {
  try {
    const { type, name, email, password } = req.body;

    if (!type || !name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingClient = await ClientPlace.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ success: false, message: "Client already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newClient = new ClientPlace({ type, name, email, password: hashPassword });
    await newClient.save();

    const token = jwt.sign({ id: newClient._id, role: newClient.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await sendClientRegisterNotfication(newClient);

    res.status(201).json({
      success: true,
      message: "Client registered successfully",
      user: { id: newClient._id, name: newClient.name, email: newClient.email },
      token,
    });
  } catch (error) {
    console.error("Error during client registration:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Client Log In
// ============================
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const client = await ClientPlace.findOne({ email });
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: client._id, role: client.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...clientData } = client.toObject();

    res.status(200).json({ success: true, message: "Login successful", token, user: clientData });
  } catch (error) {
    console.error("Error during client login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Delete client (Admin only)
// ============================
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });

    const deletedUser = await ClientPlace.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });

    await sendBannednEmail(deletedUser.email, deletedUser.name);

    res.status(200).json({ success: true, message: "Client deleted successfully" });
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Complete Registration (add city & phone)
// ============================
export const completeRegister = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { city, phone } = req.body;
    if (!city || !phone) return res.status(400).json({ success: false, message: "City and phone are required" });

    const updatedUser = await ClientPlace.findByIdAndUpdate(
      userId,
      { city, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error completing registration:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Update Profile (images & info)
// ============================
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const oldVersion = await ClientPlace.findById(req.userId);
    if (!oldVersion) return res.status(404).json({ success: false, message: "Client not found" });

    // Handle reference images
    let updatedReferenceImages = oldVersion.referenceImages || [];

    if (updates.referenceImagesToDelete && Array.isArray(updates.referenceImagesToDelete)) {
      updatedReferenceImages = updatedReferenceImages.filter(img => !updates.referenceImagesToDelete.includes(img));
    }

    if (req.files?.referenceImages) {
      const newImages = req.files.referenceImages.map(img => img.path);
      updatedReferenceImages = updatedReferenceImages.concat(newImages);
    }

    updates.referenceImages = updatedReferenceImages;

    // Handle profile image
    if (req.files?.profile?.[0]) updates.profile = req.files.profile[0].path;

    const updatedUser = await ClientPlace.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Submit Payment / Activate Plan
// ============================
export const submitPayment = async (req, res) => {
  try {
    const { planName } = req.body;
    if (!planName) return res.status(400).json({ success: false, message: "Plan name is required" });

    const planConfig = {
      Standard: { imageLimit: 5, priority: "normal", fee: 10 },
      Plus: { imageLimit: 10, priority: "boosted", fee: 20 },
      Pro: { imageLimit: 1000, priority: "top", fee: 50 },
    };

    const selectedPlan = planConfig[planName];
    if (!selectedPlan) return res.status(400).json({ success: false, message: "Invalid plan name" });

    const expireAtDate = new Date();
    expireAtDate.setMonth(expireAtDate.getMonth() + 1);

    const client = await ClientPlace.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          plan: {
            name: planName,
            subscribeAt: new Date(),
            expireAt: expireAtDate,
            imageLimit: selectedPlan.imageLimit,
            priority: selectedPlan.priority,
            fee: selectedPlan.fee,
            active: true,
          },
        },
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!client) return res.status(404).json({ success: false, message: "Client not found" });

    res.status(200).json({ success: true, message: "Payment processed and plan activated", plan: client.plan, user: client });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Deactivate Plan
// ============================
export const deactivePayment = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    const client = await ClientPlace.findByIdAndUpdate(
      userId,
      {
        $set: {
          "plan.name": "",
          "plan.subscribeAt": null,
          "plan.expireAt": null,
          "plan.priority": "",
          "plan.fee": 0,
          "plan.active": false,
        },
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!client) return res.status(404).json({ success: false, message: "Client not found" });

    await sendDeactivationEmail(client.email, client.name);

    res.status(200).json({ success: true, message: "Plan deactivated successfully", client });
  } catch (error) {
    console.error("Error deactivating plan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Get a single place by ID (Admin)
// ============================
export const getPlace = async (req, res) => {
  try {
    const { place_id } = req.params;
    if (!place_id) return res.status(400).json({ success: false, message: "Place ID is required" });

    const place = await ClientPlace.findById(place_id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });

    res.status(200).json({ success: true, place });
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Get all places (Admin)
// ============================
export const getAllPlacesToAdmin = async (req, res) => {
  try {
    const places = await ClientPlace.find().select("-password");
    if (!places.length) return res.status(404).json({ success: false, message: "No places found" });
    res.status(200).json({ success: true, places });
  } catch (error) {
    console.error("Error fetching all places for admin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import ClientPlace from "../models/clientPlace.model.js";

// ================================
// Forgot Password
// ================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const client = await ClientPlace.findOne({ email });
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Generate code 6 digits
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    client.resetCode = code;
    client.resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await client.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ziara" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Ziara Password Reset Code",
      html: `<p>Your password reset code is: <b>${code}</b></p>`,
    });

    res.json({ success: true, message: "Reset code sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================================
// Reset Password
// ================================
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const client = await ClientPlace.findOne({ email });
    if (!client) return res.status(404).json({ message: "Client not found" });

    const isExpired = !client.resetCodeExpire || client.resetCodeExpire < Date.now();
    const codeMismatch = client.resetCode !== code;

    if (codeMismatch || isExpired) {
      return res.status(400).json({ success: false, message: "Invalid or expired code" });
    }

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    client.password = hashed;
    client.resetCode = undefined;
    client.resetCodeExpire = undefined;
    await client.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};