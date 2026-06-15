# Programação de Funcionalidades — E-Finanças

## 1. Visão Geral

O **E-Finanças** é uma aplicação web para organização de finanças pessoais. A solução permite que cada usuário crie uma conta, registre receitas e despesas, consulte o saldo, acompanhe relatórios financeiros, organize metas e atualize seus dados pessoais.

A aplicação foi desenvolvida com **HTML5**, **CSS3** e **JavaScript**, sem módulo de backend. Os dados são persistidos no `localStorage` do navegador em formato JSON e separados por usuário. Os gráficos do Dashboard e da página de Relatórios são renderizados com a biblioteca **Chart.js**.

Este documento relaciona os requisitos atendidos aos artefatos implementados, descreve as estruturas de dados utilizadas e apresenta as instruções para execução e verificação da solução.

## 2. Tecnologias e Organização da Implementação

| Tecnologia ou recurso | Utilização no projeto |
|---|---|
| HTML5 | Estrutura das páginas, formulários, navegação e componentes semânticos. |
| CSS3 | Identidade visual, componentes reutilizáveis e regras responsivas. |
| JavaScript ES Modules | Regras de negócio, autenticação, persistência e atualização da interface. |
| Web Storage API (`localStorage`) | Armazenamento local de contas, sessão, perfil, transações, categorias e metas. |
| Web Crypto API | Geração de identificadores, criação de salt e hash SHA-256 das senhas. |
| Chart.js | Geração dos gráficos financeiros do Dashboard e dos Relatórios. |
| Node.js Test Runner | Execução dos testes automatizados por meio do comando `npm test`. |

A implementação está organizada nos seguintes grupos:

| Diretório ou arquivo | Responsabilidade |
|---|---|
| [`src/*.html`](../src/) | Páginas da aplicação. |
| [`src/styles.css`](../src/styles.css) | Estilos globais, componentes e regras responsivas. |
| [`src/js/auth/`](../src/js/auth/) | Cadastro, login, sessão, proteção de rotas e persistência das contas. |
| [`src/js/core/`](../src/js/core/) | Funções compartilhadas de armazenamento, moeda, perfil e migração de dados. |
| [`src/js/pages/`](../src/js/pages/) | Comportamento específico de cada página. |
| [`test/`](../test/) | Testes automatizados da aplicação. |

## 3. Requisitos Atendidos

Como o repositório não registra a divisão individual de responsabilidade por requisito, a responsabilidade é apresentada como coletiva da **Equipe E-Finanças**.

### 3.1 Requisitos Funcionais

| ID | Descrição do requisito | Responsável | Principais artefatos criados |
|---|---|---|---|
| RF-01 | Permitir o cadastro de usuário. | Equipe E-Finanças | [`cadastro.html`](../src/cadastro.html), [`cadastro.js`](../src/js/pages/cadastro.js), [`auth-service.js`](../src/js/auth/auth-service.js), [`account-repository.js`](../src/js/auth/account-repository.js) |
| RF-02 | Permitir que o usuário acesse e encerre sua sessão. | Equipe E-Finanças | [`index.html`](../src/index.html), [`index.js`](../src/js/pages/index.js), [`session.js`](../src/js/auth/session.js), [`route-guard.js`](../src/js/auth/route-guard.js) |
| RF-03 | Permitir o registro de receitas. | Equipe E-Finanças | [`nova-transacao.html`](../src/nova-transacao.html), [`nova-transacao.js`](../src/js/pages/nova-transacao.js) |
| RF-04 | Permitir o registro de despesas. | Equipe E-Finanças | [`nova-transacao.html`](../src/nova-transacao.html), [`nova-transacao.js`](../src/js/pages/nova-transacao.js) |
| RF-05 | Exibir saldo e resumo financeiro. | Equipe E-Finanças | [`dashboard.html`](../src/dashboard.html), [`dashboard.js`](../src/js/pages/dashboard.js), [`transacoes.js`](../src/js/pages/transacoes.js) |
| RF-06 | Listar as transações do usuário. | Equipe E-Finanças | [`transacoes.html`](../src/transacoes.html), [`transacoes.js`](../src/js/pages/transacoes.js) |
| RF-07 | Permitir a exclusão de transações. | Equipe E-Finanças | [`transacoes.js`](../src/js/pages/transacoes.js) |
| RF-08 | Permitir a categorização das transações. | Equipe E-Finanças | [`nova-transacao.html`](../src/nova-transacao.html), [`nova-transacao.js`](../src/js/pages/nova-transacao.js) |
| RF-09 | Apresentar relatórios financeiros. | Equipe E-Finanças | [`relatorios.html`](../src/relatorios.html), [`relatorios.js`](../src/js/pages/relatorios.js), [`currency.js`](../src/js/core/currency.js) |
| RF-10 | Permitir pesquisar e filtrar transações. | Equipe E-Finanças | [`transacoes.html`](../src/transacoes.html), [`transacoes.js`](../src/js/pages/transacoes.js) |
| RF-11 | Permitir criar, acompanhar, atualizar e excluir metas financeiras. | Equipe E-Finanças | [`metas.html`](../src/metas.html), [`metas.js`](../src/js/pages/metas.js), [`dashboard.js`](../src/js/pages/dashboard.js) |
| RF-12 | Permitir a atualização dos dados do usuário. | Equipe E-Finanças | [`perfil.html`](../src/perfil.html), [`perfil.js`](../src/js/pages/perfil.js), [`profile-ui.js`](../src/js/core/profile-ui.js) |

### 3.2 Requisitos Não Funcionais

| ID | Descrição do requisito | Evidência de atendimento |
|---|---|---|
| RNF-01 | A aplicação deve ser responsiva. | O arquivo [`styles.css`](../src/styles.css) possui regras responsivas para larguras de até 1100 px, 860 px e 640 px. As telas foram verificadas em 390 px, 768 px e 1366 px. |
| RNF-02 | A interface deve ser simples e de fácil utilização. | A aplicação utiliza navegação consistente, formulários com rótulos, mensagens de retorno, cards de resumo e diferenciação visual entre receitas e despesas. |
| RNF-03 | A aplicação deve apresentar informações com clareza. | Valores financeiros são formatados em real brasileiro, os tipos de transação possuem cores distintas e os relatórios apresentam gráficos, percentuais e insights. |
| RNF-04 | Os dados financeiros de usuários diferentes devem permanecer separados. | As chaves financeiras seguem o padrão `efinancas:user:{userId}:{chave}`, impedindo que uma conta visualize os dados armazenados por outra. |

## 4. Funcionalidades Implementadas

### 4.1 Cadastro, Login e Sessão

O usuário pode criar uma conta informando nome, e-mail e senha. O cadastro valida o preenchimento dos dados, exige senha com pelo menos oito caracteres, verifica a confirmação da senha e impede e-mails duplicados.

Antes de ser armazenada, a senha recebe um salt aleatório e é transformada em hash SHA-256 por meio da Web Crypto API. Após o cadastro ou login, o sistema cria uma sessão local e direciona o usuário ao Dashboard. As páginas internas utilizam proteção de rota e redirecionam visitantes sem sessão para a página de login.

### 4.2 Dashboard Financeiro

O Dashboard consolida os dados cadastrados pelo usuário e apresenta:

- saldo atual;
- total de receitas;
- total de despesas;
- gráfico comparativo entre receitas, despesas e saldo;
- quantidade e progresso médio das metas;
- metas prioritárias;
- cinco movimentações mais recentes;
- sugestões de próximas ações.

Os valores e listas são recalculados a partir dos dados armazenados sempre que a página é carregada.

### 4.3 Cadastro e Categorização de Transações

Na página **Nova transação**, o usuário pode registrar uma receita ou despesa informando valor, categoria, descrição e data. A interface apresenta uma prévia da movimentação antes do cadastro.

O sistema disponibiliza categorias iniciais e também permite criar categorias personalizadas. Categorias personalizadas podem ser removidas pelo usuário, enquanto as categorias iniciais são preservadas.

### 4.4 Histórico, Busca, Filtros e Exclusão

A página **Transações** apresenta o histórico financeiro ordenado por data. A tela calcula o total de receitas, despesas, saldo e quantidade de movimentações.

O usuário pode pesquisar pelo nome da categoria ou pela descrição e filtrar o histórico entre todas as movimentações, receitas e despesas. Também é possível excluir uma transação após confirmação, fazendo com que os totais sejam recalculados.

### 4.5 Relatórios Financeiros

A página **Relatórios** processa as transações cadastradas e apresenta:

- total de receitas;
- total de despesas;
- saldo projetado;
- taxa de economia;
- gráfico de receitas e despesas;
- gráfico de despesas por categoria;
- participação percentual de cada categoria;
- insights sobre saldo, economia e categoria de maior gasto.

### 4.6 Metas Financeiras

O usuário pode criar metas informando nome, valor objetivo, valor já guardado e prazo. Cada meta apresenta o percentual concluído, uma barra de progresso e os valores planejado e acumulado.

Também é possível adicionar novas contribuições ou excluir uma meta. O Dashboard utiliza os dados das metas para exibir o progresso médio, destacar prioridades e sugerir próximas ações.

### 4.7 Perfil do Usuário

A página **Perfil** permite alterar nome, e-mail e telefone. As alterações são persistidas e refletidas na identificação apresentada nas páginas internas. A aplicação impede que o e-mail seja alterado para outro endereço já cadastrado.

## 5. Estruturas de Dados

Os dados são serializados em JSON e armazenados no `localStorage`. As contas e a sessão utilizam chaves globais da aplicação. Perfil, transações, categorias e metas utilizam chaves associadas ao identificador do usuário autenticado.

### 5.1 Chaves de Armazenamento

| Chave | Conteúdo |
|---|---|
| `efinancas:users` | Lista de usuários cadastrados. |
| `efinancas:session` | Identificador do usuário que possui a sessão ativa. |
| `efinancas:user:{userId}:perfilUsuario` | Dados pessoais do usuário. |
| `efinancas:user:{userId}:transacoes` | Lista de receitas e despesas do usuário. |
| `efinancas:user:{userId}:categorias` | Lista de categorias disponíveis para o usuário. |
| `efinancas:user:{userId}:metas` | Lista de metas financeiras do usuário. |
| `efinancas:legacyMigrationOwner` | Controle da migração de dados gravados por versões anteriores. |

### 5.2 Usuário

| Nome | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | Texto UUID | Identificador único da conta. | `"550e8400-e29b-41d4-a716-446655440000"` |
| `nome` | Texto | Nome apresentado na aplicação. | `"Ana Souza"` |
| `email` | Texto | E-mail normalizado utilizado no login. | `"ana.souza@email.com"` |
| `passwordSalt` | Texto Base64 | Valor aleatório utilizado no processamento da senha. | `"YjJzZTY0LXNhbHQ="` |
| `passwordHash` | Texto Base64 | Resultado do hash SHA-256 da senha com o salt. | `"YjJzZTY0LWhhc2g="` |
| `createdAt` | Texto ISO 8601 | Data e hora de criação da conta. | `"2026-06-14T20:00:00.000Z"` |

### 5.3 Sessão

| Nome | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `userId` | Texto UUID | Identificador do usuário autenticado. | `"550e8400-e29b-41d4-a716-446655440000"` |

### 5.4 Perfil

| Nome | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `nome` | Texto | Nome atualizado do usuário. | `"Ana Souza Lima"` |
| `email` | Texto | E-mail atualizado do usuário. | `"ana.souza@email.com"` |
| `telefone` | Texto | Telefone informado pelo usuário. | `"(31) 99999-0000"` |

### 5.5 Transação

| Nome | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | Número inteiro | Identificador gerado a partir do instante do cadastro. | `1781481600000` |
| `tipo` | Texto | Tipo da movimentação: `receita` ou `despesa`. | `"despesa"` |
| `valor` | Texto monetário | Valor informado pelo usuário. | `"180,00"` |
| `categoria` | Texto | Categoria da movimentação. | `"Alimentação"` |
| `descricao` | Texto | Informação complementar opcional. | `"Compras do mês"` |
| `data` | Texto de data | Data da movimentação no formato `AAAA-MM-DD`. | `"2026-06-14"` |

### 5.6 Meta Financeira

| Nome | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | Número inteiro | Identificador gerado a partir do instante do cadastro. | `1781481600000` |
| `nome` | Texto | Nome do objetivo financeiro. | `"Reserva de emergência"` |
| `objetivo` | Número decimal | Valor total planejado. | `5000` |
| `guardado` | Número decimal | Valor acumulado na meta. | `750` |
| `prazo` | Texto de data | Data limite no formato `AAAA-MM-DD`. | `"2026-12-31"` |

### 5.7 Categoria

As categorias são armazenadas como uma lista de textos. A aplicação inicia cada usuário com as categorias `Alimentação`, `Transporte`, `Salário` e `Educação`.

```json
[
  "Alimentação",
  "Transporte",
  "Salário",
  "Educação",
  "Moradia"
]
```

## 6. Fluxo de Dados

1. O usuário cria uma conta ou realiza login.
2. O sistema valida as credenciais e grava o identificador da conta na sessão local.
3. A proteção de rotas confirma a sessão antes de carregar uma página interna.
4. O módulo `user-storage.js` transforma cada chave lógica em uma chave exclusiva do usuário.
5. As páginas leem os dados do `localStorage`, aplicam as regras de negócio e atualizam a interface.
6. Ao cadastrar, alterar ou excluir informações, os dados são novamente serializados em JSON e persistidos no navegador.

## 7. Instruções de Acesso e Execução

### 7.1 Pré-requisitos

- navegador atualizado com suporte a JavaScript ES Modules, `localStorage` e Web Crypto API;
- conexão com a internet para carregar a biblioteca Chart.js pela CDN;

Para executar a aplicação localmente, também é necessário possuir o Python 3. O Node.js é necessário somente para executar os testes automatizados.

### 7.2 Acesso à Aplicação Hospedada

A versão publicada do E-Finanças está disponível no GitHub Pages:

[Acessar aplicação E-Finanças](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t1-e-financas/src/)

O endereço hospedado deve ser utilizado como forma principal de acesso para apresentação e verificação da implementação.

### 7.3 Execução Local

Na raiz do repositório, execute:

```bash
python3 -m http.server 8000 --directory src
```

Depois, acesse:

```text
http://localhost:8000
```

Essa alternativa é indicada para desenvolvimento, testes e verificação do código-fonte.

## 8. Roteiro de Verificação da Implementação

Para verificar as principais funcionalidades:

1. Acesse a [aplicação hospedada](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t1-e-financas/src/) e selecione a opção para criar uma conta.
2. Cadastre um usuário com senha de pelo menos oito caracteres.
3. Confirme que o sistema direciona para o Dashboard.
4. Acesse **Nova transação** e registre uma receita e uma despesa.
5. Abra **Transações**, utilize a busca e os filtros e confirme os totais apresentados.
6. Exclua uma movimentação e verifique o recálculo do saldo.
7. Abra **Relatórios** e confira os totais, gráficos, percentuais e insights.
8. Abra **Metas**, crie uma meta e adicione uma contribuição.
9. Retorne ao Dashboard e confirme a exibição da meta e do progresso.
10. Abra **Perfil**, altere os dados e confirme a atualização na interface.
11. Encerre a sessão, crie uma segunda conta e confirme que os dados da primeira conta não são exibidos.

Os casos de teste detalhados e os resultados obtidos estão disponíveis em [`testes-e-financas.md`](testes-e-financas.md).

## 9. Limitações e Considerações de Segurança

- A aplicação não possui backend ou banco de dados remoto.
- Os dados permanecem somente no navegador e podem ser perdidos caso o armazenamento do site seja limpo.
- As contas criadas em um navegador não ficam disponíveis automaticamente em outros dispositivos ou navegadores.
- O hash de senha reduz a exposição do texto original, mas a autenticação local não substitui uma solução segura com backend em ambiente de produção.
- A biblioteca Chart.js é carregada por CDN; sem conexão com a internet, os gráficos podem não ser apresentados.
- A solução atende ao objetivo acadêmico de demonstrar uma aplicação web funcional executada no lado do cliente.

## 10. Artefatos Relacionados

- [Código-fonte e instruções de utilização](../src/README.md)
- [Guia de estilos da interface](template.md)
- [Documentação de testes](testes-e-financas.md)
- [Arquivo-modelo utilizado como referência](development.md)
