const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'meu_banco.db',
    logging: false 
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o Sequelize (SQLite) estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}


if (require.main === module) {
    testConnection();
}

module.exports = sequelize;