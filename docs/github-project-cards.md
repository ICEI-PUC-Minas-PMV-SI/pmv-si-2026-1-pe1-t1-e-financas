# Cards para GitHub Projects Kanban - E-Financas

Este arquivo organiza as cards sugeridas para o Kanban do projeto E-Financas. As cards foram montadas a partir da documentacao em `docs/`, do fluxo UX apresentado na imagem e do codigo inicial existente em `src/`.

O objetivo e facilitar a divisao do trabalho entre desenvolvedores em aprendizado, deixando cada card com escopo claro, criterios de aceite e passos pequenos de implementacao.

## Configuracao sugerida do Kanban

### Colunas

- **Backlog**: ideias e tarefas ainda nao priorizadas.
- **Ready**: tarefas prontas para desenvolvimento.
- **In Progress**: tarefas em desenvolvimento.
- **Review**: tarefas aguardando revisao do grupo.
- **Testing**: tarefas aguardando teste manual ou ajuste final.
- **Done**: tarefas concluidas e validadas.

### Labels sugeridas

- `documentacao`
- `frontend`
- `html-css`
- `javascript`
- `ux`
- `acessibilidade`
- `testes`
- `dados-localstorage`
- `prioridade-alta`
- `prioridade-media`
- `prioridade-baixa`

### Regra simples de Definition of Done

Uma card so deve ir para **Done** quando:

- O codigo ou documento foi entregue no repositorio.
- A funcionalidade foi testada manualmente.
- A tela funciona em desktop e mobile.
- O requisito relacionado foi marcado na documentacao, quando aplicavel.
- Outro integrante revisou a entrega.

---

## Epico 1 - Base do projeto e navegacao

### Card 01 - Organizar estrutura inicial do frontend

**Tipo:** Task  
**Prioridade:** Alta  
**Labels:** `frontend`, `html-css`, `prioridade-alta`  
**Requisitos relacionados:** RNF-01, RNF-02, RNF-03  
**Dependencias:** Nenhuma

**Objetivo:**  
Garantir que o projeto tenha uma estrutura simples, padronizada e facil de entender para as proximas funcionalidades.

**Contexto para o desenvolvedor:**  
O projeto ja possui arquivos em `src/`, como `index.html`, `transacoes.html`, `nova-transacao.html` e `styles.css`. Esta card serve para revisar essa base, padronizar nomes e deixar a navegacao preparada para novas telas.

**Tarefas:**

- Revisar a estrutura atual da pasta `src/`.
- Confirmar se todas as paginas usam o mesmo arquivo `styles.css`.
- Padronizar titulos, cabecalhos, nomes de classes e links principais.
- Garantir que todas as paginas tenham `lang="pt-BR"` e `viewport`.
- Criar links reais no menu lateral para as paginas que ja existirem.

**Criterios de aceite:**

- O projeto abre corretamente pelo arquivo `src/index.html`.
- As paginas existentes carregam o CSS sem erro.
- O menu lateral nao possui links quebrados para paginas ja criadas.
- A estrutura esta simples o bastante para outro integrante continuar.

---

### Card 02 - Criar layout base autenticado com menu lateral

**Tipo:** Story  
**Prioridade:** Alta  
**Labels:** `frontend`, `ux`, `html-css`, `prioridade-alta`  
**Requisitos relacionados:** RNF-01, RNF-02, RNF-03  
**Dependencias:** Card 01

**Historia de usuario:**  
Como usuario financeiro digital, quero navegar pelas principais areas do sistema para acessar minhas informacoes financeiras com facilidade.

**Objetivo:**  
Criar uma base visual comum para as telas internas, com menu lateral, barra superior, avatar do usuario e area principal de conteudo.

**Tarefas:**

- Criar ou padronizar o menu com os itens: Dashboard, Transacoes, Relatorios, Metas e Perfil.
- Destacar visualmente o item ativo do menu.
- Manter a identidade visual do projeto: fundo claro, cards brancos, azul como cor primaria, verde para receitas e vermelho para despesas.
- Ajustar o layout para funcionar em telas menores.
- Garantir que o conteudo principal nao fique escondido pelo menu.

**Criterios de aceite:**

- Todas as telas internas usam o mesmo padrao de menu e cabecalho.
- O usuario consegue identificar em qual tela esta.
- Em mobile, a interface continua legivel e navegavel.
- A estrutura segue o guia de estilos em `docs/template.md`.

---

## Epico 2 - Acesso, cadastro e autenticacao simulada

### Card 03 - Finalizar tela de login

**Tipo:** Story  
**Prioridade:** Alta  
**Labels:** `frontend`, `ux`, `prioridade-alta`  
**Requisitos relacionados:** RF-02, RNF-02, RNF-03  
**Dependencias:** Card 01

**Historia de usuario:**  
Como usuario financeiro digital, quero realizar login no sistema para acessar minhas informacoes financeiras com seguranca.

**Objetivo:**  
Transformar a tela inicial em uma experiencia clara de login, com validacao basica e redirecionamento para o Dashboard.

**Tarefas:**

- Revisar campos de e-mail e senha.
- Exibir mensagem quando o usuario tentar entrar sem preencher campos obrigatorios.
- Redirecionar o usuario para o Dashboard apos preencher os dados.
- Adicionar link visivel para a tela de cadastro.
- Manter a tela responsiva.

**Criterios de aceite:**

- O formulario possui e-mail e senha obrigatorios.
- O usuario recebe feedback quando falta preencher algum campo.
- Ao preencher os dados corretamente, o usuario segue para o Dashboard.
- Existe caminho claro para criar cadastro.

---

### Card 04 - Criar tela de cadastro de usuario

**Tipo:** Story  
**Prioridade:** Alta  
**Labels:** `frontend`, `javascript`, `prioridade-alta`  
**Requisitos relacionados:** RF-01, RNF-02, RNF-03  
**Dependencias:** Card 03

**Historia de usuario:**  
Como usuario financeiro digital, quero me cadastrar na aplicacao para acessar e utilizar o sistema de controle financeiro.

**Objetivo:**  
Criar uma tela simples de cadastro com os dados minimos do usuario.

**Tarefas:**

- Criar arquivo de pagina para cadastro, por exemplo `cadastro.html`.
- Incluir campos: nome, e-mail, senha e confirmacao de senha.
- Validar se os campos obrigatorios foram preenchidos.
- Validar se senha e confirmacao de senha sao iguais.
- Salvar os dados basicos do usuario no `localStorage`.
- Redirecionar para o Dashboard ou Login apos cadastro concluido.

**Criterios de aceite:**

- O usuario consegue abrir a tela de cadastro pelo login.
- O sistema impede cadastro com campos vazios.
- O sistema impede cadastro com senhas diferentes.
- O cadastro concluido mostra mensagem de sucesso ou redireciona corretamente.

---

## Epico 3 - Dados financeiros e persistencia local

### Card 05 - Definir modelo de dados no localStorage

**Tipo:** Task  
**Prioridade:** Alta  
**Labels:** `javascript`, `dados-localstorage`, `prioridade-alta`  
**Requisitos relacionados:** RF-03, RF-04, RF-05, RF-06, RF-07, RF-08, RF-10, RF-11  
**Dependencias:** Card 01

**Objetivo:**  
Definir como receitas, despesas, metas e usuario serao salvos no navegador usando `localStorage`.

**Contexto para o desenvolvedor:**  
Como o projeto e de aplicacao web introdutoria, nao ha backend. Os dados podem ser salvos localmente no navegador.

**Tarefas:**

- Criar um arquivo JavaScript para funcoes compartilhadas, por exemplo `app.js`.
- Definir estrutura de uma transacao com: id, tipo, valor, categoria, descricao e data.
- Definir estrutura de uma meta com: id, nome, valorObjetivo, valorAtual e categoria.
- Criar funcoes para salvar, buscar, atualizar e remover dados do `localStorage`.
- Criar dados de exemplo para primeiro acesso, se nao houver dados salvos.

**Criterios de aceite:**

- As funcoes de dados podem ser usadas por mais de uma pagina.
- O navegador mantem os dados apos atualizar a pagina.
- Existe uma forma simples de identificar cada transacao e cada meta por `id`.
- O codigo possui nomes claros e faceis de entender.

---

## Epico 4 - Dashboard financeiro

### Card 06 - Criar tela de Dashboard

**Tipo:** Story  
**Prioridade:** Alta  
**Labels:** `frontend`, `javascript`, `ux`, `prioridade-alta`  
**Requisitos relacionados:** RF-05, RF-06, RNF-01, RNF-02, RNF-03  
**Dependencias:** Card 02, Card 05

**Historia de usuario:**  
Como usuario financeiro digital, quero visualizar meu saldo atual para entender minha situacao financeira.

**Objetivo:**  
Criar a tela central do sistema com saldo atual, resumo financeiro, transacoes recentes e atalhos principais.

**Tarefas:**

- Criar arquivo `dashboard.html`.
- Exibir saldo atual calculado por receitas menos despesas.
- Exibir total de receitas do mes.
- Exibir total de despesas do mes.
- Exibir quantidade de transacoes cadastradas.
- Listar as transacoes mais recentes.
- Adicionar atalhos para Nova Transacao, Historico, Relatorios e Metas.

**Criterios de aceite:**

- O Dashboard mostra valores calculados a partir dos dados do `localStorage`.
- O saldo atual atualiza quando uma transacao e criada, editada ou excluida.
- O usuario entende rapidamente sua situacao financeira.
- A tela segue o fluxo da imagem: login/cadastro direcionam para Dashboard.

---

### Card 07 - Criar estados visuais do Dashboard

**Tipo:** Task  
**Prioridade:** Media  
**Labels:** `frontend`, `ux`, `prioridade-media`  
**Requisitos relacionados:** RNF-02, RNF-03  
**Dependencias:** Card 06

**Objetivo:**  
Mostrar mensagens claras quando nao houver dados ou quando alguma acao falhar.

**Tarefas:**

- Criar estado vazio para quando nao houver transacoes.
- Criar mensagem orientando o usuario a cadastrar a primeira transacao.
- Criar feedback visual de erro para falhas de leitura ou salvamento local.
- Criar mensagem de sucesso apos cadastro, edicao ou exclusao quando aplicavel.

**Criterios de aceite:**

- O Dashboard nao fica com areas vazias sem explicacao.
- O usuario sempre entende o que precisa fazer em seguida.
- Mensagens de sucesso e erro usam linguagem simples.

---

## Epico 5 - Cadastro de receitas e despesas

### Card 08 - Implementar cadastro de nova transacao

**Tipo:** Story  
**Prioridade:** Alta  
**Labels:** `frontend`, `javascript`, `dados-localstorage`, `prioridade-alta`  
**Requisitos relacionados:** RF-03, RF-04, RF-08  
**Dependencias:** Card 05

**Historia de usuario:**  
Como usuario financeiro digital, quero registrar minhas receitas e despesas para acompanhar meus ganhos e controlar meus gastos.

**Objetivo:**  
Fazer o formulario de nova transacao salvar dados reais no `localStorage`.

**Tarefas:**

- Usar a tela `nova-transacao.html` como base.
- Permitir selecionar tipo: receita ou despesa.
- Permitir preencher valor, categoria, descricao e data.
- Validar campos obrigatorios antes de salvar.
- Converter valor digitado para numero antes de salvar.
- Salvar a transacao no `localStorage`.
- Redirecionar para Historico ou Dashboard apos salvar.

**Criterios de aceite:**

- O usuario consegue cadastrar receita.
- O usuario consegue cadastrar despesa.
- A transacao cadastrada aparece na listagem.
- O saldo e os resumos sao atualizados apos o cadastro.
- Valores invalidos ou vazios nao sao salvos.

---

### Card 09 - Melhorar validacao e feedback do formulario

**Tipo:** Task  
**Prioridade:** Media  
**Labels:** `frontend`, `javascript`, `ux`, `prioridade-media`  
**Requisitos relacionados:** RF-03, RF-04, RNF-03  
**Dependencias:** Card 08

**Objetivo:**  
Deixar o formulario mais facil de usar, mostrando erros e confirmacoes diretamente na tela.

**Tarefas:**

- Mostrar erro quando valor for zero, negativo ou vazio.
- Mostrar erro quando categoria nao for selecionada.
- Mostrar erro quando data nao for preenchida.
- Exibir previa da transacao conforme o usuario preenche o formulario.
- Mostrar mensagem de sucesso apos salvar.

**Criterios de aceite:**

- O usuario nao consegue salvar uma transacao invalida.
- Cada erro informa claramente o que precisa ser corrigido.
- A previa da transacao mostra tipo, categoria, data e valor.

---

## Epico 6 - Historico de transacoes

### Card 10 - Listar transacoes cadastradas

**Tipo:** Story  
**Prioridade:** Alta  
**Labels:** `frontend`, `javascript`, `dados-localstorage`, `prioridade-alta`  
**Requisitos relacionados:** RF-06, RF-08  
**Dependencias:** Card 05, Card 08

**Historia de usuario:**  
Como usuario financeiro digital, quero visualizar minhas transacoes para acompanhar meu historico financeiro.

**Objetivo:**  
Transformar a tela de transacoes em uma lista dinamica baseada nos dados salvos.

**Tarefas:**

- Ler transacoes do `localStorage`.
- Exibir tipo, categoria, descricao, data e valor.
- Diferenciar visualmente receitas e despesas.
- Ordenar transacoes por data mais recente.
- Exibir mensagem quando nao houver transacoes.

**Criterios de aceite:**

- A lista mostra todas as transacoes cadastradas.
- Receitas aparecem com valor positivo e cor verde.
- Despesas aparecem com valor negativo e cor vermelha.
- A tela nao depende mais apenas de dados fixos no HTML.

---

### Card 11 - Implementar filtros e busca de transacoes

**Tipo:** Story  
**Prioridade:** Media  
**Labels:** `frontend`, `javascript`, `prioridade-media`  
**Requisitos relacionados:** RF-10, RF-06  
**Dependencias:** Card 10

**Historia de usuario:**  
Como usuario financeiro digital, quero filtrar minhas transacoes por periodo e tipo para encontrar informacoes importantes com mais facilidade.

**Objetivo:**  
Permitir busca e filtros na tela de historico.

**Tarefas:**

- Implementar busca por texto na descricao ou categoria.
- Implementar filtro por tipo: todas, receitas e despesas.
- Implementar filtro por periodo: mes atual, ultimos 3 meses e ano atual.
- Atualizar os cards de resumo conforme o filtro aplicado.
- Criar botao ou acao para limpar filtros.

**Criterios de aceite:**

- A busca filtra a lista enquanto o usuario digita ou apos acao clara.
- O filtro por tipo funciona corretamente.
- O filtro por periodo funciona corretamente.
- Os totais exibidos respeitam os filtros aplicados.

---

### Card 12 - Editar e excluir transacoes

**Tipo:** Story  
**Prioridade:** Media  
**Labels:** `frontend`, `javascript`, `dados-localstorage`, `prioridade-media`  
**Requisitos relacionados:** RF-07, RF-05, RF-06  
**Dependencias:** Card 10

**Historia de usuario:**  
Como usuario financeiro digital, quero editar ou excluir transacoes para corrigir meu historico financeiro.

**Objetivo:**  
Permitir manutencao dos registros financeiros cadastrados.

**Tarefas:**

- Criar acao de editar em cada item da lista.
- Carregar dados da transacao no formulario de edicao.
- Salvar alteracoes no `localStorage`.
- Criar acao de excluir em cada item da lista.
- Pedir confirmacao antes de excluir.
- Atualizar saldo, resumo e lista apos edicao ou exclusao.

**Criterios de aceite:**

- O usuario consegue editar uma transacao existente.
- O usuario consegue excluir uma transacao apos confirmar.
- O saldo e os indicadores sao recalculados apos mudancas.
- O sistema evita excluir por clique acidental.

---

## Epico 7 - Relatorios e insights

### Card 13 - Criar tela de relatorios financeiros

**Tipo:** Story  
**Prioridade:** Media  
**Labels:** `frontend`, `javascript`, `ux`, `prioridade-media`  
**Requisitos relacionados:** RF-09, RF-08, RF-10  
**Dependencias:** Card 10, Card 11

**Historia de usuario:**  
Como usuario financeiro digital, quero visualizar relatorios financeiros para analisar meus habitos de consumo.

**Objetivo:**  
Criar uma tela com resumo visual por categoria e comparativo mensal.

**Tarefas:**

- Criar arquivo `relatorios.html`.
- Exibir total de receitas e despesas do periodo.
- Exibir gastos agrupados por categoria.
- Exibir comparativo simples por mes.
- Usar cards, barras ou grafico simples feito com HTML/CSS.
- Permitir filtrar o periodo analisado.

**Criterios de aceite:**

- A tela mostra dados calculados a partir das transacoes reais.
- O usuario consegue identificar categorias com maior gasto.
- O comparativo mensal e facil de entender.
- A pagina funciona mesmo quando ha poucos dados.

---

### Card 14 - Criar insights financeiros simples

**Tipo:** Task  
**Prioridade:** Baixa  
**Labels:** `javascript`, `ux`, `prioridade-baixa`  
**Requisitos relacionados:** RF-13, RF-09  
**Dependencias:** Card 13

**Objetivo:**  
Gerar mensagens simples para ajudar o usuario a entender melhor seus gastos e economia.

**Tarefas:**

- Identificar a categoria com maior gasto no periodo.
- Calcular percentual de economia: saldo positivo dividido por receitas.
- Mostrar alerta quando despesas forem maiores que receitas.
- Mostrar mensagem positiva quando o usuario economizar no mes.
- Escrever textos curtos, objetivos e sem julgamento.

**Criterios de aceite:**

- A tela exibe pelo menos 2 insights baseados nos dados.
- Os textos mudam conforme os valores das transacoes.
- As mensagens sao simples para usuarios iniciantes em financas.

---

## Epico 8 - Metas financeiras

### Card 15 - Criar tela de metas financeiras

**Tipo:** Story  
**Prioridade:** Media  
**Labels:** `frontend`, `javascript`, `dados-localstorage`, `prioridade-media`  
**Requisitos relacionados:** RF-11  
**Dependencias:** Card 05, Card 02

**Historia de usuario:**  
Como usuario financeiro digital, quero definir metas financeiras para organizar meus objetivos futuros.

**Objetivo:**  
Permitir que o usuario cadastre metas e acompanhe o progresso de cada uma.

**Tarefas:**

- Criar arquivo `metas.html`.
- Criar formulario com nome da meta, valor objetivo, valor atual e categoria.
- Salvar metas no `localStorage`.
- Listar metas em cards.
- Exibir barra de progresso para cada meta.
- Permitir adicionar valor a uma meta existente.

**Criterios de aceite:**

- O usuario consegue criar uma meta.
- A meta aparece na listagem apos salvar.
- A barra de progresso representa corretamente o valor atual.
- O usuario consegue atualizar o progresso da meta.

---

### Card 16 - Criar estado de acompanhamento de progresso

**Tipo:** Task  
**Prioridade:** Baixa  
**Labels:** `frontend`, `ux`, `prioridade-baixa`  
**Requisitos relacionados:** RF-11, RNF-03  
**Dependencias:** Card 15

**Objetivo:**  
Melhorar a clareza visual das metas para que o usuario entenda seu progresso.

**Tarefas:**

- Mostrar percentual concluido de cada meta.
- Destacar metas completas.
- Impedir progresso maior que 100% sem tratar visualmente.
- Exibir mensagem quando nao houver metas cadastradas.
- Criar acao para excluir meta, se fizer sentido para o escopo.

**Criterios de aceite:**

- O usuario entende quanto falta para concluir cada meta.
- Metas completas ficam visualmente diferentes.
- A tela vazia orienta o usuario a criar a primeira meta.

---

## Epico 9 - Perfil financeiro

### Card 17 - Criar tela de perfil do usuario

**Tipo:** Story  
**Prioridade:** Baixa  
**Labels:** `frontend`, `javascript`, `prioridade-baixa`  
**Requisitos relacionados:** RF-12, RNF-02, RNF-03  
**Dependencias:** Card 04, Card 05

**Historia de usuario:**  
Como sistema, quero classificar o perfil financeiro do usuario para adaptar funcionalidades e recomendacoes.

**Objetivo:**  
Criar uma tela de perfil com dados do usuario e classificacao financeira simples.

**Tarefas:**

- Criar arquivo `perfil.html`.
- Exibir nome e e-mail do usuario salvo.
- Calcular perfil com base em saldo, despesas e receitas.
- Usar classificacoes simples: Endividado, Organizado ou Investidor.
- Explicar em uma frase o significado da classificacao.
- Permitir atualizar dados basicos do usuario, se houver tempo.

**Criterios de aceite:**

- A tela mostra dados basicos do usuario.
- O perfil financeiro muda conforme os dados financeiros.
- A classificacao usa linguagem clara e educativa.

---

## Epico 10 - Responsividade, acessibilidade e qualidade

### Card 18 - Revisar responsividade das telas principais

**Tipo:** Task  
**Prioridade:** Alta  
**Labels:** `frontend`, `ux`, `acessibilidade`, `prioridade-alta`  
**Requisitos relacionados:** RNF-01, RNF-02, RNF-03  
**Dependencias:** Cards 06, 08, 10, 13, 15, 17

**Objetivo:**  
Garantir que o sistema funcione bem em celular, tablet e desktop.

**Tarefas:**

- Testar Login, Cadastro, Dashboard, Transacoes, Nova Transacao, Relatorios, Metas e Perfil em telas menores.
- Ajustar grids para virarem coluna no mobile.
- Garantir que botoes nao fiquem cortados.
- Garantir que textos nao se sobreponham.
- Verificar se o menu lateral tem comportamento adequado no mobile.

**Criterios de aceite:**

- Todas as telas sao usaveis em largura de celular.
- Nenhum texto importante fica cortado.
- Formularios continuam faceis de preencher.
- O usuario consegue navegar sem depender de zoom.

---

### Card 19 - Revisar acessibilidade basica

**Tipo:** Task  
**Prioridade:** Media  
**Labels:** `acessibilidade`, `frontend`, `prioridade-media`  
**Requisitos relacionados:** RNF-02, RNF-03  
**Dependencias:** Cards 03, 04, 06, 08, 10

**Objetivo:**  
Melhorar o uso do sistema por teclado, leitores de tela e usuarios com dificuldade visual.

**Tarefas:**

- Conferir se inputs possuem `label`.
- Conferir se botoes e links tem texto compreensivel.
- Garantir contraste adequado entre texto e fundo.
- Adicionar `aria-label` quando o texto visivel nao for suficiente.
- Testar navegacao basica usando apenas teclado.
- Garantir foco visivel nos controles interativos.

**Criterios de aceite:**

- O usuario consegue preencher formularios usando teclado.
- Campos obrigatorios sao identificaveis.
- Botoes possuem textos claros.
- O foco visivel aparece ao navegar com Tab.

---

### Card 20 - Criar plano de testes manuais

**Tipo:** Task  
**Prioridade:** Alta  
**Labels:** `testes`, `documentacao`, `prioridade-alta`  
**Requisitos relacionados:** Todos os RFs implementados e RNF-01, RNF-02, RNF-03  
**Dependencias:** Cards funcionais implementados

**Objetivo:**  
Documentar testes simples para o grupo validar as funcionalidades antes da entrega.

**Tarefas:**

- Atualizar `docs/tests.md` com casos de teste do E-Financas.
- Criar caso de teste para cadastro.
- Criar caso de teste para login.
- Criar caso de teste para cadastrar receita.
- Criar caso de teste para cadastrar despesa.
- Criar caso de teste para filtrar transacoes.
- Criar caso de teste para metas.
- Criar caso de teste para responsividade.

**Criterios de aceite:**

- Cada caso de teste possui procedimento, requisito associado, dados de entrada e resultado esperado.
- Os testes usam exemplos coerentes com financas pessoais.
- O grupo consegue executar os testes manualmente sem ajuda externa.

---

## Epico 11 - Documentacao e entrega academica

### Card 21 - Atualizar especificacao com requisitos reais do projeto

**Tipo:** Task  
**Prioridade:** Alta  
**Labels:** `documentacao`, `prioridade-alta`  
**Requisitos relacionados:** Todos  
**Dependencias:** Nenhuma

**Objetivo:**  
Corrigir e complementar a documentacao para refletir o projeto E-Financas, evitando exemplos genericos de template.

**Tarefas:**

- Revisar `docs/context.md`.
- Revisar `docs/especification.md`.
- Remover exemplos genericos que nao fazem parte do E-Financas.
- Garantir que historias de usuario, requisitos e restricoes estejam alinhados.
- Padronizar IDs dos requisitos, por exemplo `RF-01`, `RF-02`, `RNF-01`.

**Criterios de aceite:**

- A documentacao descreve o E-Financas, nao exemplos de outro sistema.
- Todos os requisitos citados na interface aparecem na especificacao.
- Os IDs dos requisitos estao padronizados.

---

### Card 22 - Atualizar documentacao de interface

**Tipo:** Task  
**Prioridade:** Media  
**Labels:** `documentacao`, `ux`, `prioridade-media`  
**Requisitos relacionados:** RNF-01, RNF-02, RNF-03  
**Dependencias:** Cards de interface implementadas

**Objetivo:**  
Registrar como as telas finais foram construidas e quais requisitos cada uma atende.

**Tarefas:**

- Atualizar `docs/interface.md` com capturas ou descricoes das telas finais.
- Documentar fluxo: acesso, login/cadastro, Dashboard e acoes financeiras.
- Relacionar cada tela aos requisitos correspondentes.
- Verificar se o texto esta coerente com a imagem de user flow.

**Criterios de aceite:**

- A documentacao explica as telas implementadas.
- O fluxo de usuario esta claro para avaliadores do projeto.
- Cada tela possui requisitos associados.

---

### Card 23 - Atualizar documentacao de desenvolvimento

**Tipo:** Task  
**Prioridade:** Media  
**Labels:** `documentacao`, `prioridade-media`  
**Requisitos relacionados:** Todos os RFs implementados  
**Dependencias:** Cards funcionais implementados

**Objetivo:**  
Descrever o que foi implementado, quais arquivos foram criados e como os dados sao armazenados.

**Tarefas:**

- Atualizar `docs/development.md`.
- Criar tabela com requisitos atendidos, responsavel e artefato criado.
- Descrever a estrutura de dados de transacao.
- Descrever a estrutura de dados de meta.
- Explicar o uso de `localStorage`.
- Informar como abrir e testar o projeto.

**Criterios de aceite:**

- A documentacao permite entender a implementacao sem abrir todos os arquivos.
- Cada requisito implementado aponta para pelo menos um artefato.
- A persistencia local esta explicada de forma simples.

---

### Card 24 - Preparar apresentacao final do projeto

**Tipo:** Task  
**Prioridade:** Media  
**Labels:** `documentacao`, `testes`, `prioridade-media`  
**Requisitos relacionados:** Todos os principais requisitos implementados  
**Dependencias:** Cards 20, 21, 22, 23

**Objetivo:**  
Organizar materiais para demonstrar o E-Financas na entrega da disciplina.

**Tarefas:**

- Atualizar `presentation/README.md`.
- Descrever problema, publico-alvo e solucao.
- Listar funcionalidades implementadas.
- Preparar roteiro de demonstracao: login, dashboard, nova transacao, historico, relatorios e metas.
- Incluir principais aprendizados do grupo.
- Registrar limitacoes e melhorias futuras.

**Criterios de aceite:**

- A apresentacao mostra claramente o valor do projeto.
- O roteiro permite demonstrar o sistema em poucos minutos.
- As limitacoes sao descritas de forma honesta e profissional.

---

## Priorizacao recomendada para o grupo

### Sprint 1 - Base e fluxo principal

1. Card 01 - Organizar estrutura inicial do frontend
2. Card 02 - Criar layout base autenticado com menu lateral
3. Card 03 - Finalizar tela de login
4. Card 04 - Criar tela de cadastro de usuario
5. Card 05 - Definir modelo de dados no localStorage
6. Card 06 - Criar tela de Dashboard

### Sprint 2 - Transacoes e saldo

1. Card 08 - Implementar cadastro de nova transacao
2. Card 09 - Melhorar validacao e feedback do formulario
3. Card 10 - Listar transacoes cadastradas
4. Card 11 - Implementar filtros e busca de transacoes
5. Card 12 - Editar e excluir transacoes
6. Card 07 - Criar estados visuais do Dashboard

### Sprint 3 - Funcionalidades complementares

1. Card 13 - Criar tela de relatorios financeiros
2. Card 15 - Criar tela de metas financeiras
3. Card 17 - Criar tela de perfil do usuario
4. Card 14 - Criar insights financeiros simples
5. Card 16 - Criar estado de acompanhamento de progresso

### Sprint 4 - Qualidade e entrega

1. Card 18 - Revisar responsividade das telas principais
2. Card 19 - Revisar acessibilidade basica
3. Card 20 - Criar plano de testes manuais
4. Card 21 - Atualizar especificacao com requisitos reais do projeto
5. Card 22 - Atualizar documentacao de interface
6. Card 23 - Atualizar documentacao de desenvolvimento
7. Card 24 - Preparar apresentacao final do projeto

---

## Observacoes para quem for criar as issues no GitHub

- Cada card deste arquivo pode virar uma issue separada.
- Use o titulo da card como titulo da issue.
- Copie objetivo, tarefas e criterios de aceite para a descricao da issue.
- Adicione labels de acordo com a secao **Labels** de cada card.
- Use dependencias para decidir a ordem de execucao.
- Evite pegar cards grandes demais em paralelo se elas dependem da mesma base de dados.
