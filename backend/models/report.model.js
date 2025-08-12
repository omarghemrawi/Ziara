import mongoose from 'mongoose';
import User from './user.model.js';


const reportSchema = new mongoose.Schema({
  // What is being reported
  type: {
    type: String,
    enum: ['ClientPlace', 'User'], 
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'type' 
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'complainant' 
  },
  complainant: {
    type: String,
    enum: ['User', 'ClientPlace'],
    required: true
  },
  reviewReported:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"Review"
  },
  reason: {
    type: [String],
    enum: [
      'Offensive Language', // for Each
      
      // reasons user might report a place
      'Hate Speech',
      'Inappropriate Content',
      'Misleading Content',
      // reasons owner might report a user
      'Spam',
    ],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'action_taken'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
