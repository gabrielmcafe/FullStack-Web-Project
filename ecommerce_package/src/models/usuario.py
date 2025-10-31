from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import hashlib

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    pedidos = db.relationship('Pedido', backref='usuario', lazy=True)
    
    def __init__(self, nome, email, senha):
        self.nome = nome
        self.email = email
        self.senha = self.hash_senha(senha)
    
    def hash_senha(self, senha):
        return hashlib.sha256(senha.encode('utf-8')).hexdigest()
    
    def verificar_senha(self, senha):
        return self.senha == hashlib.sha256(senha.encode('utf-8')).hexdigest()
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'data_criacao': self.data_criacao.isoformat() if self.data_criacao else None
        }
