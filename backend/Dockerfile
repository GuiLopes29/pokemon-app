# Use a imagem oficial do Node.js 14 como base
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o app usa
EXPOSE 3000

# Comando para iniciar o app
CMD [ "npm", "start" ]
