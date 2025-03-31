const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

// ✅ Ensure unique index is properly created
UserSchema.index({ username: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', UserSchema);
