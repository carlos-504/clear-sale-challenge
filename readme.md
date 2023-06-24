# CLEAR-SALE-CHALLENGE

## Pré-requisitos para o setup:

Baixe na sua máquina as seguintes dependências:

-  NodeJS
-  Typescript

## Ambiente

-  O BackEnd será executado na porta 3000

## Aplicação

A aplicação é executada a partir de comandos yarn do NodeTS. O projeto usa 5 comandos yarn

-  Executa a aplicação e iniciar o servidor.

```
yarn start
```

-  Para criar os arquivos JavaScript baseado nos arquivos Typescript

```
yarn build
```

-  Inicia aplicação em modo de desenvolvimento apontando para aplicação em Typescript

```
yarn dev
```

-  Executa os testes unitários da aplicação

```
yarn test
```

-  Executa job que conta as vogais de uma palavra

```
yarn job
```

## Estrutura de diretórios

    	CLEAR-SALE-CHALLENGE
    		|
                    |-- src (Código fonte)
            	|       |
                    |       |-- config (Arquivos de configuração)
                    |       |-- controllers (Camada de regras de negócio da aplicação)
                    |       |-- errors (Erros personalizados)
                    |       |-- interfaces (interfaces dos modelos)
                    |       |-- jobs (Serviços individuais)
                    |       |-- routes (Endpoints da aplicação)
                    |       |-- utils (Recursos reaproveitados da aplicação)
                    |       |-- app.ts (Configuração do servidor)
    		|-- test (Testes unitários)
    		|-- .env (Variáveis de ambiente)
    		|-- .env.example (Exemplo das variáveis de ambiente)
    		|-- jest.config.ts (Configuração dos teste unitários)
    		|-- package.json
    		|-- server.ts (Arquivo de inicialização)
    		|-- swagger.json (JSON fonte da documentação)
    		|-- tsconfig.json (Configurações de compilação do TypeScript)

## Instalação

1. Baixe o diretório para sua máquina

```
git clone https://github.com/carlos-504/clear-sale-challenge.git
```

2. Para baixar as dependências do projeto

```
yarn
```

3. Crie o arquivo de variáveis (.env) e copie o conteúdo dos arquivos .env.example para o mesmo

4. Para iniciar a aplicação

```
yarn start
```

## REST API

O sistema conta com uma API para realizar os CRUDS. A API segue o protocolo Rest de comunicação,
onde é possível realizar uma comunicação com o servidor para obter, incluir ou remover.

**Obs.:** Ao utilizar a API, envie sempre os cabeçalhos obrigatórios:

    "Accept: application/json
    "Content-Type: application/json"

### API Endpoints

| Ação                                           | Método de requisição | Endpoint       | Request Body                                                       | Retorno               |
| ---------------------------------------------- | -------------------- | -------------- | ------------------------------------------------------------------ | --------------------- |
| Insere um novo local na lista de Rick e Morty  | POST                 | /location      | name: string, type: string, dimension: string, residents: [string] | novo local inserido   |
| Lista de todos os locais de Rick e Morty       | GET                  | /location      |                                                                    | locais Rick e Morty   |
| Lista um local pelo id                         | GET                  | /location/{id} |                                                                    | local buscado pelo id |
| Atualiza um dos locais de Rick e Morty pelo id | PUT                  | /location/{id} | name: string, type: string, dimension: string, residents: [string] | local atualizado      |
| Exclui um local de Rick e Morty pelo id        | DELETE               | /location/{id} |                                                                    | null                  |

### Link da documentação Swagger

http://localhost:3000/api-docs/
