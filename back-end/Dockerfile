FROM node:18

WORKDIR /app

# RUN apt-get update && apt-get install -y default-mysql-client

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install 

# Copiar o restante dos arquivos
COPY . .

# Expor a porta
EXPOSE 3001

# Rodar a aplicação
CMD ["npm", "run", "dev"]
