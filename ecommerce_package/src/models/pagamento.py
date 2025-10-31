from src.models.usuario import db
from datetime import datetime

class Pagamento(db.Model):
    __tablename__ = 'pagamentos'
    
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedidos.id'), nullable=False)
    metodo_pagamento = db.Column(db.String(50), nullable=False)
    status_pagamento = db.Column(db.String(50), default='Pendente')
    transacao_id = db.Column(db.String(255))
    data_pagamento = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'pedido_id': self.pedido_id,
            'metodo_pagamento': self.metodo_pagamento,
            'status_pagamento': self.status_pagamento,
            'transacao_id': self.transacao_id,
            'data_pagamento': self.data_pagamento.isoformat() if self.data_pagamento else None
        }
