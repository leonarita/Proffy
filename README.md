# Projeto "Proffy"

<br>
Projeto cujo objetivo é facilitar a integração entre professores e estudantes.
<br>
<br>
<img src="/.github/photo.png">
<br>

## Projeto desenvolvido no evento Next Level Week 2.0 fornecido pela empresa RocketSeat e extendindo com novas funcionalidades.

Nesse projeto, foi desenvolvida uma aplicação full stack integrando backend (com NodeJS), frontend (com ReactJS) e mobile (com React-Native). 
<br>
<br>
A linguagem de programação utilizada foi o **`Typescript`**.

<br>

### 1. Backend

Para o backend, foram utilizadas ferramentas como `express`, `knex`, `SQLite3`, `cors`, `multer`, `nodemailer`, `jsonwebtoken`, `bcryptjs` e `celebrate`. 
<br>
No backend houve aplicação de testes unitário com `jest`.
<br>
<br>
Foram feitas as seguintes funcionalidades:
  01. Models;
  02. Controllers;
  03. Conexão com banco de dados;
  04. Criação das rotas;
  05. Validação de dados; 
  06. Suporte para upload de imagens;
  07. Envio de email (para resetar senha de usuário);
  08. Criptografia;
  09. Token (JWT);
  10. Validação de dados;
  11. Paginação.

<br>

### 2. Frontend

No desenvolvimento do frontend, foi utilizada a metodologia `mobile-first`.
<br>
Para o frontend, foram utilizadas ferramentas como `axios`, `react-icons` `react-router-dom`, `react-dropzone`. 
<br>
<br>Possui oito telas: 
  1. Tela de login;
  2. Tela inicial;
  3. Tela de cadastro;
  4. Tela de 'forget password';
  5. Tela de listagem de Proffys;
  6. Tela de cadastro de aula;
  7. Tela de perfil;
  8. Telas de sucesso.

<br>

### 3. Mobile

Foi utilizando o React-Native com o `Expo` para a criação da aplicação mobile.
<br>
Para o mobile, foram utilizadas ferramentas como `axios`, `react-native-maps`, `expo-location`, `expo-image-picker`. 
<br>
<br>Além do Splash Screen, possui oito telas: 
  1. Tela de login;
  2. Tela inicial;
  3. Tela de cadastro;
  4. Tela de 'forget password';
  5. Tela de listagem de Proffys;
  6. Tela de cadastro de aula;
  7. Tela de perfil;
  8. Telas de sucesso.
  
<br>

### 4. Roadmap

As seguintes issues estão pendentes no projeto: 

1. Devido à redundância dos códigos, realizar refatoração;
2. Terminar layout web;
3. Terminar layout mobile;
4. Terminar responsividade web.

<br>

### 5. Referências

1. [Layout Versão 1.0](https://www.notion.so/Layout-Proffy-3d5f45f54ec54ef9b2103565b7cce4e1)
2. [Layout Versão 2.0](https://www.notion.so/Layout-dos-desafios-Proffy-b65b509655194c02b3b4c9d4c74b78b4)
3. [Desafios](https://www.notion.so/Vers-o-2-0-Proffy-eefca1b981694cd0a895613bc6235970)

<br>

## Configuração para desenvolvimento

Para instalar, é necessário que tenha o `Node` e o `Git` instalados na sua máquina. Após a configuração, pode-se rodar o seguinte comando no terminal `git bash`:

```
git clone https://github.com/leonarita/Proffy
```

Após isso, você terá o repositório em sua máquina. Agora é necessário instalar o react-native-expo:

```
npm install -g expo-cli
```

Agora basta instalar as dependências do projeto com o seguinte comando nas pasta `server`, `web` e `mobile`:

```
npm install         
    [ou]        
yarn
```

<br>

## Contribuição

1. Faça o fork do projeto (https://github.com/leonarita/Proffy/fork);
2. Crie uma branch para sua modificação (git checkout -b feature/fooBar);
3. Faça o commit (git commit -am 'Add some fooBar');
4. Push (git push origin feature/fooBar);
5. Crie um novo Pull Request.

<br>

## Contato

Leonardo Narita 
- Email: leo_narita@hotmail.com
- Instagram: @leo_narita





