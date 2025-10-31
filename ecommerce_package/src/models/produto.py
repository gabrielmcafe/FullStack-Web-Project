from src.models.usuario import db

class Produto(db.Model):
    __tablename__ = 'produtos'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text)
    preco = db.Column(db.Numeric(10, 2), nullable=False)
    imagem_url = db.Column(db.String(255))
    estoque = db.Column(db.Integer, nullable=False, default=0)
    
    # Relacionamentos
    itens_pedido = db.relationship('ItemPedido', backref='produto', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'descricao': self.descricao,
            'preco': float(self.preco),
            'imagem_url': self.imagem_url,
            'estoque': self.estoque
        }
