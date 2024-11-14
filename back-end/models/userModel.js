// /back-end/models/userModel.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Função para criar um novo usuário
const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);  // Criptografando a senha
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// Função para encontrar um usuário por email
const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
