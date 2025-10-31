from src.models.usuario import db
from datetime import datetime

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    data_pedido = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='Pendente')
    total = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relacionamentos
    itens = db.relationship('ItemPedido', backref='pedido', lazy=True, cascade='all, delete-orphan')
    pagamentos = db.relationship('Pagamento', backref='pedido', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'data_pedido': self.data_pedido.isoformat() if self.data_pedido else None,
            'status': self.status,
            'total': float(self.total),
            'itens': [item.to_dict() for item in self.itens]
        }

class ItemPedido(db.Model):
    __tablename__ = 'itens_pedido'
    
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedidos.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco_unitario = db.Column(db.Numeric(10, 2), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'pedido_id': self.pedido_id,
            'produto_id': self.produto_id,
            'quantidade': self.quantidade,
            'preco_unitario': float(self.preco_unitario),
            'produto': self.produto.to_dict() if self.produto else None
        }
