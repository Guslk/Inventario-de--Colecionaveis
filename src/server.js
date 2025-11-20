require('dotenv').config();

const app = require('./app');
const sequelize = require('./database');
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        await sequelize.sync({ force: false }); 
        console.log('Banco de dados sincronizado com sucesso!');

        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro fatal ao iniciar servidor:', error);
    }
}

startServer()
