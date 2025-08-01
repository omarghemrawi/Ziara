import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  sefersette: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  referenceImages: [String],
  rate: {
    type: Number,
    default: 0,
  },
  reviews: [],
  active: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  tiktok: {
    type: String,
  },

  plan: {
    planName: {
      type: String,
    },
    priority: {
      type: String,
    },
    subscribeAt: {
      type: Date,
    },
    expireAt: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
