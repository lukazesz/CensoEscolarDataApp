# CensoEscolarWeb

## Sobre o projeto

O **CensoEscolarWeb** é uma aplicação web desenvolvida com React e Vite, com o objetivo de apresentar e facilitar a visualização de dados do Censo Escolar 2025 referentes às instituições de ensino do estado da Paraíba.

O projeto utiliza dados extraídos e organizados em formato JSON para apresentar informações educacionais de maneira clara, intuitiva e acessível, permitindo consultar instituições, visualizar indicadores e identificar aquelas com maior número de matrículas na educação básica.

## Funcionalidades

- **Página inicial:** apresentação do projeto, carrossel de imagens e indicadores gerais da educação na Paraíba.
- **Estatísticas educacionais:** exibição de informações como quantidade de instituições, matrículas na educação básica, municípios atendidos e matrículas no ensino fundamental.
- **Ranking de instituições:** classificação das instituições de ensino de acordo com o número de matrículas, em ordem decrescente.
- **Pesquisa de instituições:** busca por instituições utilizando seus nomes.
- **Filtro por município:** possibilidade de filtrar as instituições de acordo com o município.
- **Paginação:** navegação entre os resultados encontrados, permitindo consultar todas as instituições cadastradas.

## Tecnologias utilizadas

- [React](https://react.dev/) — biblioteca utilizada para construção da interface.
- [Vite](https://vite.dev/) — ferramenta de desenvolvimento e construção da aplicação.
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — linguagem utilizada na implementação das funcionalidades.
- [Bootstrap](https://getbootstrap.com/) — framework utilizado para estilização e responsividade.
- **JSON** — formato utilizado para armazenamento e disponibilização dos dados educacionais.

## Organização dos dados

Os dados utilizados na aplicação são referentes ao Censo Escolar 2025, com informações das instituições de ensino localizadas no estado da Paraíba.

Entre os principais campos utilizados estão:

- Nome e código da instituição;
- Município e código do município;
- Unidade federativa;
- Número total de matrículas na educação básica;
- Quantidade de matrículas por etapa e modalidade de ensino.

## Como executar o projeto

### Pré-requisitos

- Node.js instalado;
- npm instalado.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/lukazesz/CensoEscolarDataApp.git
```

Entre na pasta do projeto:

```bash
cd CensoEscolarWeb
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

Acesse o endereço disponibilizado pelo Vite no terminal, geralmente:

```text
http://localhost:5173
```

## Objetivo acadêmico

Este projeto foi desenvolvido como atividade acadêmica da disciplina de Programação Web, com o propósito de aplicar conhecimentos de desenvolvimento de interfaces utilizando React, manipulação de dados JSON, componentes, estados, filtros, ordenação e paginação.

---

**CensoEscolarWeb — Visualização dos dados do Censo Escolar 2025 da Paraíba.**
