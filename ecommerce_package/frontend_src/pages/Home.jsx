import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import { produtoService } from '../services/api';
import { useCart } from '../contexts/CartContext';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const response = await produtoService.getAll();
      setProdutos(response.data.slice(0, 6)); // Mostrar apenas 6 produtos na home
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (produto) => {
    addItem(produto);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Bem-vindo à Nossa Loja de Roupas
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubra as últimas tendências da moda com qualidade e estilo únicos.
            Encontre peças que combinam com sua personalidade.
          </p>
          <Link to="/produtos">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Ver Produtos
            </Button>
          </Link>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Produtos em Destaque
          </h2>
          
          {produtos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Nenhum produto disponível no momento.
              </p>
              <p className="text-gray-500 mt-2">
                Volte em breve para ver nossas novidades!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {produtos.map((produto) => (
                <Card key={produto.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                      {produto.imagem_url ? (
                        <img
                          src={produto.imagem_url}
                          alt={produto.nome}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingCart className="h-16 w-16" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{produto.nome}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {produto.descricao}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => handleAddToCart(produto)}
                      className="w-full"
                      disabled={produto.estoque === 0}
                    >
                      {produto.estoque === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/produtos">
              <Button variant="outline" size="lg">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Receba seus produtos em até 3 dias úteis em todo o Brasil.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Produtos selecionados com os melhores materiais e acabamento.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Troca Fácil</h3>
              <p className="text-gray-600">
                Não gostou? Troque ou devolva em até 30 dias sem complicação.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
