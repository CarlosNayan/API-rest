Instruções para uso da aplicação:

- Necessário criar um aquivo .env como o modelo fornecido

- Ao tentar rodar as migrations do projeto, pode ser que você se depare com um log de erro como o seguinte exemplo:

      Failed to load external module ts-node/register
      Failed to load external module typescript-node/register
      Failed to load external module typescript-register
      Failed to load external module typescript-require
      Failed to load external module sucrase/register/ts
      Failed to load external module @babel/register

  Para corrigir esse problema, foi criado um script em "package.json". rode "npm run knex -- COMANDO A SER USADO"

- Utilizado para formatação automática o eslint e o prettier para facilitar a manutenção e a leitura do código

# Requisitos funcionais

- [x] O Usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que ja ocorreram;
- [x] O usuário deve poder visualizar uma informação única

# Regras de negócio implementadas

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá do valor total;
- [x] Deve ser possível identificar o usuário entre as requisições (implementado o sistema de cookies);
- [x] O usuário só pode visualizar transações o qual ele criou
