const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Obtém o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }

    req.user = user; // Armazena os dados do usuário no request (req) para uso nas rotas
    next(); // Passa para o próximo middleware ou rota
  });
};

module.exports = { authenticateToken };
