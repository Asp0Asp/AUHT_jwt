# AUHT_jwt
---

# API de Registro de Usuários

Esta é uma API simples para registro de usuários, usando Node.js, Express, JWT e MongoDB. Ela inclui rotas públicas e privadas para autenticação e busca de usuários.

## Pré-requisitos

- Node.js instalado
- MongoDB configurado (você pode usar o MongoDB Atlas ou instalar localmente)

## Instalação

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/sua-api.git
   ```

2. Instale as dependências:
   ```
   cd sua-api
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```
   PORT=3000
   MONGODB_URI=sua_url_de_conexão_com_o_banco_de_dados
   SECRET=sua_chave_secreta_para_jwt
   ```

4. Execute a aplicação:
   ```
   npm run dev
   ```

## Rotas

### Rota Pública

- `GET /`
  - Retorna uma mensagem de boas-vindas à API.

### Rota Privada

- `GET /user/:id`
  - Requer autenticação (token JWT).
  - Busca um usuário pelo ID.
  - Retorna os dados do usuário (exceto a senha).

### Registro de Usuário

- `POST /auth/register`
  - Cria um novo usuário.
  - Parâmetros obrigatórios: `name`, `email`, `password`, `confirmpassword`.

## Exemplo de Uso

1. Registre um usuário:
   ```
   POST /auth/register
   {
     "name": "Seu Nome",
     "email": "seu@email.com",
     "password": "sua_senha",
     "confirmpassword": "sua_senha"
   }
   ```

2. Faça login para obter um token JWT.

3. Acesse a rota privada:
   ```
   GET /user/:id (com o token no cabeçalho de autorização)
   ```
