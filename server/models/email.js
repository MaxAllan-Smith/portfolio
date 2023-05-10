const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema (
  {
    emailReference: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    emailAddress: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Email', emailSchema);