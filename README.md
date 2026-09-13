# MedClinic API

## Repositório

GitHub: https://github.com/mauriciofree/medclinic-api

## Vídeo de Apresentação do Projeto

Youtube: inserir link do vídeo

---

## Sobre o Projeto

A MedClinic API será uma aplicação back-end desenvolvida em Node.js com TypeScript para gerenciamento da base de acesso de uma clínica médica.

Nesta primeira etapa, o projeto terá como foco a autenticação e autorização dos usuários do sistema, incluindo cadastro, login, criptografia de senha, emissão de token JWT e controle de acesso por perfil.

As funcionalidades de gerenciamento de especialidades, médicos, pacientes, consultas e relatórios não fazem parte desta entrega. Elas serão implementadas em uma etapa futura, utilizando esta base como ponto de partida.

---

## Objetivo

Este projeto tem como objetivo praticar os conceitos estudados no Módulo 02 do curso, incluindo:

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- Programação Orientada a Objetos
- Interfaces, classes, decorators e tipagem estática
- DTOs
- Programação assíncrona
- Promises
- Async/Await
- Arquitetura MVC em camadas
- Middlewares
- Tratamento centralizado de erros
- Autenticação com JWT
- Autorização baseada em perfis (RBAC)
- Criptografia de senhas
- Clean Code e SOLID
- Git, GitHub e GitFlow

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- JWT
- Bcrypt
- Dotenv
- CORS
- Class Validator
- Class Transformer
- TSX
- Git
- GitHub

---

## Pré-requisitos

Antes de executar o projeto será necessário possuir instalado:

- Node.js
- npm
- Git
- PostgreSQL
- Cliente HTTP, como Postman, Insomnia ou Thunder Client

---

## Como Instalar

Clone o repositório:

```bash
git clone https://github.com/mauriciofree/medclinic-api.git
```

Acesse a pasta do projeto:

```bash
cd medclinic-api
```

Instale as dependências:

```bash
npm install
```

---

## Configuração do Ambiente

Crie o banco de dados no PostgreSQL:

```bash
psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE sctec_mauricio_medclinic_api;"
```

Crie um arquivo `.env` na raiz do projeto com as configurações da aplicação, do banco de dados e do JWT:

```env
PORT=3333

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sctec_mauricio_medclinic_api
DB_SSL=false

JWT_SECRET=troque_por_uma_chave_secreta_forte
JWT_EXPIRES_IN=1d
```

Caso utilize outra porta, usuário, senha ou nome de banco, ajuste os comandos e o arquivo `.env` com os mesmos dados do seu ambiente local.

Para gerar uma chave mais segura para o `JWT_SECRET`, utilize:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Depois de configurar o `.env`, execute o script SQL disponibilizado no projeto para criar a estrutura do banco de dados:

```bash
psql -h localhost -p 5432 -U postgres -d sctec_mauricio_medclinic_api -f src/database/schema.sql
```

---

## Como Executar

Executar em modo de desenvolvimento:

```bash
npm run dev
```

Compilar o projeto:

```bash
npm run build
```

Executar a versão compilada:

```bash
npm start
```

---

## Escopo Desta Etapa

### Funcionalidades implementadas nesta entrega

- Configuração do projeto Node.js com TypeScript e Express.js
- Configuração de conexão com PostgreSQL utilizando TypeORM
- Criação da entidade de usuário
- Cadastro de usuários
- Criptografia de senha com hash
- Login de usuários
- Emissão de token JWT
- Middleware de autenticação
- Middleware de autorização por perfil (RBAC)
- Endpoint para consultar o usuário autenticado
- Endpoint administrativo para demonstrar o controle de acesso
- Tratamento de erros e validações
- Organização do projeto em camadas

### Funcionalidades fora do escopo desta entrega

- Especialidades
- Médicos
- Pacientes
- Consultas
- Relatórios

Essas funcionalidades serão desenvolvidas em uma próxima etapa do projeto.

---

## Perfis de Acesso

O sistema utilizará autorização baseada em perfis de usuário.

### ADMIN

Perfil administrador, com acesso completo às funcionalidades protegidas da API.

### ATTENDANT

Perfil atendente, com acesso operacional e permissões restritas.

---

## Endpoints

### Cadastro de usuário

```http
POST /auth/register
```

Exemplo de requisição:

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456",
  "role": "ADMIN"
}
```

Exemplo de resposta:

```json
{
  "id": "uuid-do-usuario",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "role": "ADMIN",
  "createdAt": "2026-09-13T12:00:00.000Z"
}
```

### Login

```http
POST /auth/login
```

Exemplo de requisição:

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

Exemplo de resposta:

```json
{
  "token": "token_jwt",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Maria Silva",
    "email": "maria@email.com",
    "role": "ADMIN"
  }
}
```

### Consultar usuário autenticado

```http
GET /users/me
```

Header:

```http
Authorization: Bearer token_jwt
```

Exemplo de resposta:

```json
{
  "id": "uuid-do-usuario",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "role": "ADMIN",
  "createdAt": "2026-09-13T12:00:00.000Z"
}
```

### Verificar acesso administrativo

```http
GET /admin/ping
```

Header:

```http
Authorization: Bearer token_jwt
```

Exemplo de resposta:

```json
{
  "message": "Acesso administrativo autorizado."
}
```

---

## Possíveis Respostas de Erro

```json
{
  "message": "Erro de validação.",
  "errors": [
    {
      "field": "email",
      "messages": [
        "email must be an email"
      ]
    }
  ]
}
```

```json
{
  "message": "E-mail já cadastrado."
}
```

```json
{
  "message": "Credenciais inválidas."
}
```

```json
{
  "message": "Token não informado."
}
```

```json
{
  "message": "Token inválido ou expirado."
}
```

```json
{
  "message": "Usuário sem permissão para acessar este recurso."
}
```

```json
{
  "message": "Rota não encontrada."
}
```

---

## Estrutura do Projeto

```text
src/
|-- server.ts
|-- routes/
|   |-- admin.routes.ts
|   |-- auth.routes.ts
|   |-- index.ts
|   `-- user.routes.ts
|-- controllers/
|   |-- AuthController.ts
|   `-- UserController.ts
|-- services/
|   |-- AuthService.ts
|   `-- UserService.ts
|-- repositories/
|   `-- UserRepository.ts
|-- entities/
|   `-- User.ts
|-- middlewares/
|   |-- asyncHandler.ts
|   |-- authMiddleware.ts
|   |-- errorMiddleware.ts
|   |-- notFoundMiddleware.ts
|   |-- roleMiddleware.ts
|   `-- validateDto.ts
|-- database/
|   |-- data-source.ts
|   `-- schema.sql
|-- dtos/
|   |-- CreateUserDTO.ts
|   |-- LoginDTO.ts
|   |-- LoginResponseDTO.ts
|   `-- UserResponseDTO.ts
|-- errors/
|   `-- AppError.ts
`-- utils/
    |-- jwt.ts
    `-- passwordHash.ts
```

Arquivos principais na raiz:

```text
package.json
tsconfig.json
.env.example
.gitignore
README.md
```

---

## Explicação das Pastas

### server.ts

Ponto de entrada da aplicação. Será responsável por iniciar o servidor Express, configurar middlewares globais, registrar rotas e estabelecer a conexão com o banco de dados.

### routes/

Responsável por definir os endpoints da API e associá-los aos controllers, aplicando middlewares de autenticação e autorização quando necessário.

### controllers/

Responsável por receber as requisições HTTP, tratar entradas como body, params e query, acionar os services e retornar as respostas em JSON.

### services/

Responsável pelas regras de negócio, validações, autenticação, autorização e coordenação das operações antes do acesso ao banco de dados.

### repositories/

Responsável pela comunicação com o PostgreSQL por meio do TypeORM.

### entities/

Contém as entidades da aplicação modeladas com classes e decorators do TypeORM.

### middlewares/

Contém middlewares de autenticação, autorização, validação e tratamento centralizado de erros.

### database/

Contém a configuração da conexão com PostgreSQL e o script SQL de criação da estrutura do banco de dados.

### dtos/

Contém os objetos de transferência de dados utilizados para padronizar entradas e saídas da API.

### errors/

Contém classes de erro utilizadas pela aplicação para padronizar o tratamento de exceções.

### utils/

Contém funções auxiliares reutilizáveis, como geração e validação de JWT e criptografia de senhas.

---

## Arquitetura da Aplicação

A aplicação seguirá uma arquitetura MVC organizada em camadas, separando responsabilidades entre rotas, middlewares, controllers, services, repositories, entities, database e utils.

Fluxo principal de uma requisição:

```text
Cliente HTTP
  -> Routes e Middlewares
  -> Controllers
  -> Services
  -> Repositories
  -> TypeORM
  -> PostgreSQL
```

Essa organização facilita a manutenção, reduz o acoplamento entre as partes da aplicação e prepara o projeto para receber os módulos de domínio da clínica em etapas futuras.

---

## Conceitos que Serão Aplicados

### TypeScript

O projeto será desenvolvido utilizando TypeScript com tipagem estática em variáveis, parâmetros, retornos, entidades, DTOs, interfaces e classes.

### TypeORM

O TypeORM será utilizado para mapear entidades, configurar a conexão com o PostgreSQL e realizar operações de persistência por meio de repositories.

### Autenticação

A autenticação será feita por login com e-mail e senha. Em caso de credenciais válidas, a API retornará um token JWT com tempo de expiração definido.

### Autorização

A autorização será baseada em perfis de usuário. O middleware de RBAC verificará se o usuário autenticado possui permissão para acessar determinados endpoints.

### Criptografia de Senha

As senhas serão armazenadas somente em formato de hash, nunca em texto puro.

### Tratamento de Erros

As situações inválidas serão tratadas com respostas HTTP adequadas, como 400, 401, 403 e 409, utilizando um middleware central de erro.

---

## Fluxo de Versionamento

O projeto será desenvolvido utilizando GitFlow simplificado.

### Branches Planejadas

- main
- develop
- feat/setup-projeto
- feat/auth
- feat/rbac
- docs/readme

### Exemplos de Commits Semânticos

```text
feat: cria estrutura inicial do projeto
feat: configura conexão com postgresql via typeorm
feat: cria entidade de usuario
feat: implementa cadastro de usuarios
feat: implementa criptografia de senha
feat: implementa login com jwt
feat: implementa middleware de autenticacao
feat: implementa middleware de autorizacao rbac
feat: cria endpoints de verificacao
refactor: reorganiza camada de services
fix: corrige tratamento de token expirado
docs: atualiza readme
```

---

## Roteiro Sugerido para o Vídeo

O vídeo de apresentação deverá ter entre 5 e 10 minutos e demonstrar:

- Nome do projeto e escopo desta etapa
- Estrutura de pastas e arquitetura MVC em camadas
- Entidade de usuário e conexão com PostgreSQL via TypeORM
- Execução da aplicação pelo terminal
- Cadastro de um novo usuário
- Login e emissão do token JWT
- Acesso à rota protegida `GET /users/me`
- Acesso permitido de um administrador ao endpoint `GET /admin/ping`
- Acesso negado de um atendente ao endpoint `GET /admin/ping`
- Principais desafios, aprendizados e próximos passos

---

## Melhorias Futuras

- Implementar gerenciamento de especialidades
- Implementar gerenciamento de médicos
- Implementar gerenciamento de pacientes
- Implementar agendamento e gerenciamento de consultas
- Criar relatórios administrativos
- Adicionar testes automatizados
- Adicionar documentação com Swagger

---

## Checklist Final de Entrega

- [x] Criar repositório público no GitHub
- [x] Criar branch `develop`
- [x] Criar branch `feat/setup-projeto`
- [x] Configurar projeto Node.js com TypeScript
- [x] Criar `package.json`
- [x] Criar `tsconfig.json`
- [x] Criar `src/server.ts`
- [x] Configurar scripts de execução
- [x] Configurar Express
- [x] Configurar TypeORM com PostgreSQL
- [x] Criar arquivo `.env.example`
- [x] Criar script SQL do banco de dados
- [x] Criar entidade de usuário
- [x] Criar DTOs
- [x] Implementar arquitetura em camadas
- [x] Implementar cadastro de usuários
- [x] Implementar criptografia de senha
- [x] Implementar login
- [x] Implementar geração de JWT
- [x] Implementar middleware de autenticação
- [x] Implementar middleware de autorização RBAC
- [x] Criar endpoint `GET /users/me`
- [x] Criar endpoint `GET /admin/ping`
- [x] Implementar validações de entrada
- [x] Implementar tratamento centralizado de erros
- [ ] Atualizar README.md com exemplos reais
- [x] Fazer commits semânticos
- [x] Usar branches mínimas exigidas
- [ ] Gravar vídeo de apresentação
- [ ] Enviar link do GitHub no AVA
- [ ] Enviar link do vídeo no AVA
