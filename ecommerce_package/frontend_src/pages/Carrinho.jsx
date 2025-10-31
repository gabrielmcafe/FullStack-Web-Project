import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Carrinho = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (produtoId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(produtoId, newQuantity);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">
              Adicione alguns produtos ao seu carrinho para continuar comprando.
            </p>
            <Link to="/produtos">
              <Button size="lg">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itens do carrinho */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.produto.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Imagem do produto */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {item.produto.imagem_url ? (
                        <img
                          src={item.produto.imagem_url}
                          alt={item.produto.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingCart className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    {/* Informações do produto */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.produto.nome}</h3>
                      <p className="text-gray-600 text-sm">{item.produto.descricao}</p>
                      <p className="text-primary font-bold text-lg">
                        R$ {item.produto.preco.toFixed(2)}
                      </p>
                    </div>

                    {/* Controles de quantidade */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.produto.id, item.quantidade - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantidade}
                        onChange={(e) => handleQuantityChange(item.produto.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.produto.id, item.quantidade + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Subtotal e remover */}
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.produto.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Limpar Carrinho
              </Button>
              <Link to="/produtos">
                <Button variant="outline">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span>Grátis</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  {user ? 'Finalizar Compra' : 'Entrar para Finalizar'}
                </Button>

                {!user && (
                  <p className="text-sm text-gray-600 text-center">
                    Você precisa estar logado para finalizar a compra
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
