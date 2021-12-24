# AWS-LAMBDA-DYNAMODB

### 💻 Sobre o projeto

AWS-LAMBDA-DYNAMODB é um projeto que foi realizado para cadastro e visualizações dos usuários, registrando acessos feitos na url.

As endpoints do projeto são (Serão desativadas em 10 dias):

    POST - https://tyfqqht5u8.execute-api.us-east-1.amazonaws.com/dev/usuarios

    GET - https://tyfqqht5u8.execute-api.us-east-1.amazonaws.com/dev/usuarios

    GET - https://tyfqqht5u8.execute-api.us-east-1.amazonaws.com/dev/usuarios/{userId}

    GET - https://tyfqqht5u8.execute-api.us-east-1.amazonaws.com/dev/

    GET - https://tyfqqht5u8.execute-api.us-east-1.amazonaws.com/dev/acessos

### Pré-requisitos

Antes de começar, é preciso ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) [Serverless] https://www.serverless.com/ e [INSOMNIA](https://insomnia.rest/download).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Exemplo de consumo da Endpoint /usuarios
```bash
{
	"us_telefone": "",
	"us_data_nascimento": "yyyy-mm-dd",
	"us_nome": "",
	"us_email": "",
	"us_user": ""
}
```
### 🎲 Rodando a aplicação

Para rodar offline, será necessário realizar a configuração que o serverless utiliza:
https://www.serverless.com/plugins/serverless-offline

```bash
# Instale o plugin
$ npm install serverless-offline --save-dev

```
No arquivo serverless.yaml será necessário adicionar o código: 

```bash
    	
plugins:
  - serverless-offline

```

Para execução utilizar o comando:

```bash

    serverless offline or sls offline

```

Para utilizar o dynamoDb offline, será necessário realizar configuração:
https://www.serverless.com/plugins/serverless-dynamodb-local


```bash
# Clone este repositório
$ git clone https://github.com/Ramos03/aws_lambda_dynamodb

# Instale as dependências
$ yarn      #yarn
$ npm i     #npm

# O servidor inciará na porta:3000 - acesse http://localhost:3000 
```