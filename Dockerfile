# Use a imagem oficial do Node.js
FROM node:22.14.0

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para dentro do container
COPY . .

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
