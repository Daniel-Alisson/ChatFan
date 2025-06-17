# Chat em Tempo Real

Este é um projeto de chat em tempo real utilizando **Node.js**, **Express** e **Socket.io**.

## 🔨 Funcionalidades
- Registro de mensagens em um arquivo `chat.log`;
- Validação de nomes de usuário únicos;
- Interface web simples com HTML e CSS.

## 🚀 Como executar o projeto

### 1. Clone o repositório
```
git clone https://github.com/Daniel-Alisson/ChatFan.git
cd ChatFan
```
2. Instale as dependências e certifique-se de ter o Node.js instalado. Depois, execute:
```
npm install
```
3. Inicie o servidor
```
node server.js
```
O servidor será iniciado na porta 3000.

4. Acesse o chat
Abra o navegador e acesse:
```
http://localhost:3000
```

📝 Observações
Os nomes de usuário são únicos enquanto o usuário estiver conectado.
As mensagens enviadas são salvas no arquivo chat.log com data e hora no formato brasileiro.
