# Gunakan Node versi stabil
FROM node:18

# Tentukan direktori kerja dalam container
WORKDIR /app

# Copy package.json & package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh project backend ke dalam container
COPY . .

# Expose port backend
EXPOSE 5000

# Jalankan server
CMD ["node", "index.js"]
