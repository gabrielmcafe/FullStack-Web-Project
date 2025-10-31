import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { pedidoService } from '../services/api';

const Checkout = () => {
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    setDadosCartao({
      ...dadosCartao,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Criar pedido
      const itensPedido = items.map(item => ({
        produto_id: item.produto.id,
        quantidade: item.quantidade,
      }));

      const pedidoResponse = await pedidoService.create({
        itens: itensPedido,
      });

      // Processar pagamento
      await pedidoService.processarPagamento(pedidoResponse.data.pedido.id, {
        metodo_pagamento: metodoPagamento,
        dados_cartao: dadosCartao,
      });

      setSuccess(true);
      clearCart();
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate('/pedidos');
      }, 3000);

    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao processar pedido');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Pedido Realizado!</h2>
            <p className="text-gray-600 mb-4">
              Seu pedido foi processado com sucesso. Você será redirecionado para a página de pedidos.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de pagamento */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Informações de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Método de pagamento */}
                  <div>
                    <Label className="text-base font-semibold">Método de Pagamento</Label>
                    <RadioGroup
                      value={metodoPagamento}
                      onValueChange={setMetodoPagamento}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cartao" id="cartao" />
                        <Label htmlFor="cartao">Cartão de Crédito</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix">PIX</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {metodoPagamento === 'cartao' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="numero">Número do Cartão</Label>
                        <Input
                          id="numero"
                          name="numero"
                          placeholder="1234 5678 9012 3456"
                          value={dadosCartao.numero}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="nome">Nome no Cartão</Label>
                        <Input
                          id="nome"
                          name="nome"
                          placeholder="Nome como está no cartão"
                          value={dadosCartao.nome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="validade">Validade</Label>
                          <Input
                            id="validade"
                            name="validade"
                            placeholder="MM/AA"
                            value={dadosCartao.validade}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={dadosCartao.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {metodoPagamento === 'pix' && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Após confirmar o pedido, você receberá o código PIX para pagamento.
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Processando...' : `Pagar R$ ${getTotal().toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div className="space-y-6">
            {/* Endereço de entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{user.nome}</p>
                  <p className="text-gray-600">Rua das Flores, 123</p>
                  <p className="text-gray-600">Centro - São Paulo, SP</p>
                  <p className="text-gray-600">CEP: 01234-567</p>
                </div>
              </CardContent>
            </Card>

            {/* Itens do pedido */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.produto.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.produto.nome}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantidade}</p>
                    </div>
                    <p className="font-semibold">
                      R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                    </p>
                  </div>
                ))}
                
                <hr />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
