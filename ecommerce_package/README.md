# 🛍️ E-commerce Loja de Roupas - Protótipo Completo

## 📋 Visão Geral

Este é um sistema completo de e-commerce desenvolvido com **React** (frontend) e **Flask** (backend), incluindo banco de dados SQLite, sistema de autenticação, carrinho de compras e simulação de pagamentos.

## 🏗️ Estrutura do Projeto

```
ecommerce_package/
├── src/                          # Backend Flask
│   ├── main.py                   # Aplicação principal
│   ├── config.py                 # Configurações
│   ├── models/                   # Modelos do banco
│   │   ├── usuario.py
│   │   ├── produto.py
│   │   ├── pedido.py
│   │   └── pagamento.py
│   ├── routes/                   # Rotas da API
│   │   ├── auth.py
│   │   ├── produtos.py
│   │   └── pedidos.py
│   ├── static/                   # Frontend buildado
│   └── database/                 # Banco SQLite
├── frontend_src/                 # Código fonte React
│   ├── App.jsx                   # Componente principal
│   ├── services/api.js           # Cliente API
│   ├── contexts/                 # Contextos React
│   ├── components/               # Componentes
│   └── pages/                    # Páginas
├── requirements.txt              # Dependências Python
├── package.json                  # Dependências Node.js
├── schema.sql                    # Esquema do banco
├── init_db.py                    # Script inicialização
└── README.md                     # Este arquivo
```

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Python 3.11+
- Node.js 18+
- npm ou yarn

### 2. Backend (Flask)

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Inicializar banco de dados
python init_db.py

# Executar servidor
python src/main.py
```

O backend estará rodando em: `http://localhost:5000`

### 3. Frontend (React)

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

### 4. Build para Produção

```bash
# Build do frontend
npm run build

# Copiar arquivos para o backend
cp -r dist/* ../src/static/

# Executar apenas o backend (serve frontend + API)
python src/main.py
```

## 🗄️ Banco de Dados

### Estrutura das Tabelas

1. **usuarios** - Dados dos usuários
2. **produtos** - Catálogo de produtos
3. **pedidos** - Pedidos realizados
4. **itens_pedido** - Itens de cada pedido
5. **pagamentos** - Informações de pagamento

### Dados de Teste

**Usuário:**
- Email: `joao@teste.com`
- Senha: `123456`

**Produtos:** 10 produtos de roupas com imagens do Unsplash

## 🔧 Configuração

### Backend (config.py)
```python
SECRET_KEY = 'sua_chave_secreta'
SQLALCHEMY_DATABASE_URI = 'sqlite:///database/ecommerce.db'
```

### Frontend (api.js)
```javascript
const API_BASE_URL = '/api';  // Para produção
// const API_BASE_URL = 'http://localhost:5000/api';  // Para desenvolvimento
```

## 📡 API Endpoints

### Autenticação
- `POST /api/register` - Cadastro
- `POST /api/login` - Login
- `POST /api/logout` - Logout

### Produtos
- `GET /api/produtos` - Listar produtos
- `GET /api/produtos/<id>` - Produto específico
- `POST /api/produtos` - Criar produto (admin)

### Pedidos
- `GET /api/pedidos` - Pedidos do usuário
- `POST /api/pedidos` - Criar pedido
- `GET /api/pedidos/<id>` - Pedido específico

## 🎨 Funcionalidades

### ✅ Implementadas
- [x] Catálogo de produtos com imagens
- [x] Sistema de autenticação completo
- [x] Carrinho de compras persistente
- [x] Checkout com simulação de pagamento
- [x] Histórico de pedidos
- [x] Design responsivo
- [x] Busca de produtos
- [x] Controle de estoque

### 🔄 Para Implementar (Melhorias)
- [ ] Painel administrativo
- [ ] Pagamentos reais (Stripe/Mercado Pago)
- [ ] Sistema de avaliações
- [ ] Notificações por email
- [ ] Cupons de desconto
- [ ] Múltiplas imagens por produto
- [ ] Filtros avançados
- [ ] Wishlist

## 🚀 Deploy

### Opção 1: Servidor VPS (DigitalOcean, AWS)
1. Criar servidor Ubuntu
2. Instalar Docker
3. Usar docker-compose.yml (criar baseado no código)
4. Configurar Nginx + SSL

### Opção 2: Plataformas Modernas
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Fly.io
- **Banco**: PlanetScale, Supabase

## 🔒 Segurança

### Implementado
- Hash de senhas (SHA-256)
- Validação de dados
- CORS configurado
- Sanitização de inputs

### Para Produção
- Usar HTTPS obrigatório
- Implementar rate limiting
- Adicionar logs de auditoria
- Usar JWT para sessões
- Validação mais robusta

## 📱 Tecnologias Utilizadas

### Backend
- **Flask** - Framework web
- **SQLAlchemy** - ORM
- **SQLite** - Banco de dados
- **Flask-CORS** - CORS

### Frontend
- **React** - UI Library
- **React Router** - Roteamento
- **Tailwind CSS** - Styling
- **Lucide Icons** - Ícones
- **Axios** - HTTP Client

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verificar configuração do Flask-CORS
   - Conferir URLs da API

2. **Banco não inicializa**
   - Executar `python init_db.py`
   - Verificar permissões da pasta database

3. **Frontend não conecta com backend**
   - Verificar URL da API em `services/api.js`
   - Confirmar que backend está rodando

4. **Produtos não aparecem**
   - Verificar se banco foi populado
   - Testar endpoint `/api/produtos` diretamente

## 📞 Suporte

Para dúvidas sobre implementação:
1. Verificar logs do console (F12)
2. Testar endpoints da API diretamente
3. Conferir documentação do Flask/React

## 📄 Licença

Este é um projeto de demonstração/protótipo. Use livremente para aprendizado e desenvolvimento.

---

**🎯 Objetivo**: Este protótipo demonstra um e-commerce completo e funcional, pronto para ser expandido para um projeto real de produção.

**💡 Próximo Passo**: Seguir o guia `GUIA_PRODUCAO_REAL.md` para colocar em produção com domínio próprio.
