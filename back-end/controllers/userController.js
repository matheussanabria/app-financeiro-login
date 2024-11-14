const User = require('../models/User'); // Certifique-se que tem um modelo de usuário

// Função para obter o perfil do usuário autenticado
const getUserProfile = async (req, res) => {
  try {
    // Pega o userId armazenado no middleware de autenticação
    const user = await User.findById(req.user.userId).select('-password'); // Retira o campo de senha

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna os dados do usuário
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

module.exports = { getUserProfile };
