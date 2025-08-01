import User from "../models/user.model.js";
import { Review } from "../models/review.model.js";
import Client from "../models/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Status Code : 200 = OK , 201= created , 400= bad request (invalid input) , 401= Unauthorized (wrong credentials), 500 = internal server Error

export const userSignUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    //Validate Required fields
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    //Check If User is Already exist
    const userIsExist = await User.findOne({ email });
    if (userIsExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" });
    }

    //Hash passord for more security
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create New User
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save(); // we used .save instead of .create directly before with newUser because if we wanna do some custom logic before saving

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Remove Password before send to frontend
    const userSafe = newUser.toObject();
    delete userSafe.password;

    return res.status(201).json({
      success: true,
      message: "User SignUp Successfully",
      user: userSafe,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // check if user is exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email is not exist" });
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //check if password is correct
    if (!passwordIsCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Password is not correct" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove Password before send to frontend
    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(200).json({ success: true, user: userSafe, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid Credentials" });
  }
};


// Done + should edit userId
export const createReview = async (req, res) => {
  try {
    const { placeId,userId, rate, review, date ,image } = req.body;
    // const userId = req.user.id;

    // Validate required fields
    if (!placeId || !rate || !review || !userId || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Create new review
    const newReview = new Review({
      placeId,
      userId,
      rate,
      review,
      image,
      visitedDate: date ? new Date(date) : new Date(),
    });

    await newReview.save();

    // Add review to user's reviews array
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.review.push(newReview._id);
    await user.save();

    const place = await Client.findById(placeId);
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found" });
    }
    place.reviews.push(newReview._id);
    await place.save();

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("review");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      reviews: user.review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(200).json({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUser = async (req, res) => { 
  const {id} = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { userId, username, about, profileImage } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        about,
        profileImage,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Edit profile error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
