const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 }, // Initial balance is zero
});

module.exports = mongoose.model('Wallet', WalletSchema);
