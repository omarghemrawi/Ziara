import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  // What is being reported
  type: {
    type: String,
    enum: ['Client', 'User'], 
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
    refPath: 'clientType' 
  },
  clientType: {
    type: String,
    enum: ['User', 'Client'],
    required: true
  },
  reason: {
    type: String,
    enum: [
      // reasons user might report a place
      'false content',
      'spam',
      'offensive language',
      
      // reasons owner might report a user
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
