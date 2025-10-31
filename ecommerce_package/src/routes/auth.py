from flask import Blueprint, request, jsonify, session
from src.models.usuario import Usuario, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or not data.get('nome') or not data.get('email') or not data.get('senha'):
            return jsonify({'error': 'Nome, email e senha são obrigatórios'}), 400
        
        # Verificar se o usuário já existe
        if Usuario.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email já cadastrado'}), 400
        
        # Criar novo usuário
        usuario = Usuario(
            nome=data['nome'],
            email=data['email'],
            senha=data['senha']
        )
        
        db.session.add(usuario)
        db.session.commit()
        
        return jsonify({
            'message': 'Usuário criado com sucesso',
            'usuario': usuario.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('senha'):
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400
        
        usuario = Usuario.query.filter_by(email=data['email']).first()
        
        if not usuario or not usuario.verificar_senha(data['senha']):
            return jsonify({'error': 'Email ou senha inválidos'}), 401
        
        # Salvar na sessão
        session['usuario_id'] = usuario.id
        session['usuario_nome'] = usuario.nome
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'usuario': usuario.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout realizado com sucesso'}), 200

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    if 'usuario_id' not in session:
        return jsonify({'error': 'Usuário não autenticado'}), 401
    
    usuario = Usuario.query.get(session['usuario_id'])
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    
    return jsonify({'usuario': usuario.to_dict()}), 200
