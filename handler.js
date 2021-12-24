'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const paramsUsuario = {
	TableName: 'usuarios'
};

const paramsAcesso = {
	TableName: 'acessos'
};
const { v4: uuidv4 } = require("uuid");


module.exports.cadastrarUsuario = async (event) => {
	try {

		let dados = JSON.parse(event.body);

		const timestamp = new Date().getTime();

		const {
			us_nome, us_data_nascimento, us_email, us_telefone, us_user
		} = dados;

		const usuario = {
			us_id: uuidv4(),
			us_nome,
			us_data_nascimento,
			us_email,
			us_telefone,
			us_user,
			us_status: true,
			us_criado_em: timestamp,
			us_atualizado_em: timestamp
		};

		await dynamoDb.put({
			TableName: 'usuarios',
			Item: usuario,
		})
			.promise();

		return {
			statusCode: 201
		}

	} catch (err) {

		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			body: JSON.stringify({
				error: err.name ? err.name : "Exception",
				message: err.message ? err.message : "Unknown error",
			}),
		};

	}
}

module.exports.visualizarUsuarios = async (event) => {
	try {

		let data = await dynamoDb.scan(paramsUsuario).promise();

		return {
			statusCode: 200,
			body: JSON.stringify(data.Items),
		};

	} catch (err) {

		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			body: JSON.stringify({
				error: err.name ? err.name : "Exception",
				message: err.message ? err.message : "Unknown error",
			}),
		};

	}
};

module.exports.visualizarUsuario = async (event) => {
	try {

		const { userId } = event.pathParameters;

		const data = await dynamoDb
			.get({
				...paramsUsuario,
				Key: {
					us_id: userId,
				},
			})
			.promise();

		if (!data.Item) {
			return {
				statusCode: 404,
				body: JSON.stringify({ error: "Usuário não localizado" }, null, 2),
			};
		}

		const paciente = data.Item;

		return {
			statusCode: 200,
			body: JSON.stringify(paciente, null, 2),
		};

	} catch (err) {

		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			body: JSON.stringify({
				error: err.name ? err.name : "Exception",
				message: err.message ? err.message : "Unknown error",
			}),
		};

	}
};


module.exports.visualizarAcessos = async (event) => {
	try {

		let data = await dynamoDb.scan(paramsAcesso).promise();

		return {
			statusCode: 200,
			body: JSON.stringify(data.Items),
		};

	} catch (err) {

		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			body: JSON.stringify({
				error: err.name ? err.name : "Exception",
				message: err.message ? err.message : "Unknown error",
			}),
		};

	}
};

module.exports.registrarAcessos = async (event) => {

	try {
		const dataTimestamp = new Date().toISOString().slice(0, 10);;
		const dataAtualizacaoTimestamp = new Date().getTime();

		await dynamoDb
			.update({
				...paramsAcesso,
				Key: {
					acesso_id: dataTimestamp.toString()
				},
				UpdateExpression:
					'ADD acesso_quantidade :qtdeAcesso SET acesso_atualizado_em = :atualizado_em',
				ExpressionAttributeValues: {
					':qtdeAcesso': 1,
					':atualizado_em': dataAtualizacaoTimestamp
				}
			})
			.promise()

		return {
			statusCode: 204,
		};

	} catch (err) {

		let error = err.name ? err.name : "Exception";
		let message = err.message ? err.message : "Unknown error";
		let statusCode = err.statusCode ? err.statusCode : 500;

		return {
			statusCode,
			body: JSON.stringify({
				error,
				message
			}),
		};
	}
};
