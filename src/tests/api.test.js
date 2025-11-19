// tests/api.test.js
const request = require('supertest'); 
const app = require('../app'); 


describe('API Health Check', () => {

    
    it('Deve retornar status 200 e uma mensagem de "ok" na rota GET /api/health-check', async () => {
        // 'request(app)' usa o Supertest
        const response = await request(app)
            .get('/api/health-check')
            .expect(200); 

        
        expect(response.body).toEqual({ status: 'ok' });
    });

});