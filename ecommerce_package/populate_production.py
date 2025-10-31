#!/usr/bin/env python3
import requests
import json

# URL da produção
BASE_URL = 'https://nghki1cj0yom.manus.space/api'

# Dados de produtos de exemplo
produtos_exemplo = [
    {
        'nome': 'Camiseta Básica Branca',
        'descricao': 'Camiseta 100% algodão, confortável e versátil para o dia a dia.',
        'preco': 39.90,
        'imagem_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        'estoque': 50
    },
    {
        'nome': 'Calça Jeans Skinny',
        'descricao': 'Calça jeans skinny com elastano, perfeita para um look moderno.',
        'preco': 89.90,
        'imagem_url': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        'estoque': 30
    },
    {
        'nome': 'Vestido Floral Verão',
        'descricao': 'Vestido leve com estampa floral, ideal para os dias quentes.',
        'preco': 79.90,
        'imagem_url': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
        'estoque': 25
    },
    {
        'nome': 'Blazer Social Feminino',
        'descricao': 'Blazer elegante para ocasiões formais e profissionais.',
        'preco': 149.90,
        'imagem_url': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
        'estoque': 15
    },
    {
        'nome': 'Tênis Casual Branco',
        'descricao': 'Tênis confortável para uso diário, combina com qualquer look.',
        'preco': 129.90,
        'imagem_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        'estoque': 40
    },
    {
        'nome': 'Camisa Social Masculina',
        'descricao': 'Camisa social de alta qualidade, perfeita para o ambiente corporativo.',
        'preco': 69.90,
        'imagem_url': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
        'estoque': 35
    },
    {
        'nome': 'Saia Midi Plissada',
        'descricao': 'Saia midi com pregas, elegante e feminina.',
        'preco': 59.90,
        'imagem_url': 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400',
        'estoque': 20
    },
    {
        'nome': 'Jaqueta Jeans',
        'descricao': 'Jaqueta jeans clássica, um item atemporal no guarda-roupa.',
        'preco': 99.90,
        'imagem_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        'estoque': 18
    },
    {
        'nome': 'Shorts Jeans Feminino',
        'descricao': 'Shorts jeans confortável para os dias quentes.',
        'preco': 49.90,
        'imagem_url': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
        'estoque': 45
    },
    {
        'nome': 'Polo Masculina',
        'descricao': 'Camisa polo de qualidade, ideal para ocasiões casuais.',
        'preco': 54.90,
        'imagem_url': 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
        'estoque': 32
    }
]

def criar_produtos():
    print("Criando produtos no ambiente de produção...")
    
    for produto in produtos_exemplo:
        try:
            response = requests.post(f'{BASE_URL}/produtos', json=produto, timeout=30)
            if response.status_code == 201:
                print(f"✓ Produto criado: {produto['nome']}")
            else:
                print(f"✗ Erro ao criar produto {produto['nome']}: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"✗ Erro de conexão ao criar produto {produto['nome']}: {e}")

def criar_usuario_teste():
    print("\nCriando usuário de teste no ambiente de produção...")
    
    usuario_teste = {
        'nome': 'João Silva',
        'email': 'joao@teste.com',
        'senha': '123456'
    }
    
    try:
        response = requests.post(f'{BASE_URL}/register', json=usuario_teste, timeout=30)
        if response.status_code == 201:
            print("✓ Usuário de teste criado: joao@teste.com / 123456")
        else:
            print(f"✗ Erro ao criar usuário: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"✗ Erro de conexão ao criar usuário: {e}")

if __name__ == '__main__':
    print("=== Populando banco de produção ===")
    print(f"URL: {BASE_URL}")
    criar_produtos()
    criar_usuario_teste()
    print("\n=== Concluído ===")
