const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const usuariosConectados = new Set();

app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('Novo usuário conectado');

	socket.on('validar nome', (nome) => {
		if (!nome || typeof nome !== 'string' || nome.trim() === '') {
			socket.emit('nome invalido', 'Nome de usuário não pode ser vazio');
			return;
		}
		if (usuariosConectados.has(nome)) {
			socket.emit('nome invalido', 'Nome já está em uso');
			return;
		}

		socket.username = nome;
		usuariosConectados.add(nome);
		socket.emit('nome valido', nome);
		console.log(`Usuário "${nome}" foi validado e conectado`);
	});

	socket.on('chat message', (data) => {
		if (!socket.username || !usuariosConectados.has(socket.username)) {
			return;
		}

		io.emit('chat message', {
			username: data.username,
			message: data.message
		});

		registrarMensagem(data.username, data.message);
	});

	socket.on('disconnect', () => {
		if (socket.username && usuariosConectados.has(socket.username)) {
			usuariosConectados.delete(socket.username);
			console.log(`Usuário "${socket.username}" desconectado`);
		}
	});
});

function registrarMensagem(username, message) {
	const dataHoraAtual = new Date();
	const data = dataHoraAtual.toLocaleDateString('pt-BR');
	const hora = dataHoraAtual.toLocaleTimeString('pt-BR', { hour12: false });
	const dataHora = `${data.split('/').reverse().join('-')} ${hora}`;
	const chatLog = `[${dataHora}] ${username}: ${message}\n`;

	const logPath = path.join(__dirname, 'chat.log');

	fs.appendFile(logPath, chatLog, (err) => {
		if (err) {
			console.error('Erro ao gravar no log:', err);
		}
	});
}

server.listen(3000, () => {
	console.log('Servidor rodando na porta 3000');
});