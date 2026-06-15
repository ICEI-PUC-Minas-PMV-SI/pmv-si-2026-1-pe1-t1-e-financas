# Testes do Sistema E-Finanças

## Introdução

Os testes do sistema E-Finanças foram planejados com o objetivo de verificar se as principais funcionalidades da aplicação atendem ao fluxo esperado pelo usuário. Como a solução foi desenvolvida para apoiar o controle de finanças pessoais, os testes priorizam tarefas essenciais, como criar uma conta, acessar o sistema, registrar movimentações, consultar o histórico financeiro, acompanhar relatórios e administrar metas.

Para os testes de software, foi adotada uma abordagem de caixa-preta. Nesse tipo de teste, a aplicação é avaliada a partir das ações realizadas na interface e dos resultados apresentados ao usuário, sem considerar os detalhes internos da implementação. Também foram definidos cenários de teste de usabilidade para avaliar se pessoas do público-alvo conseguem utilizar as principais funções com clareza e autonomia.

# Teste de Software

## Plano de Testes de Software

Os casos de teste apresentados a seguir devem ser executados em um navegador atualizado, com a aplicação iniciada conforme as instruções disponíveis no arquivo `src/README.md`. Para evitar interferência de informações cadastradas anteriormente, recomenda-se limpar os dados do site armazenados no navegador antes de iniciar a sequência de testes.

Os testes descritos neste documento foram executados na aplicação local, utilizando o navegador Chromium nas larguras de 390 px, 768 px e 1366 px. Foram utilizadas duas contas de teste para verificar a separação dos dados. Após a correção identificada durante os testes, o comando `npm test` também foi executado e aprovou os quatro testes automatizados de conversão monetária.

### CT01 - Criar uma conta

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de login.<br>2. Selecionar a opção para criar uma conta.<br>3. Informar nome, e-mail, senha com pelo menos oito caracteres e confirmação da senha.<br>4. Clicar em **Criar conta**. |
| **Requisitos associados** | RF-01 - Permitir o cadastro de usuário. |
| **Resultado esperado** | A conta é criada, a sessão do usuário é iniciada e o sistema redireciona para o Dashboard. |
| **Dados de entrada** | Nome: Ana Souza; e-mail: ana.souza@email.com; senha: `financas123`; confirmação: `financas123`. |
| **Resultado obtido** | **Sucesso.** A conta foi criada e o usuário foi direcionado para o Dashboard com a sessão iniciada. |

### CT02 - Impedir cadastro com dados inválidos

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de cadastro.<br>2. Preencher nome e e-mail.<br>3. Informar uma senha com menos de oito caracteres ou uma confirmação diferente da senha.<br>4. Clicar em **Criar conta**. |
| **Requisitos associados** | RF-01 - Permitir o cadastro de usuário. |
| **Resultado esperado** | O cadastro não é concluído e o sistema apresenta uma mensagem explicando o problema encontrado. |
| **Dados de entrada** | Nome: Ana Souza; e-mail: ana.souza@email.com; senha: `1234`; confirmação: `1235`. |
| **Resultado obtido** | **Sucesso.** O sistema recusou a senha curta com a mensagem “A senha deve ter pelo menos 8 caracteres.” e recusou senhas diferentes com a mensagem “As senhas não coincidem.”. |

### CT03 - Realizar login

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de login.<br>2. Informar o e-mail e a senha de uma conta cadastrada.<br>3. Clicar em **Entrar**. |
| **Requisitos associados** | RF-02 - Permitir que o usuário acesse sua conta. |
| **Resultado esperado** | O usuário é autenticado e direcionado para o Dashboard. |
| **Dados de entrada** | E-mail e senha válidos de uma conta cadastrada anteriormente. |
| **Resultado obtido** | **Sucesso.** O login com credenciais válidas direcionou o usuário para o Dashboard. |

### CT04 - Bloquear login com credenciais inválidas

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página de login.<br>2. Informar um e-mail não cadastrado ou uma senha incorreta.<br>3. Clicar em **Entrar**. |
| **Requisitos associados** | RF-02 - Permitir que o usuário acesse sua conta. |
| **Resultado esperado** | O acesso não é autorizado e a mensagem “E-mail ou senha inválidos.” é apresentada. |
| **Dados de entrada** | E-mail: usuario.inexistente@email.com; senha: `senhaIncorreta`. |
| **Resultado obtido** | **Sucesso.** O acesso foi bloqueado e a mensagem “E-mail ou senha inválidos.” foi apresentada. |

### CT05 - Registrar uma receita

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Realizar login.<br>2. Acessar a página **Nova transação**.<br>3. Selecionar o tipo **Receita**.<br>4. Informar valor, categoria, descrição e data.<br>5. Clicar em **Adicionar transação**.<br>6. Acessar a página **Transações**. |
| **Requisitos associados** | RF-03 - Registrar receitas; RF-05 - Exibir saldo e resumo financeiro; RF-06 - Listar transações; RF-08 - Categorizar transações. |
| **Resultado esperado** | A mensagem de sucesso é apresentada, a receita aparece no histórico e os totais financeiros são atualizados. |
| **Dados de entrada** | Tipo: Receita; valor: R$ 3.500,00; categoria: Salário; descrição: Pagamento mensal; data: data atual. |
| **Resultado obtido** | **Sucesso.** A receita de R$ 3.500,00 foi salva, apresentada no histórico e incluída no resumo financeiro. |

### CT06 - Registrar uma despesa

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Realizar login.<br>2. Acessar a página **Nova transação**.<br>3. Manter o tipo **Despesa** selecionado.<br>4. Informar valor, categoria, descrição e data.<br>5. Clicar em **Adicionar transação**.<br>6. Acessar o Dashboard. |
| **Requisitos associados** | RF-04 - Registrar despesas; RF-05 - Exibir saldo e resumo financeiro; RF-06 - Listar transações; RF-08 - Categorizar transações. |
| **Resultado esperado** | A despesa é salva, aparece entre as movimentações e seu valor é descontado do saldo apresentado. |
| **Dados de entrada** | Tipo: Despesa; valor: R$ 180,00; categoria: Alimentação; descrição: Compras do mês; data: data atual. |
| **Resultado obtido** | **Sucesso.** A despesa de R$ 180,00 foi salva e apresentada no histórico. A página de transações apresentou receitas de R$ 3.500,00, despesas de R$ 180,00 e saldo de R$ 3.320,00. |

### CT07 - Validar o cadastro de uma transação

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Nova transação**.<br>2. Informar um valor igual ou menor que zero.<br>3. Tentar adicionar a transação.<br>4. Repetir o teste com um valor válido, mas sem selecionar uma categoria. |
| **Requisitos associados** | RF-03 - Registrar receitas; RF-04 - Registrar despesas; RF-08 - Categorizar transações. |
| **Resultado esperado** | A transação não é salva. O sistema solicita um valor válido no primeiro teste e uma categoria no segundo. |
| **Dados de entrada** | Primeiro teste: valor R$ 0,00. Segundo teste: valor R$ 100,00 e categoria não selecionada. |
| **Resultado obtido** | **Sucesso com observação.** O valor igual a zero foi recusado com a mensagem “Informe um valor válido.”. A ausência de categoria também impediu o envio do formulário por meio da validação obrigatória do navegador. |

### CT08 - Buscar e filtrar transações

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Cadastrar pelo menos uma receita e uma despesa.<br>2. Acessar a página **Transações**.<br>3. Pesquisar pelo nome de uma categoria ou descrição.<br>4. Aplicar os filtros **Receitas** e **Despesas** separadamente. |
| **Requisitos associados** | RF-06 - Listar transações; RF-10 - Pesquisar e filtrar transações. |
| **Resultado esperado** | A lista apresenta somente as movimentações compatíveis com o texto pesquisado e com o tipo selecionado. |
| **Dados de entrada** | Busca: Alimentação; filtros: Receitas e Despesas. |
| **Resultado obtido** | **Sucesso.** A busca por “Alimentação” apresentou somente a despesa correspondente. Os filtros de receitas e despesas também exibiram apenas as movimentações do tipo selecionado. |

### CT09 - Excluir uma transação

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Transações**.<br>2. Clicar em **Excluir** em uma movimentação cadastrada.<br>3. Confirmar a exclusão.<br>4. Consultar novamente o resumo financeiro. |
| **Requisitos associados** | RF-05 - Exibir saldo e resumo financeiro; RF-07 - Excluir transações; RF-06 - Listar transações. |
| **Resultado esperado** | A movimentação é removida da lista e os valores do resumo financeiro são recalculados. |
| **Dados de entrada** | Uma transação cadastrada anteriormente. |
| **Resultado obtido** | **Sucesso.** A despesa foi removida após a confirmação. Em seguida, o Dashboard passou a apresentar saldo de R$ 3.500,00 e despesas de R$ 0,00. |

### CT10 - Consultar relatórios financeiros

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Cadastrar receitas e despesas em diferentes categorias.<br>2. Acessar a página **Relatórios**.<br>3. Comparar os totais exibidos com as movimentações cadastradas. |
| **Requisitos associados** | RF-09 - Apresentar relatórios financeiros. |
| **Resultado esperado** | O sistema apresenta totais de receitas, despesas, saldo projetado, taxa de economia, gráficos e informações sobre os gastos por categoria. |
| **Dados de entrada** | Receita de R$ 3.500,00 e despesas distribuídas entre Alimentação e Transporte. |
| **Resultado obtido** | **Sucesso após correção.** Na primeira execução, o relatório apresentou `R$ NaN` ao processar o valor `3500,00`. Após a correção da conversão monetária, o teste foi repetido e o sistema apresentou corretamente receitas de R$ 3.500,00, saldo projetado de R$ 3.500,00 e taxa de economia de 100%. |

### CT11 - Criar e atualizar uma meta financeira

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Metas**.<br>2. Clicar em **Adicionar meta**.<br>3. Informar nome, valor do objetivo, valor já guardado e prazo.<br>4. Salvar a meta.<br>5. Clicar em **Adicionar valor** e registrar uma nova contribuição. |
| **Requisitos associados** | RF-11 - Criar e acompanhar metas financeiras. |
| **Resultado esperado** | A meta é exibida em um card. Após a contribuição, o valor guardado, o percentual e a barra de progresso são atualizados. |
| **Dados de entrada** | Nome: Reserva de emergência; objetivo: R$ 5.000,00; guardado: R$ 500,00; contribuição adicional: R$ 250,00; prazo: data futura. |
| **Resultado obtido** | **Sucesso.**  Metas foram criadas corretamente. |

### CT12 - Atualizar os dados do perfil

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar a página **Perfil**.<br>2. Alterar nome, e-mail ou telefone.<br>3. Clicar em **Salvar alterações**.<br>4. Navegar para outra página do sistema. |
| **Requisitos associados** | RF-12 - Permitir a atualização dos dados do usuário. |
| **Resultado esperado** | O sistema confirma a atualização e passa a apresentar os novos dados do usuário na interface. |
| **Dados de entrada** | Nome: Ana Souza Lima; telefone: (31) 99999-0000. |
| **Resultado obtido** | **Sucesso.** O nome e o telefone foram atualizados. O sistema apresentou a mensagem “Dados salvos com sucesso” e o novo nome passou a ser exibido nas demais páginas. |

### CT13 - Verificar a separação dos dados entre usuários

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Criar a conta do usuário A e cadastrar uma transação.<br>2. Sair do sistema.<br>3. Criar ou acessar a conta do usuário B.<br>4. Abrir as páginas Dashboard, Transações e Metas. |
| **Requisitos associados** | RF-01 - Permitir o cadastro de usuário; RF-02 - Permitir o acesso à conta. |
| **Resultado esperado** | O usuário B não visualiza as transações, metas ou informações pessoais pertencentes ao usuário A. |
| **Dados de entrada** | Duas contas com e-mails diferentes. |
| **Resultado obtido** | **Sucesso.** A segunda conta iniciou com Dashboard zerado, histórico sem transações e nenhuma meta cadastrada. Os dados pertencentes à primeira conta não foram exibidos. |

### CT14 - Verificar a responsividade das telas principais

| Campo | Descrição |
|---|---|
| **Procedimento** | 1. Acessar as páginas Dashboard, Transações, Nova transação, Relatórios, Metas e Perfil.<br>2. Repetir a navegação em larguras de tela representativas de celular, tablet e computador.<br>3. Verificar menus, formulários, cards, gráficos e listas. |
| **Requisitos associados** | RNF-01 - A aplicação deve ser responsiva; RNF-02 - A interface deve ser simples e de fácil utilização; RNF-03 - A aplicação deve apresentar informações com clareza. |
| **Resultado esperado** | O conteúdo permanece legível e utilizável, sem sobreposição de elementos, cortes indevidos ou necessidade de rolagem horizontal. |
| **Dados de entrada** | Larguras sugeridas: 390 px, 768 px e 1366 px. |
| **Resultado obtido** | **Sucesso.** As seis telas principais foram verificadas nas larguras de 390 px, 768 px e 1366 px. Não foi identificada rolagem horizontal ou sobreposição de conteúdo. A inspeção visual das telas Dashboard e Transações em celular também confirmou a adaptação dos elementos. |

## Avaliação dos Testes de Software

Os quatorze casos planejados foram concluídos com sucesso. Os fluxos de cadastro, login, registro de movimentações, busca, filtros, exclusão, relatórios, metas, atualização do perfil, separação entre usuários e responsividade funcionaram conforme o esperado.

Durante a primeira execução do teste de relatórios, foi encontrada uma falha na conversão de valores que utilizavam vírgula como separador decimal. Essa falha fazia com que receitas e saldo projetado fossem apresentados como `R$ NaN`. O problema foi corrigido por meio da padronização da conversão monetária e o caso de teste foi executado novamente com sucesso.

# Testes de Usabilidade

## Objetivo e método

Os testes de usabilidade têm como objetivo avaliar se o público-alvo consegue utilizar o E-Finanças sem precisar de orientação constante. Para isso, os participantes devem realizar tarefas comuns de organização financeira enquanto um integrante da equipe observa dificuldades, dúvidas e caminhos percorridos.

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

Nesta rodada foi realizada uma inspeção técnica dos cenários de usabilidade por um integrante com conhecimento do sistema. A etapa com quatro participantes do público-alvo ainda não foi realizada. Por esse motivo, não foram atribuídas notas de satisfação nem tempos médios, pois esses dados não devem ser simulados.

| Cenário | Resultado da inspeção técnica | Observações |
|---|---|---|
| 1 - Criar uma conta e acessar o sistema | Concluído com sucesso | Os campos são identificados com clareza, as validações apresentam mensagens objetivas e o redirecionamento para o Dashboard ocorre após o cadastro. |
| 2 - Registrar movimentações e conferir o saldo | Concluído com sucesso | O formulário diferencia receita e despesa, apresenta uma prévia da movimentação e confirma o cadastro. O histórico exibe os totais corretamente. |
| 3 - Localizar uma despesa e consultar o relatório | Concluído com sucesso após correção | A busca e os filtros funcionaram. Após a correção da conversão monetária, o relatório passou a apresentar corretamente receitas, despesas, saldo projetado e taxa de economia. |
| 4 - Criar e atualizar uma meta financeira | Concluído com sucesso | A meta foi criada corretamente e passou a ser apresentada na área de acompanhamento. |

## Avaliação dos Testes de Usabilidade

A inspeção técnica indicou que a navegação principal é clara e que as telas se adaptam adequadamente a computadores, tablets e celulares. Os botões de ação possuem destaque visual, os formulários apresentam rótulos compreensíveis e as mensagens de autenticação orientam o usuário quando ocorre algum erro.

Durante a inspeção inicial, o relatório financeiro apresentou valores inválidos, o que prejudicava a compreensão das movimentações. Após a correção e a repetição do cenário, os indicadores passaram a ser apresentados corretamente. Com isso, não foram identificados problemas técnicos que impeçam a realização dos quatro cenários propostos.

Para concluir a avaliação de usabilidade conforme o método planejado, a equipe ainda deverá convidar quatro pessoas do público-alvo, aplicar os quatro cenários e registrar taxa de sucesso, satisfação, tempo e comentários. Essa etapa é necessária porque uma inspeção feita por quem conhece o sistema não substitui a experiência de usuários que estão acessando a aplicação pela primeira vez.
