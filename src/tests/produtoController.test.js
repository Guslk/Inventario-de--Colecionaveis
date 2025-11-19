// tests/produtoController.test.js

const produtoController = require('../controllers/produtoController');
const Produto = require('../models/produto'); 

jest.mock('../models/produto');


describe('ProdutoController - Testes Unitários', () => {


    afterEach(() => {
        jest.clearAllMocks();
    });


    it('deve retornar todos os produtos e status 200 (getAllProdutos)', async () => {

  
        const mockProdutos = [
            { id: 1, nome: 'Produto Mock 1', preco: 10 },
            { id: 2, nome: 'Produto Mock 2', preco: 20 }
        ];

        
        Produto.findAll.mockResolvedValue(mockProdutos);

       
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(), 
            json: jest.fn()
        };

        await produtoController.getAllProdutos(req, res);

      
        expect(Produto.findAll).toHaveBeenCalledTimes(1);
      
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProdutos);
    });

  
    it('deve criar um produto e retornar status 201 (createProduto)', async () => {

       
        const novoProdutoMock = { nome: 'Produto Novo', preco: 50 };
        const produtoCriadoMock = { id: 3, ...novoProdutoMock };

      
        Produto.create.mockResolvedValue(produtoCriadoMock);

        
        const req = {
            body: novoProdutoMock
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        
        await produtoController.createProduto(req, res);

        
        expect(Produto.create).toHaveBeenCalledWith(novoProdutoMock);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(produtoCriadoMock);
    });

   
});