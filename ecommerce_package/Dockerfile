FROM python:3.11-slim

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código da aplicação
COPY src/ ./src/
COPY init_db.py .

# Criar diretório para banco de dados
RUN mkdir -p src/database

# Inicializar banco de dados
RUN python init_db.py

# Expor porta
EXPOSE 5000

# Comando para executar a aplicação
CMD ["python", "src/main.py"]
