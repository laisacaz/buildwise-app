# Buildwise

### 🔨 Stack

![](https://img.shields.io/badge/Vue.js-gray?logo=Vue.js)
[![](https://img.shields.io/badge/nuxt.js-009f72?logo=nuxtdotjs&logoColor=white)](https://nuxtjs.org/)
[![](https://img.shields.io/badge/Vuetify-1867C0?logo=Vuetify)](https://vuetifyjs.com/en/)

`English`
## Description
- Buildwise is a management system aimed at construction companies. Using this web application, it is possible to register clients/sellers, control inventory, construction projects, and sales of construction companies.
- Note: This was my first project, used as a "capstone project" in college.

## 🧗‍♂️ Project Structure and Dependencies

## **Folders and Files**

- **assets**: folder for files like styles or images.
- **components**: folder of components created to be reused.
- **layouts**: folder that contains application's layouts.
- **pages**: folder for pages and routes automatically generated by Nuxt based on the folder and file structure `*.vue`.
- **plugins**: folder with locally created plugins.
- **services**: folder for dynamic use for API calls .
- **utils**: folder used for files of any functional use.
  - **enumerators**: contains all the enumerators used in the application.
  - **interfaces**: interface files used for TypeScript.
  - **validations**: files with functions to validate some type of value.
- **.editorconfig**: configuration file to maintain code standards regardless of the text editor used by  `editorconfig`.
- **.gitignore**: file that specifies files to be ignored by `git`.
- **nuxt.config.js**: main configuration file for the application in `nuxt`.
- **package.json**:
- **README.md**: application documentation file.
- **tsconfig.json**: configuration file for using `typescript`.
- **yarn.lock**: file of packages and the versions that are installed

## **Functionality**

## **Dependencies**

This project depends on another internal project.

For this project to function correctly, the ***buildwise-api*** must be running `locally` or on a `server`

- [***buildwise-api***]([https://github.com/laisacaz/buildwise-api]) : for the integral functioning of all processes.

The connection of these projects is made by `proxy` in the `nuxt.config.js` file. For development use, simply configure a `.env` file as explained below:

> Values used in .env

- `BUILDWISE_API_ROUTE` : the URL of ***buildwise-api*** inserted in the `.env` so that each usage location can have a possibly different address.

#
## 🏠 Environments
  Run `yarn install` to install all packages before compiling the application.
#### ⚡ **Development**
  Run `yarn dev` to start in development mode ready for use with auto-refresh.
#### ⚡ **Production**
  Run 
  - `yarn build` to compile for deployment in mode `SSR`
  - `yarn start` to serve the compiled version

  #
## 🧾 Development Standards / Nomenclature

The main programming language is ***English***
⚠️ Portuguese is used only in messages shown to the user; the names of functions, files, variables, etc., are in English.

- **Variables** `let`, **Constants** `const` and **Function** names always in `camelCase`

- **Components**, component files are named in `camelCase` & `Capitalized`, the use of components can follow the component file name or `kebab-case` all lowercase..

- **Pages** are named and used in `kebab-case` for better URL readability.

- **Plugins**, **Utils**, all associated files are named and used in `camelCase`.

`Portuguese`

## Descrição
- O Buildwise é um sistema de gestão voltado para construtoras. Utlizando esta aplicação web, é possível cadastrar clientes/vendedores, controlar o estoque, obras, e vendas de construtoras.
- Obs: Esse foi meu primeiro projeto, foi utilizado como "TCC" na faculdade.

## 🧗‍♂️ Estrutura do projeto e dependências

## **Pastas e arquivos**

- **assets**: pasta de arquivos como styles ou imagens.
- **components**: pasta de componentes criados para serem reutilizados.
- **layouts**: pasta que contem os layouts da aplicacao.
- **pages**: pasta para as páginas e rotas geradas automaticamente pelo nuxt baseado na estrutura de pastas e arquivos `*.vue`.
- **plugins**: pasta com plugins criados localmente.
- **services**: pasta de uso dinamico das chamadas de API.
- **utils**: pasta utilizada para arquivos de qualquer uso funcional.
  - **enumerators**: contém todos os enumerados utilizados na aplicação.
  - **interfaces**: arquivos de interfaces usadas para o typescript.
  - **validations**: arquivos com funções para validar algum tipo de valor.
- **\_redirects**: arquivo de redirect para o Netlify
- **.editorconfig**: arquivo de configuração para manter padrões de código independente do editor de texto usado por `editorconfig`.
- **.gitignore**: arquivo que informa arquivos a serem ignorados pelo `git`.
- **nuxt.config.js**: arquivo principal das configurações da aplicação em `nuxt`.
- **package.json**:
- **README.md**: arquivo de documentação da aplicação.
- **tsconfig.json**: arquivo de configuração para o uso do `typescript`.
- **yarn.lock**: arquivo de packages e as versões que estão instaladas

## **Funcionamento**

## **Dependências**

Esse projeto depende de um outro projeto interno.

Para que esse projeto funcione corretamente é requerido que a ***buildwise-api*** esteja rodando `localmente` ou em um `servidor`

- [***buildwise-api***]([https://github.com/laisacaz/buildwise-api]) : para funcionamento integro de todos os processos.

A conexão desses projetos é feita por `proxy` no arquivo `nuxt.config.js`, para o uso em desenvolvimento, simplesmente configure um arquivo `.env` como explicado a seguir:

> Valores usados no .env

- `BUILDWISE_API_ROUTE` : a URL de ***buildwise-api*** inserida no `.env` para que cada local de uso possa ter um endereço possivelmente diferente.

#
## 🏠 Ambientes
  Execute `yarn install` para instalar todos os pacotes antes de compilar a aplicação.
#### ⚡ **Desenvolvimento**
  Execute `yarn dev` para iniciar em modo de desenvolvimento pronto para uso e com auto refresh.
#### ⚡ **Produção**
  Execute 
  - `yarn build` para compilar para deploy em modo `SSR`
  - `yarn start` para servir a versão compilada

  #
## 🧾 Padrões de desenvolvimento / Nomenclatura

A linguagem principal de programação é o ***Inglês***
⚠️ O português é usado somente em mensagens mostradas ao usuário, o nome das funções, arquivos, variáveis e etc são em inglês.

- **Variáveis** `let`, **Constantes** `const` e nome de **Funções** sempre em `camelCase`

- **Componentes**, os arquivos dos componentes são nomeados em `camelCase` & `Capitalizado`, o uso dos componentes podem seguir o nome do arquivo do componente ou `kebab-case` todo minusculo.

- **Pages** são nomeadas e usadas em `kebab-case` para melhor leitura de URL.

- **Plugins**, **Utils**, todos os arquivos associados são nomeados e usados em `camelCase`.
