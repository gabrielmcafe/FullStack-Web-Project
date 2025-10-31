import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Calendar, CreditCard } from 'lucide-react';
import { pedidoService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadPedidos();
    }
  }, [user]);

  const loadPedidos = async () => {
    try {
      const response = await pedidoService.getAll();
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pago':
        return 'bg-green-100 text-green-800';
      case 'Enviado':
        return 'bg-blue-100 text-blue-800';
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
        
        {pedidos.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Nenhum pedido encontrado</h2>
            <p className="text-gray-600">
              Você ainda não fez nenhum pedido. Que tal dar uma olhada em nossos produtos?
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <Card key={pedido.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Pedido #{pedido.id}
                      </CardTitle>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(pedido.data_pedido)}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(pedido.status)}>
                        {pedido.status}
                      </Badge>
                      <p className="text-lg font-bold mt-2">
                        R$ {pedido.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Itens do pedido */}
                    <div>
                      <h4 className="font-semibold mb-2">Itens:</h4>
                      <div className="space-y-2">
                        {pedido.itens.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                {item.produto?.imagem_url ? (
                                  <img
                                    src={item.produto.imagem_url}
                                    alt={item.produto.nome}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <ShoppingBag className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{item.produto?.nome}</p>
                                <p className="text-sm text-gray-600">
                                  Quantidade: {item.quantidade} | Preço unitário: R$ {item.preco_unitario.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold">
                              R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Informações de pagamento */}
                    <div className="border-t pt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-1" />
                        <span>
                          {pedido.status === 'Pago' ? 'Pagamento aprovado' : 'Aguardando pagamento'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
