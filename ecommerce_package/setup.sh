#!/bin/bash

echo "🚀 Configurando E-commerce Loja de Roupas..."

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3.11+"
    exit 1
fi

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+"
    exit 1
fi

echo "✅ Pré-requisitos verificados"

# Criar ambiente virtual Python
echo "📦 Criando ambiente virtual Python..."
python3 -m venv venv

# Ativar ambiente virtual
echo "🔧 Ativando ambiente virtual..."
source venv/bin/activate

# Instalar dependências Python
echo "📥 Instalando dependências Python..."
pip install -r requirements.txt

# Inicializar banco de dados
echo "🗄️ Inicializando banco de dados..."
python init_db.py

echo "✅ Backend configurado com sucesso!"

# Verificar se existe diretório frontend_src
if [ -d "frontend_src" ]; then
    echo "📦 Instalando dependências do frontend..."
    cd frontend_src
    npm install
    
    echo "🏗️ Fazendo build do frontend..."
    npm run build
    
    echo "📁 Copiando arquivos para o backend..."
    cp -r dist/* ../src/static/
    
    cd ..
    echo "✅ Frontend configurado com sucesso!"
else
    echo "⚠️ Diretório frontend_src não encontrado. Usando apenas backend."
fi

echo ""
echo "🎉 Configuração concluída!"
echo ""
echo "Para executar o projeto:"
echo "1. Ativar ambiente virtual: source venv/bin/activate"
echo "2. Executar servidor: python src/main.py"
echo "3. Acessar: http://localhost:5000"
echo ""
echo "Usuário de teste:"
echo "Email: joao@teste.com"
echo "Senha: 123456"
echo ""
echo "🚀 Bom desenvolvimento!"
