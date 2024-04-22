const userRepository = require('../repositories/userRepository');

class AuthController {
    async login(req, res) {
        const { email, senha } = req.body;
    
        try {
            const user = await userRepository.findUserByEmail(email);
    
            if (!user || user.password !== senha) {
                console.log('Credenciais inválidas');
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            console.log('Login bem-sucedido');
            res.status(200).json({ message: 'Login bem-sucedido' });
        } catch (error) {
            console.error('Erro durante o login:', error);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }        
    }
    

}

module.exports = new AuthController();
