# Sistema de E-commerce - Loja de Roupas Online

## 📋 Visão Geral

Este é um sistema completo de e-commerce desenvolvido para uma loja de roupas online, implementando todas as funcionalidades essenciais de um site de vendas moderno.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Flask** - Framework web Python
- **MySQL** - Banco de dados relacional
- **SQLAlchemy** - ORM para Python
- **Flask-CORS** - Habilitação de CORS
- **PyMySQL** - Driver MySQL para Python

### Frontend
- **React** - Biblioteca JavaScript para UI
- **React Router** - Roteamento SPA
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes UI modernos
- **Lucide Icons** - Ícones SVG
- **Axios** - Cliente HTTP

### Banco de Dados
- **MySQL 8.0** - Sistema de gerenciamento de banco de dados

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐    SQL    ┌─────────────────┐
│                 │ ──────────────► │                 │ ────────► │                 │
│   Frontend      │                 │   Backend       │           │   MySQL         │
│   (React)       │ ◄────────────── │   (Flask)       │ ◄──────── │   Database      │
│                 │                 │                 │           │                 │
└─────────────────┘                 └─────────────────┘           └─────────────────┘
```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

1. **usuarios** - Dados dos usuários cadastrados
2. **produtos** - Catálogo de produtos
3. **pedidos** - Pedidos realizados
4. **itens_pedido** - Itens de cada pedido
5. **pagamentos** - Informações de pagamento

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Cadastro de usuários
- Login/logout
- Sessões seguras
- Hash de senhas

### ✅ Catálogo de Produtos
- Listagem de produtos
- Busca por nome/descrição
- Imagens dos produtos
- Controle de estoque

### ✅ Carrinho de Compras
- Adicionar/remover produtos
- Alterar quantidades
- Persistência no localStorage
- Cálculo automático de totais

### ✅ Sistema de Pedidos
- Criação de pedidos
- Histórico de compras
- Status de pedidos
- Controle de estoque automático

### ✅ Sistema de Pagamentos
- Simulação de pagamento
- Múltiplos métodos (cartão, PIX)
- Processamento de transações
- Confirmação de pagamento

## 📱 Páginas Implementadas

1. **Home** - Página inicial com produtos em destaque
2. **Produtos** - Catálogo completo com busca
3. **Login/Cadastro** - Autenticação de usuários
4. **Carrinho** - Gerenciamento do carrinho de compras
5. **Checkout** - Finalização de compras
6. **Pedidos** - Histórico de pedidos do usuário

## 🔧 Como Usar

### Acesso Público
- **URL**: https://5000-io4s3humw8zrvjxkgwtmp-5ee06134.manusvm.computer

### Usuário de Teste
- **Email**: joao@teste.com
- **Senha**: 123456

### Funcionalidades Disponíveis
1. Navegue pelos produtos na página inicial
2. Use o botão "Ver Produtos" para ver o catálogo completo
3. Faça login ou cadastre-se
4. Adicione produtos ao carrinho
5. Finalize uma compra no checkout
6. Veja seus pedidos na área do usuário

## 📦 Produtos de Exemplo

O sistema vem populado with 10 produtos de roupas:
- Camiseta Básica Branca (R$ 39,90)
- Calça Jeans Skinny (R$ 89,90)
- Vestido Floral Verão (R$ 79,90)
- Blazer Social Feminino (R$ 149,90)
- Tênis Casual Branco (R$ 129,90)
- E mais 5 produtos...

## 🎯 Recursos Técnicos

### Segurança
- Hash de senhas com SHA-256
- Validação de dados no frontend e backend
- Sessões seguras
- Sanitização de inputs

### Performance
- Lazy loading de componentes
- Otimização de imagens
- Cache de dados no frontend
- Queries otimizadas no banco

### UX/UI
- Design responsivo
- Animações suaves
- Feedback visual
- Loading states
- Error handling

## 🔄 Fluxo de Compra Completo

1. **Navegação** → Usuário explora produtos
2. **Seleção** → Adiciona itens ao carrinho
3. **Autenticação** → Faz login ou se cadastra
4. **Checkout** → Confirma pedido e dados de pagamento
5. **Pagamento** → Processa pagamento (simulado)
6. **Confirmação** → Recebe confirmação do pedido
7. **Acompanhamento** → Pode ver status na área de pedidos

## 📈 Próximas Melhorias Sugeridas

- Integração com gateway de pagamento real
- Sistema de avaliações de produtos
- Programa de fidelidade
- Chat de suporte
- Notificações por email
- Painel administrativo
- Relatórios de vendas
- Sistema de cupons de desconto

---

**Desenvolvido por**: Manus AI  
**Data**: Setembro 2025  
**Versão**: 1.0.0
