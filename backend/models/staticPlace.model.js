import mongoose from 'mongoose';

const staticPlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['religious', 'touristic'],
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    profile: {
        type: String,
        // required: true
    },
    referenceImages: [],
    rate: {
        type: Number,
        default: 2,
        min: 0,
        max: 5
    },
    location: {
        city: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    }
}, {
    timestamps: true
});

const StaticPlace = mongoose.model('StaticPlace', staticPlaceSchema);
export default StaticPlace;
