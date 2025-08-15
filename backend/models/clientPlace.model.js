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
  totalView: Number,
  
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  plan: {
  name: { type: String, default: "Standard" }, // Standard | Plus | Pro
  subscribeAt: { type: Date, default: null },
  expireAt: { type: Date, default: null },
  imageLimit: { type: Number, default: 5 }, // Directly store limit
  priority: { type: String, default: "normal" }, // normal | boosted | top
  fee: { type: Number, default: 0 },
  active: {type: Boolean,default: false},
}
});

const ClientPlace = mongoose.model("ClientPlace", clientSchema);
export default ClientPlace;
