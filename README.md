<h1 align="center">Projeto App de Delivery</h1>

## Descrição

O projeto App de Delivery é uma aplicação Full Stack desenvolvida para uma distribuidora de bebidas. Foi criando e integrado tanto o back-end quanto o front-end, de uma plataforma de delivery de bebidas. Para atender às necessidades da distribuidora, foi desenvolvida uma aplicação web que permitisse os clientes realizarem pedidos, os vendedores pudessem preparar e despachar as encomendas e o proprietário tivesse controle do fluxo de pedidos, clientes e vendedores.

## Tecnologias e Ferramentas

### Back-end

- Desenvolvida com Node.js, Express, JavaScript, Sequelize, MySQL
- Aplicando Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores
- Testes de integração criados utilizando Mocha, Chai e Sinon

## 🚀 Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js v18+ (caso queira rodar comandos localmente)

---

### 📁 Estrutura

- `mysql`: container com banco de dados MySQL 8
- `backend`: container com o servidor Node.js rodando `npm run dev`

---

### 📦 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias:

Você pode usar o `.env.example` como base:

```bash
cp .env.example .env
```

---

### 🐳 Subir containers com Docker Compose

```bash
docker compose up -d --build
```

---

### 🌐 Acessar a API

As migrrations e seeds já rodaram no momento do build. O back-end estará disponível em:

```
http://localhost:3001
```

---

### 📜 Scripts úteis

```bash
npm run dev         # Inicia o servidor com nodemon
npm run db:migrate  # Roda apenas as migrations
npm run db:seed     # Roda apenas os seeds
npm run test        # Executa os testes
```

### FrontEnd

- Desenvolvida com React, ContextAPI, React Hooks, Axios e TailWind CSS
- Testes de integração criados utilizando React Testing Library e Jest

## Preview

<center><img src="./gif-tela.gif" width="800" >
