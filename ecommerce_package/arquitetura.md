# Arquitetura do Sistema de E-commerce

## Visão Geral

Este documento descreve a arquitetura do sistema de e-commerce para a loja de roupas online. O sistema será composto por um frontend desenvolvido em React, um backend em Flask (Python) e um banco de dados MySQL.

## Componentes

| Componente  | Tecnologia | Descrição                                                                        |
|-------------|------------|----------------------------------------------------------------------------------|
| Frontend    | React      | Interface do usuário (UI) para interação com clientes.                           |
| Backend     | Flask      | Servidor de aplicação que lida com a lógica de negócios, API e acesso ao banco. |
| Banco de Dados | MySQL      | Armazenamento de dados de usuários, produtos, pedidos, etc.                      |

## Fluxo de Dados

1. O cliente interage com o frontend (React) através do navegador.
2. O frontend envia requisições HTTP (GET, POST, PUT, DELETE) para o backend (Flask).
3. O backend processa as requisições, executa a lógica de negócios e interage com o banco de dados MySQL.
4. O backend retorna os dados solicitados (ou confirmações) para o frontend em formato JSON.
5. O frontend atualiza a UI com os dados recebidos.

