# Testes do Sistema E-Finanças

## Introdução

Os testes do sistema E-Finanças foram planejados com o objetivo de verificar se as principais funcionalidades da aplicação atendem ao fluxo esperado pelo usuário. Como a solução foi desenvolvida para apoiar o controle de finanças pessoais, os testes priorizam tarefas essenciais, como criar uma conta, acessar o sistema, registrar movimentações, consultar o histórico financeiro, acompanhar relatórios e administrar metas.

Para os testes de software, foi adotada uma abordagem de caixa-preta. Nesse tipo de teste, a aplicação é avaliada a partir das ações realizadas na interface e dos resultados apresentados ao usuário, sem considerar os detalhes internos da implementação. Também foram definidos cenários de teste de usabilidade para avaliar se pessoas do público-alvo conseguem utilizar as principais funções com clareza e autonomia.

# Teste de Software

## Plano de Testes de Software

Os casos de teste apresentados a seguir devem ser executados em um navegador atualizado, com a aplicação iniciada conforme as instruções disponíveis no arquivo `src/README.md`. Para evitar interferência de informações cadastradas anteriormente, recomenda-se limpar os dados do site armazenados no navegador antes de iniciar a sequência de testes.

### CT01 - Criar uma conta

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de login.<br>2. Selecionar a opção para criar uma conta.<br>3. Informar nome, e-mail, senha com pelo menos oito caracteres e confirmação da senha.<br>4. Clicar em **Criar conta**. |
| **Requisitos associados** | RF-01 - Permitir o cadastro de usuário. |
| **Resultado esperado** | A conta é criada, a sessão do usuário é iniciada e o sistema redireciona para o Dashboard. |
| **Dados de entrada** | Nome: Ana Souza; e-mail: ana.souza@email.com; senha: `financas123`; confirmação: `financas123`. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT02 - Impedir cadastro com dados inválidos

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de cadastro.<br>2. Preencher nome e e-mail.<br>3. Informar uma senha com menos de oito caracteres ou uma confirmação diferente da senha.<br>4. Clicar em **Criar conta**. |
| **Requisitos associados** | RF-01 - Permitir o cadastro de usuário. |
| **Resultado esperado** | O cadastro não é concluído e o sistema apresenta uma mensagem explicando o problema encontrado. |
| **Dados de entrada** | Nome: Ana Souza; e-mail: ana.souza@email.com; senha: `1234`; confirmação: `1235`. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT03 - Realizar login

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de login.<br>2. Informar o e-mail e a senha de uma conta cadastrada.<br>3. Clicar em **Entrar**. |
| **Requisitos associados** | RF-02 - Permitir que o usuário acesse sua conta. |
| **Resultado esperado** | O usuário é autenticado e direcionado para o Dashboard. |
| **Dados de entrada** | E-mail e senha válidos de uma conta cadastrada anteriormente. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT04 - Bloquear login com credenciais inválidas

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de login.<br>2. Informar um e-mail não cadastrado ou uma senha incorreta.<br>3. Clicar em **Entrar**. |
| **Requisitos associados** | RF-02 - Permitir que o usuário acesse sua conta. |
| **Resultado esperado** | O acesso não é autorizado e a mensagem “E-mail ou senha inválidos.” é apresentada. |
| **Dados de entrada** | E-mail: usuario.inexistente@email.com; senha: `senhaIncorreta`. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT05 - Registrar uma receita

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Realizar login.<br>2. Acessar a página **Nova transação**.<br>3. Selecionar o tipo **Receita**.<br>4. Informar valor, categoria, descrição e data.<br>5. Clicar em **Adicionar transação**.<br>6. Acessar a página **Transações**. |
| **Requisitos associados** | RF-03 - Registrar receitas; RF-05 - Exibir saldo e resumo financeiro; RF-06 - Listar transações; RF-08 - Categorizar transações. |
| **Resultado esperado** | A mensagem de sucesso é apresentada, a receita aparece no histórico e os totais financeiros são atualizados. |
| **Dados de entrada** | Tipo: Receita; valor: R$ 3.500,00; categoria: Salário; descrição: Pagamento mensal; data: data atual. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT06 - Registrar uma despesa

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Realizar login.<br>2. Acessar a página **Nova transação**.<br>3. Manter o tipo **Despesa** selecionado.<br>4. Informar valor, categoria, descrição e data.<br>5. Clicar em **Adicionar transação**.<br>6. Acessar o Dashboard. |
| **Requisitos associados** | RF-04 - Registrar despesas; RF-05 - Exibir saldo e resumo financeiro; RF-06 - Listar transações; RF-08 - Categorizar transações. |
| **Resultado esperado** | A despesa é salva, aparece entre as movimentações e seu valor é descontado do saldo apresentado. |
| **Dados de entrada** | Tipo: Despesa; valor: R$ 180,00; categoria: Alimentação; descrição: Compras do mês; data: data atual. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT07 - Validar o cadastro de uma transação

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Nova transação**.<br>2. Informar um valor igual ou menor que zero.<br>3. Tentar adicionar a transação.<br>4. Repetir o teste com um valor válido, mas sem selecionar uma categoria. |
| **Requisitos associados** | RF-03 - Registrar receitas; RF-04 - Registrar despesas; RF-08 - Categorizar transações. |
| **Resultado esperado** | A transação não é salva. O sistema solicita um valor válido no primeiro teste e uma categoria no segundo. |
| **Dados de entrada** | Primeiro teste: valor R$ 0,00. Segundo teste: valor R$ 100,00 e categoria não selecionada. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT08 - Buscar e filtrar transações

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Cadastrar pelo menos uma receita e uma despesa.<br>2. Acessar a página **Transações**.<br>3. Pesquisar pelo nome de uma categoria ou descrição.<br>4. Aplicar os filtros **Receitas** e **Despesas** separadamente. |
| **Requisitos associados** | RF-06 - Listar transações; RF-10 - Pesquisar e filtrar transações. |
| **Resultado esperado** | A lista apresenta somente as movimentações compatíveis com o texto pesquisado e com o tipo selecionado. |
| **Dados de entrada** | Busca: Alimentação; filtros: Receitas e Despesas. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT09 - Excluir uma transação

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Transações**.<br>2. Clicar em **Excluir** em uma movimentação cadastrada.<br>3. Confirmar a exclusão.<br>4. Consultar novamente o resumo financeiro. |
| **Requisitos associados** | RF-05 - Exibir saldo e resumo financeiro; RF-07 - Excluir transações; RF-06 - Listar transações. |
| **Resultado esperado** | A movimentação é removida da lista e os valores do resumo financeiro são recalculados. |
| **Dados de entrada** | Uma transação cadastrada anteriormente. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT10 - Consultar relatórios financeiros

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Cadastrar receitas e despesas em diferentes categorias.<br>2. Acessar a página **Relatórios**.<br>3. Comparar os totais exibidos com as movimentações cadastradas. |
| **Requisitos associados** | RF-09 - Apresentar relatórios financeiros. |
| **Resultado esperado** | O sistema apresenta totais de receitas, despesas, saldo projetado, taxa de economia, gráficos e informações sobre os gastos por categoria. |
| **Dados de entrada** | Receita de R$ 3.500,00 e despesas distribuídas entre Alimentação e Transporte. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT11 - Criar e atualizar uma meta financeira

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Metas**.<br>2. Clicar em **Adicionar meta**.<br>3. Informar nome, valor do objetivo, valor já guardado e prazo.<br>4. Salvar a meta.<br>5. Clicar em **Adicionar valor** e registrar uma nova contribuição. |
| **Requisitos associados** | RF-11 - Criar e acompanhar metas financeiras. |
| **Resultado esperado** | A meta é exibida em um card. Após a contribuição, o valor guardado, o percentual e a barra de progresso são atualizados. |
| **Dados de entrada** | Nome: Reserva de emergência; objetivo: R$ 5.000,00; guardado: R$ 500,00; contribuição adicional: R$ 250,00; prazo: data futura. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT12 - Atualizar os dados do perfil

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Perfil**.<br>2. Alterar nome, e-mail ou telefone.<br>3. Clicar em **Salvar alterações**.<br>4. Navegar para outra página do sistema. |
| **Requisitos associados** | RF-12 - Permitir a atualização dos dados do usuário. |
| **Resultado esperado** | O sistema confirma a atualização e passa a apresentar os novos dados do usuário na interface. |
| **Dados de entrada** | Nome: Ana Souza Lima; telefone: (31) 99999-0000. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT13 - Verificar a separação dos dados entre usuários

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Criar a conta do usuário A e cadastrar uma transação.<br>2. Sair do sistema.<br>3. Criar ou acessar a conta do usuário B.<br>4. Abrir as páginas Dashboard, Transações e Metas. |
| **Requisitos associados** | RF-01 - Permitir o cadastro de usuário; RF-02 - Permitir o acesso à conta. |
| **Resultado esperado** | O usuário B não visualiza as transações, metas ou informações pessoais pertencentes ao usuário A. |
| **Dados de entrada** | Duas contas com e-mails diferentes. |
| **Resultado obtido** | A preencher após a execução do teste. |

### CT14 - Verificar a responsividade das telas principais

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar as páginas Dashboard, Transações, Nova transação, Relatórios, Metas e Perfil.<br>2. Repetir a navegação em larguras de tela representativas de celular, tablet e computador.<br>3. Verificar menus, formulários, cards, gráficos e listas. |
| **Requisitos associados** | RNF-01 - A aplicação deve ser responsiva; RNF-02 - A interface deve ser simples e de fácil utilização; RNF-03 - A aplicação deve apresentar informações com clareza. |
| **Resultado esperado** | O conteúdo permanece legível e utilizável, sem sobreposição de elementos, cortes indevidos ou necessidade de rolagem horizontal. |
| **Dados de entrada** | Larguras sugeridas: 390 px, 768 px e 1366 px. |
| **Resultado obtido** | A preencher após a execução do teste. |

## Avaliação dos Testes de Software

A avaliação dos testes de software deverá considerar a quantidade de casos executados com sucesso, as falhas encontradas e o impacto de cada problema sobre o uso da aplicação. Como este documento apresenta o planejamento dos testes, os resultados obtidos devem ser preenchidos pela equipe somente após a execução de cada caso.

Durante a avaliação, deve ser dada atenção especial ao cálculo dos valores financeiros, à persistência dos dados no navegador e à separação das informações entre contas diferentes. Esses pontos são importantes porque uma inconsistência pode comprometer a confiança do usuário no sistema. Também devem ser observadas as mensagens de validação, pois elas precisam orientar o usuário de forma clara quando uma ação não puder ser concluída.

As falhas identificadas deverão ser registradas e priorizadas conforme sua gravidade. Problemas que impeçam o acesso à conta, causem perda de dados ou apresentem valores financeiros incorretos devem ser corrigidos antes da entrega. Ajustes visuais e melhorias de clareza podem ser tratados nas iterações seguintes, desde que não prejudiquem a realização das tarefas principais.

# Testes de Usabilidade

## Objetivo e método

Os testes de usabilidade têm como objetivo avaliar se o público-alvo consegue utilizar o E-Finanças sem precisar de orientação constante. Para isso, os participantes devem realizar tarefas comuns de organização financeira enquanto um integrante da equipe observa dificuldades, dúvidas e caminhos percorridos.

Recomenda-se convidar quatro participantes adultos que utilizem computador ou celular no dia a dia e tenham interesse em melhorar a própria organização financeira. Não é necessário que conheçam o sistema anteriormente. Para preservar a privacidade dos participantes, seus nomes e outros dados pessoais não devem ser registrados.

Em cada cenário, deverão ser avaliados os seguintes indicadores:

- **Taxa de sucesso:** informa se o participante concluiu a tarefa proposta.
- **Satisfação subjetiva:** avaliação do participante em uma escala de 1 a 5, sendo 1 “péssimo” e 5 “ótimo”.
- **Tempo de conclusão:** tempo necessário para finalizar a tarefa.
- **Observações:** comentários, dúvidas e dificuldades percebidas durante o teste.

Os testes podem ser realizados presencialmente ou por videoconferência, utilizando um cronômetro e uma planilha para registrar os resultados. Antes do início, o participante deve receber apenas a descrição do cenário, sem instruções detalhadas sobre onde clicar.

## Cenários de Teste de Usabilidade

| Nº do cenário | Descrição do cenário | Funcionalidades avaliadas |
|---|---|---|
| 1 | Você começou a utilizar o E-Finanças e deseja organizar sua vida financeira. Crie uma conta e acesse o sistema. | Cadastro, validação do formulário e acesso ao Dashboard. |
| 2 | Você recebeu seu pagamento mensal e depois realizou uma compra no supermercado. Registre a receita e a despesa e confirme como elas alteraram seu saldo. | Cadastro de transações, categorias, Dashboard e resumo financeiro. |
| 3 | Você quer entender melhor seus gastos. Encontre uma despesa de alimentação no histórico e consulte o relatório financeiro para identificar a categoria com maior gasto. | Busca, filtros, histórico de transações e relatórios. |
| 4 | Você pretende criar uma reserva de emergência. Cadastre uma meta de R$ 5.000,00, informe um valor inicial e depois adicione uma nova contribuição. | Cadastro de metas, atualização de valores e acompanhamento do progresso. |

## Registro dos Testes de Usabilidade

As tabelas abaixo devem ser preenchidas durante a realização dos testes. O tempo do especialista deve ser medido previamente por um integrante da equipe que conheça o sistema.

### Cenário 1 - Criar uma conta e acessar o sistema

| Participante | Taxa de sucesso | Satisfação subjetiva | Tempo de conclusão | Observações |
|---|---|---|---|---|
| 1 | A preencher | A preencher | A preencher | A preencher |
| 2 | A preencher | A preencher | A preencher | A preencher |
| 3 | A preencher | A preencher | A preencher | A preencher |
| 4 | A preencher | A preencher | A preencher | A preencher |
| **Média** | **A calcular** | **A calcular** | **A calcular** | - |
| **Especialista** | **A preencher** | - | **A preencher** | - |

### Cenário 2 - Registrar movimentações e conferir o saldo

| Participante | Taxa de sucesso | Satisfação subjetiva | Tempo de conclusão | Observações |
|---|---|---|---|---|
| 1 | A preencher | A preencher | A preencher | A preencher |
| 2 | A preencher | A preencher | A preencher | A preencher |
| 3 | A preencher | A preencher | A preencher | A preencher |
| 4 | A preencher | A preencher | A preencher | A preencher |
| **Média** | **A calcular** | **A calcular** | **A calcular** | - |
| **Especialista** | **A preencher** | - | **A preencher** | - |

### Cenário 3 - Localizar uma despesa e consultar o relatório

| Participante | Taxa de sucesso | Satisfação subjetiva | Tempo de conclusão | Observações |
|---|---|---|---|---|
| 1 | A preencher | A preencher | A preencher | A preencher |
| 2 | A preencher | A preencher | A preencher | A preencher |
| 3 | A preencher | A preencher | A preencher | A preencher |
| 4 | A preencher | A preencher | A preencher | A preencher |
| **Média** | **A calcular** | **A calcular** | **A calcular** | - |
| **Especialista** | **A preencher** | - | **A preencher** | - |

### Cenário 4 - Criar e atualizar uma meta financeira

| Participante | Taxa de sucesso | Satisfação subjetiva | Tempo de conclusão | Observações |
|---|---|---|---|---|
| 1 | A preencher | A preencher | A preencher | A preencher |
| 2 | A preencher | A preencher | A preencher | A preencher |
| 3 | A preencher | A preencher | A preencher | A preencher |
| 4 | A preencher | A preencher | A preencher | A preencher |
| **Média** | **A calcular** | **A calcular** | **A calcular** | - |
| **Especialista** | **A preencher** | - | **A preencher** | - |

## Avaliação dos Testes de Usabilidade

A avaliação dos testes de usabilidade deverá ser concluída após a participação dos usuários. A equipe deverá comparar a taxa de sucesso, a satisfação subjetiva e o tempo de conclusão de cada cenário, observando principalmente os pontos em que os participantes demonstraram dúvida, interromperam a tarefa ou precisaram procurar uma função por muito tempo.

Uma taxa de sucesso elevada indica que as funções principais podem ser encontradas e utilizadas pelos participantes. No entanto, mesmo quando uma tarefa é concluída, um tempo muito superior ao tempo do especialista ou uma baixa satisfação podem indicar problemas de clareza na interface. Por esse motivo, os comentários dos participantes devem ser analisados em conjunto com os resultados numéricos.

Ao final da análise, as oportunidades de melhoria deverão ser organizadas conforme sua frequência e impacto. Sugestões mencionadas por vários participantes ou dificuldades que impeçam a conclusão de um cenário devem receber prioridade. Entre os aspectos que merecem atenção estão a clareza dos botões, a identificação das categorias, a compreensão dos relatórios, a navegação entre as páginas e a apresentação das mensagens de validação.
