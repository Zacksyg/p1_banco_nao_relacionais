const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user'); 

const app = express();

mongoose.connect('mongodb+srv://gabriellimapn:gb12345678@cluster0.4zohpa8.mongodb.net',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
const db = mongoose.connection;

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

db.on('connected', () => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
    addExampleData();
});

db.on('error', (err) => {
    console.error('Erro de conexão com o MongoDB:', err);
});

db.on('disconnected', () => {
    console.log('Desconectado do MongoDB');
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'views')));


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.post('/api/usuarios', async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const novoUsuario = new User({
        username: username,
        password: password,
        email: email
      });
  
      await novoUsuario.save();
  
      res.status(201).json({ message: 'Usuário adicionado com sucesso' });
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      res.status(500).json({ message: 'Erro ao adicionar usuário' });
    }
});
  

async function addExampleData() {
    try {
        const existingUser = await User.findOne({ email: 'exemplo@example.com' });
        if (!existingUser) {
            const exampleUser = new User({
                username: 'exemplo',
                password: 'senha123',
                email: 'exemplo@example.com'
            });
            await exampleUser.save();
            console.log('Dados de exemplo adicionados com sucesso');
        } else {
            console.log('Usuário de exemplo já existe');
        }
    } catch (error) {
        console.error('Erro ao adicionar dados de exemplo:', error);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
