
# Projeto de Interface
A interface do sistema E-Finanças foi projetada com foco na simplicidade, usabilidade e acessibilidade, considerando principalmente o público-alvo composto por jovens adultos com baixa organização financeira.

O sistema possui uma estrutura clara e organizada, composta por menu lateral de navegação, barra superior e área principal de conteúdo, permitindo que o usuário acesse facilmente todas as funcionalidades.

As principais seções da aplicação incluem:

Dashboard
Transações
Relatórios
Metas
Perfil

A organização da interface foi definida com base nos requisitos funcionais, como cadastro de receitas e despesas (RF-03 e RF-04), visualização de saldo (RF-05) e relatórios (RF-09), além dos requisitos não funcionais, como usabilidade e simplicidade (RNF-02 e RNF-03).

## User Flow
O fluxo de usuário do sistema E-Finanças foi estruturado para garantir uma navegação simples e intuitiva, permitindo que o usuário realize suas principais ações com poucos passos.

Fluxo principal:
1. O usuário acessa o sistema
2. Realiza cadastro (RF-01) ou login (RF-02)
3. É redirecionado para o Dashboard

**A partir do Dashboard, o usuário pode:**
- Visualizar saldo e resumo financeiro (RF-05)
- Registrar receitas ou despesas (RF-03 e RF-04)
- Acessar lista de transações (RF-06)
- Filtrar, editar ou excluir registros (RF-07 e RF-10)
- Visualizar relatórios (RF-09)
- Definir metas financeiras (RF-11)

**Fluxos secundários:**
- Cadastro de transação = atualização automática do saldo
- Edição/exclusão = atualização dos dados
- Relatórios = análise de gastos
- Metas = acompanhamento de progresso

## Wireframes
A tela de login apresenta campos de e-mail e senha, além de botão de acesso e opção de cadastro.
Requisitos atendidos: RF-01, RF-02

**A tela principal apresenta:**

- Menu lateral com navegação
- Barra superior com informações do usuário
**Área central com:***
- Saldo atual
- Total de receitas e despesas
- Resumo financeiro

Requisitos atendidos: RF-05, RF-06

**Apresenta uma lista de receitas e despesas com:**

- Visualização de dados
- Filtros por período
- Opções de edição e exclusão

Requisitos atendidos: RF-06, RF-07, RF-10

**Contém um formulário com:**

- Tipo (receita ou despesa)
- Valor
- Categoria
- Data

Requisitos atendidos: RF-03, RF-04, RF-08

Permite ao usuário definir metas financeiras e acompanhar seu progresso.
Requisitos atendidos: RF-11
