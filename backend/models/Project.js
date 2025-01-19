// // import mongoose from 'mongoose';

// const mongoose = require('mongoose');

// const campaignSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true },
//   target: { type: Number, required: true, min: 1000 },
//   minInvestment: { type: Number, required: true, min: 100 },
//   duration: { type: Number, required: true, min: 1, max: 365 },
//   image: { type: String, required: true }, // Store image URL
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Campaign', campaignSchema);


const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  image: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
