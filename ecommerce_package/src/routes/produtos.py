from flask import Blueprint, request, jsonify
from src.models.produto import Produto
from src.models.usuario import db

produtos_bp = Blueprint('produtos', __name__)

@produtos_bp.route('/produtos', methods=['GET'])
def get_produtos():
    try:
        produtos = Produto.query.all()
        return jsonify([produto.to_dict() for produto in produtos]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@produtos_bp.route('/produtos/<int:produto_id>', methods=['GET'])
def get_produto(produto_id):
    try:
        produto = Produto.query.get_or_404(produto_id)
        return jsonify(produto.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@produtos_bp.route('/produtos', methods=['POST'])
def create_produto():
    try:
        data = request.get_json()
        
        if not data or not data.get('nome') or not data.get('preco'):
            return jsonify({'error': 'Nome e preço são obrigatórios'}), 400
        
        produto = Produto(
            nome=data['nome'],
            descricao=data.get('descricao', ''),
            preco=data['preco'],
            imagem_url=data.get('imagem_url', ''),
            estoque=data.get('estoque', 0)
        )
        
        db.session.add(produto)
        db.session.commit()
        
        return jsonify({
            'message': 'Produto criado com sucesso',
            'produto': produto.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@produtos_bp.route('/produtos/<int:produto_id>', methods=['PUT'])
def update_produto(produto_id):
    try:
        produto = Produto.query.get_or_404(produto_id)
        data = request.get_json()
        
        if data.get('nome'):
            produto.nome = data['nome']
        if data.get('descricao'):
            produto.descricao = data['descricao']
        if data.get('preco'):
            produto.preco = data['preco']
        if data.get('imagem_url'):
            produto.imagem_url = data['imagem_url']
        if data.get('estoque') is not None:
            produto.estoque = data['estoque']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Produto atualizado com sucesso',
            'produto': produto.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@produtos_bp.route('/produtos/<int:produto_id>', methods=['DELETE'])
def delete_produto(produto_id):
    try:
        produto = Produto.query.get_or_404(produto_id)
        db.session.delete(produto)
        db.session.commit()
        
        return jsonify({'message': 'Produto deletado com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
