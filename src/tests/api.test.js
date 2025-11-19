// tests/api.test.js

const request = require('supertest');
const app = require('../app');
const Produto = require('../models/produto'); 


jest.mock('../models/produto');




describe('API de Produtos (com Mocks)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/produtos - Deve retornar a lista de produtos do Model', async () => {

        const mockProdutos = [
            { id: 1, nome: 'Produto da Rota 1', preco: 100 }
        ];
      
        Produto.findAll.mockResolvedValue(mockProdutos);

        
        const response = await request(app)
            .get('/api/produtos')
            .expect(200); 

        
        expect(response.body).toEqual(mockProdutos);
       
        expect(Produto.findAll).toHaveBeenCalledTimes(1);
    });

    it('POST /api/produtos - Deve criar um produto (sem token)', async () => {
       

        const response = await request(app)
            .post('/api/produtos')
            .send({ nome: 'Teste', preco: 10 });

       
        expect([401, 403]).toContain(response.status);
        
        expect(Produto.create).not.toHaveBeenCalled();
    });


});