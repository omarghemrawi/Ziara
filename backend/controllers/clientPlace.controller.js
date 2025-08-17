import User from "../models/user.model.js";
import ClientPlace from "../models/clientPlace.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendDeactivationEmail , sendClientRegisterNotfication } from "../utils/emailSender.js";

// ?
export const getAllPlaces = async (req, res) => {
  try {
    const resp = await ClientPlace.find({"plan.active" : true}).select("-password");;
    if (resp.length > 0) {
      return res.status(200).json({ places: resp });
    } else {
      return res.status(404).json({ message: "No Places found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};
export const SignUp = async (req, res) => {
  try {
    const { type, name, email, password } = req.body;

    if (!type || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingClient = await ClientPlace.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Client already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newClient = new ClientPlace({
      type,
      name,
      email,
      password: hashPassword,
    });
    await newClient.save();

    const token = jwt.sign({ id: newClient._id , role: newClient.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: _, ...clientData } = newClient.toObject();

    await sendClientRegisterNotfication(newClient);

    res.status(201).json({
      success: true,
      message: "Client registered successfully",
      user: { id: newClient._id, email: newClient.email, name: newClient.name },
      token,
    });
  } catch (error) {
    console.error("Error during client registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const client = await ClientPlace.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { password: _ , ...clientData } = client.toObject();
    const token = jwt.sign({ id: client._id , role: client.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: clientData,
    });
  } catch (error) {
    console.error("Error during client login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};  
export const completeRegister = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { city, phone } = req.body;

    if (!city || !phone) {
      return res.status(400).json({ message: "City and phone are required" });
    }

    const user = await ClientPlace.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.city = city;
    user.phone = phone;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        city: updatedUser.city,
        phone: updatedUser.phone,
      },
    });
  } catch (err) {
    console.error("Error completing registration:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req, res) => {
  try { 
    const updates = req.body;
    const oldVersion = await ClientPlace.findById(req.userId);
    
    if (!oldVersion) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    let updatedReferenceImages = oldVersion.referenceImages || [];

    
    //  Remove images if requested
    if (updates.referenceImagesToDelete && Array.isArray(updates.referenceImagesToDelete)) {
      updatedReferenceImages = updatedReferenceImages.filter(
        (img) => !updates.referenceImagesToDelete.includes(img)
      );
    }

    // Add new images if uploaded
    if (req.files?.referenceImages) {
      const newImages = req.files.referenceImages.map((img) => img.path);
      updatedReferenceImages = updatedReferenceImages.concat(newImages);
    }

    updates.referenceImages = updatedReferenceImages;
    // Handle single image upload

    if (req.files?.profile?.[0]) {
      updates.profile = req.files.profile[0].path;
    }
    const updatedUser = await ClientPlace.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true } //  new option returns the updated document and runValidators ensures validation rules are applied
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const submitPayment = async (req, res) => {
  try {
    const {  planName } = req.body;
    if ( !planName) {
      return res.status(400).json({
        message: " plan name is required",
      });
    }

    // Plan configuration
    const planConfig = {
      Standard: { imageLimit: 5, priority: "normal", fee: 10 },
      Plus: { imageLimit: 10, priority: "boosted", fee: 20 },
      Pro: { imageLimit: 1000, priority: "top", fee: 50 },
    };

    const selectedPlan = planConfig[planName];
    if (!selectedPlan) {
      return res.status(400).json({ message: "Invalid plan name" });
    }

    // All plans expire in 1 month
    const expireAtDate = new Date();
    expireAtDate.setMonth(expireAtDate.getMonth() + 1);

    // Update client plan
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

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment processed and plan activated successfully",
      plan: client.plan,
      user:client
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deactivePayment = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

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
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
     await sendDeactivationEmail(client.email, client.name);

    return res.status(200).json({
      success: true,
      message: "Plan has been deactivated",
      client,
    });
  } catch (error) {
    console.error("Error deactivating plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ! this done for admin
export const getPlace = async (req, res) => {
  try {
    const { place_id} = req.params;
    if (!place_id ) {
      return res
        .status(400)
        .json({ success: false, message: "Place ID is required " });
    }
   
    const place = await ClientPlace.findById(place_id)
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found in favorites" });
    }
    return res.status(200).json({ success: true, place });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getAllPlacesToAdmin = async (req, res) => { 
  try {
    const resp = await ClientPlace.find().select("-password");;
    if (resp.length > 0) {
      return res.status(200).json({ places: resp });
    } else {
      return res.status(404).json({ message: "No Places found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};



