import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type:String
   },
     city: {
      type: String,
    },
  description: {
    type: String,
  },
  profile: {
    type: String,
  },
  phone: String,
  referenceImages: [],
  rate: {
    type: Number,
    default: 2,
    min: 0,
    max: 5,
  },
  reviews: [],
  totalView: Number,
  active: {
    type: Boolean,
    default: false,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  plan: {
    type: {
      type: String,
      default: "", // Monthly || Six Month || Year
    },
    subscribeAt: {
      type: Date,
      default: null,
    },
    expireAt: {
      type: Date,
      default: null,
    },
    priority: { type: String, default: "" },
    fee: { type: Number, default: 0 },
  },
});

const ClientPlace = mongoose.model("ClientPlace", clientSchema);
export default ClientPlace;
