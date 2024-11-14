// /back-end/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ou userRoutes, se você criar uma nova
const userRoutes = require('./routes/userRoutes'); // Se necessário

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes); // Aqui você já tem a rota de login
app.use('/api/users', userRoutes); // Ou crie uma rota para buscar os dados do usuário

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
