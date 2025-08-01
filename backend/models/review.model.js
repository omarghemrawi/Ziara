import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StaticPlace',
        required: true
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
    userName: {
        type: String,
        required: true
    },
    photo:String
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review; 