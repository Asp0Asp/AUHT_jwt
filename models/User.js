const mongoose = require('mongoose');

// Defina o esquema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Crie o modelo de usuário com base no esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
