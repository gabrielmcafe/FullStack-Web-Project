from flask import Blueprint, request, jsonify, session
from src.models.pedido import Pedido, ItemPedido
from src.models.produto import Produto
from src.models.pagamento import Pagamento
from src.models.usuario import db

pedidos_bp = Blueprint('pedidos', __name__)

@pedidos_bp.route('/pedidos', methods=['GET'])
def get_pedidos():
    if 'usuario_id' not in session:
        return jsonify({'error': 'Usuário não autenticado'}), 401
    
    try:
        pedidos = Pedido.query.filter_by(usuario_id=session['usuario_id']).all()
        return jsonify([pedido.to_dict() for pedido in pedidos]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pedidos_bp.route('/pedidos/<int:pedido_id>', methods=['GET'])
def get_pedido(pedido_id):
    if 'usuario_id' not in session:
        return jsonify({'error': 'Usuário não autenticado'}), 401
    
    try:
        pedido = Pedido.query.filter_by(id=pedido_id, usuario_id=session['usuario_id']).first()
        if not pedido:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        return jsonify(pedido.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pedidos_bp.route('/pedidos', methods=['POST'])
def create_pedido():
    if 'usuario_id' not in session:
        return jsonify({'error': 'Usuário não autenticado'}), 401
    
    try:
        data = request.get_json()
        
        if not data or not data.get('itens'):
            return jsonify({'error': 'Itens do pedido são obrigatórios'}), 400
        
        # Calcular total
        total = 0
        itens_validados = []
        
        for item_data in data['itens']:
            produto = Produto.query.get(item_data['produto_id'])
            if not produto:
                return jsonify({'error': f'Produto {item_data["produto_id"]} não encontrado'}), 404
            
            if produto.estoque < item_data['quantidade']:
                return jsonify({'error': f'Estoque insuficiente para {produto.nome}'}), 400
            
            subtotal = float(produto.preco) * item_data['quantidade']
            total += subtotal
            
            itens_validados.append({
                'produto': produto,
                'quantidade': item_data['quantidade'],
                'preco_unitario': produto.preco
            })
        
        # Criar pedido
        pedido = Pedido(
            usuario_id=session['usuario_id'],
            total=total
        )
        
        db.session.add(pedido)
        db.session.flush()  # Para obter o ID do pedido
        
        # Criar itens do pedido
        for item_validado in itens_validados:
            item_pedido = ItemPedido(
                pedido_id=pedido.id,
                produto_id=item_validado['produto'].id,
                quantidade=item_validado['quantidade'],
                preco_unitario=item_validado['preco_unitario']
            )
            db.session.add(item_pedido)
            
            # Atualizar estoque
            item_validado['produto'].estoque -= item_validado['quantidade']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Pedido criado com sucesso',
            'pedido': pedido.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@pedidos_bp.route('/pedidos/<int:pedido_id>/pagamento', methods=['POST'])
def processar_pagamento(pedido_id):
    if 'usuario_id' not in session:
        return jsonify({'error': 'Usuário não autenticado'}), 401
    
    try:
        pedido = Pedido.query.filter_by(id=pedido_id, usuario_id=session['usuario_id']).first()
        if not pedido:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        data = request.get_json()
        metodo_pagamento = data.get('metodo_pagamento', 'cartao')
        
        # Simular processamento de pagamento
        import uuid
        transacao_id = str(uuid.uuid4())
        
        pagamento = Pagamento(
            pedido_id=pedido.id,
            metodo_pagamento=metodo_pagamento,
            status_pagamento='Aprovado',
            transacao_id=transacao_id
        )
        
        # Atualizar status do pedido
        pedido.status = 'Pago'
        
        db.session.add(pagamento)
        db.session.commit()
        
        return jsonify({
            'message': 'Pagamento processado com sucesso',
            'pagamento': pagamento.to_dict(),
            'pedido': pedido.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
