import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    placeId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "placeModel",     
    required: true
  },
   placeModel: {
    type: String,
    required: true,
    enum: ["StaticPlace", "ClientPlace"],  
  },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    image:String,
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review; 