import User from "../models/user.model.js";
import ClientPlace from "../models/clientPlace.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ??? Done
export const getAllPlaces = async (req, res) => {
  try {
    const resp = await ClientPlace.find();
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
    // console.log(req.body);
    // console.log(process.env.JWT_SECRET);
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

    const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: _, ...clientData } = newClient.toObject();

    res.status(201).json({
      success: true,
      message: "Client registered successfully",
      token,
      user: clientData,
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
    const { password: _, ...clientData } = client.toObject();
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
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
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    console.log(updates);
    
    const oldVersion = await ClientPlace.findById(updates.userId);
    
    if (!oldVersion) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    let updatedReferenceImages = oldVersion.referenceImages || [];

    
    if (req.files?.referenceImages) {
  const newImages = req.files.referenceImages.map(img => img.path);
  updatedReferenceImages = updatedReferenceImages.concat(newImages);
}

updates.referenceImages = updatedReferenceImages;
    // Handle single image upload

    if (req.files?.profile?.[0]) {
      updates.profile = req.files.profile[0].path;
    }
    const updatedUser = await ClientPlace.findByIdAndUpdate(
      // req.userId,
      updates.userId,
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
    const { userId, paymentDetails } = req.body;
    if (!userId || !paymentDetails) {
      return res
        .status(400)
        .json({ message: "User ID and payment details are required" });
    }

    // utility function
    const calculateExpiryDate = (expireAt) => {
      const now = new Date();
      const date = new Date(now);

      switch (expireAt) {
        case "month":
          date.setMonth(date.getMonth() + 1);
          break;
        case "6month":
          date.setMonth(date.getMonth() + 6);
          break;
        case "year":
          date.setFullYear(date.getFullYear() + 1);
          break;
        default:
          throw new Error("Invalid expireAt value");
      }

      return date;
    };
    const expireDate = paymentDetails.expireAt;
    paymentDetails.expireAt = calculateExpiryDate(expireDate);

    const client = await ClientPlace.findByIdAndUpdate(
      userId,
      { $set: { plan: paymentDetails, active: true } },
      { new: true, runValidators: true }
    );

    // Check if client exists
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
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
          "plan.type": "",
          "plan.subscribeAt": null,
          "plan.expireAt": null,
          "plan.priority": "",
          "plan.fee": 0,
          active: false,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

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
  
// !!!
// export const getPlace = async (req, res) => {
//   try {
//     const { place_id, field } = req.query;
//     const userId = req.user.id;
//     if (!place_id || !field) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Place ID or field is required " });
//     }
//     const user = await User.findById(userId).select(field);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     const place = user.favoritePlaces.find((fav) => fav.place_id === place_id);
//     if (!place) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Place not found in favorites" });
//     }
//     return res.status(200).json({ success: true, place });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

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
