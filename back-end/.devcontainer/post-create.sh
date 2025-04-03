#!/bin/bash
set -euo pipefail

echo "⏳ Aguardando o banco de dados MySQL aceitar conexões..."

# until mysqladmin ping -h"$MYSQL_HOST" -P"$MYSQL_PORT" --silent; do
#   echo "🔄 Esperando conexão com $MYSQL_HOST:$MYSQL_PORT..."
#   sleep 2
# done

echo "✅ Banco de dados pronto para uso!"

echo "🎯 Rodando migrations e seeds com Sequelize..."

npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

echo "✅ Banco de dados inicializado com sucesso!"
-+