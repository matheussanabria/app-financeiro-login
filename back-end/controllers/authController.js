// /back-end/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/userModel');

// Registrar novo usuário
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar se o usuário já existe
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  try {
    const user = await createUser(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Fazer login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  // Verificar a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  // Gerar token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { registerUser, loginUser };
