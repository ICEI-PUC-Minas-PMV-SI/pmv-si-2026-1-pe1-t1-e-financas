# Guia de Estilos — Template Padrão do Site
 
> Documento de identidade visual, layout, tipografia, cores e iconografia do projeto.  
> Elaborado conforme as diretrizes do template padrão definidas no repositório do projeto.
 
---
 
## 1. Design
 
### 1.1 Layout Geral
 
O site adota um layout estruturado em coluna única com fundo cinza suave (**light theme**), organizando o conteúdo em cards brancos empilhados verticalmente. A composição de cada página segue uma hierarquia clara: cabeçalho com ícone de menu e título da tela, seguido do corpo de conteúdo com cards e listas, sem rodapé fixo visível.
 
### 1.2 Posicionamento do Logo
 
O logo do sistema é posicionado no **canto superior esquerdo** do cabeçalho (header), conforme observado na Página 1 do layout. Ele permanece fixo durante a navegação, funcionando também como link de retorno à página inicial.
 
### 1.3 Menus
 
- **Menu principal (navbar):** localizado no cabeçalho, alinhado à direita ou centralizado em relação ao logo. Contém os links de navegação primária entre as seções do site.
- **Menu mobile (hamburguer):** em telas menores, o menu é recolhido em um ícone de três linhas (☰), expandindo-se como menu dropdown ou drawer lateral ao ser acionado.
- **Menu de rodapé:** links secundários e informativos (como "Sobre", "Contato", "Política de Privacidade") são repetidos no footer para facilitar a navegação.
### 1.4 Estrutura das Páginas
 
| Página | Descrição |
|--------|-----------|
| Página 1 — Dashboard | Tela principal com card de saldo em gradiente azul, resumo em 4 cards, lista de transações recentes, gráfico de rosca por categoria e gráfico de barras mensais |
| Página 2 — Transações | Lista completa de movimentações com barra de busca, filtro por tipo e itens com ícone, categoria, descrição, data e valor colorido |
| Página 3 — Metas Financeiras | Cards de objetivos de poupança com barra de progresso colorida, percentual concluído e botão de adição de valor |
| Página 4 — Nova Transação | Formulário de cadastro de transação com toggle Despesa/Receita, campos de valor, categoria, descrição e data, e botão de submissão vermelho |
 
### 1.5 Responsividade
 
O layout é responsivo e se adapta aos seguintes breakpoints:
 
```css
/* Mobile */
@media (max-width: 480px) { ... }
 
/* Tablet */
@media (max-width: 768px) { ... }
 
/* Desktop */
@media (min-width: 1024px) { ... }
```
 
Em mobile, elementos em colunas são reorganizados em pilha vertical. O menu colapsa para o formato hamburguer e imagens são redimensionadas proporcionalmente.
 
---
 
## 2. Cores
 
A paleta de cores foi definida com base no estilo visual observado nas páginas do projeto. O sistema adota um **tema claro (light theme)**, com fundo cinza suave, cards brancos e acentos em azul, vermelho e verde para comunicar estado financeiro e ações.
 
### 2.1 Paleta Principal
 
| Função | Nome | Hex | Descrição |
|--------|------|-----|-----------|
| Fundo da aplicação | Page Background | `#F4F5F7` | Cinza claro usado como fundo geral de todas as páginas |
| Fundo de cards e formulários | Card Background | `#FFFFFF` | Branco puro para cards, listas e formulários |
| Cor de destaque primária (ação) | Primary Blue | `#4A6CF7` | Azul usado em botões de CTA, links e card de saldo |
| Cor de gradiente do card hero | Gradient End | `#7B5EA7` | Roxo que compõe o gradiente do card de saldo atual |
| Cor de receita / positivo | Income Green | `#38A169` | Verde para valores positivos e barras de receita |
| Cor de despesa / negativo | Expense Red | `#E53E3E` | Vermelho para valores negativos, botão de despesa e barras de gasto |
| Cor de progresso intermediário | Warning Orange | `#ED8936` | Laranja para metas com progresso intermediário |
| Texto principal | Dark Text | `#1A202C` | Preto/cinza escuro para títulos e valores em destaque |
| Texto secundário | Muted Text | `#718096` | Cinza médio para subtítulos, datas e labels |
| Bordas e divisores | Border | `#E2E8F0` | Cinza claro para separar itens e delimitar cards |
 
### 2.2 Estilos CSS — Cores
 
```css
:root {
  --color-bg-page: #F4F5F7;
  --color-bg-card: #FFFFFF;
  --color-primary: #4A6CF7;
  --color-gradient-end: #7B5EA7;
  --color-income: #38A169;
  --color-expense: #E53E3E;
  --color-warning: #ED8936;
  --color-text-primary: #1A202C;
  --color-text-secondary: #718096;
  --color-border: #E2E8F0;
}
 
body {
  background-color: var(--color-bg-page);
  color: var(--color-text-primary);
}
 
.card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
 
.card-hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-gradient-end));
  color: #FFFFFF;
}
 
.btn-primary {
  background-color: var(--color-primary);
  color: #FFFFFF;
}
 
.value-income { color: var(--color-income); }
.value-expense { color: var(--color-expense); }
.text-muted { color: var(--color-text-secondary); }
```
 
---
 
## 3. Tipografia
 
### 3.1 Famílias de Fontes
 
O projeto utiliza fontes modernas com boa legibilidade em telas, preferencialmente carregadas via Google Fonts.
 
| Fonte | Tipo | Uso |
|-------|------|-----|
| **Inter** | Sans-serif | Fonte principal do sistema — corpo de texto, labels, navegação e valores monetários |
| **Poppins** | Sans-serif | Títulos de página e seções de destaque |
 
### 3.2 Hierarquia Tipográfica
 
| Função | Fonte | Tamanho | Peso | Cor |
|--------|-------|---------|------|-----|
| Título de Página (H1) | Poppins ou Inter | 24px – 28px | Bold (700) | `#1A202C` |
| Título de Seção (H2) | Inter | 16px – 18px | SemiBold (600) | `#1A202C` |
| Valores monetários em destaque | Inter | 28px – 36px | Bold (700) | `#1A202C` ou branco (no card hero) |
| Rótulos de Componentes / Labels | Inter | 12px – 13px | Medium (500) | `#718096` |
| Corpo de Texto / Descrições | Inter | 13px – 14px | Regular (400) | `#718096` |
| Texto de Botão | Inter | 14px – 15px | SemiBold (600) | `#FFFFFF` |
| Valores positivos (receita) | Inter | 14px – 16px | SemiBold (600) | `#38A169` |
| Valores negativos (despesa) | Inter | 14px – 16px | SemiBold (600) | `#E53E3E` |
 
### 3.3 Estilos CSS — Tipografia
 
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
 
:root {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
 
body {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-primary);
}
 
h1 {
  font-family: var(--font-body);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-text-primary);
}
 
h2 {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text-primary);
}
 
.value-large {
  font-size: 32px;
  font-weight: 700;
}
 
.label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
}
 
p, .description {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-secondary);
}
```
 
---
 
## 4. Iconografia
 
### 4.1 Biblioteca de Ícones
 
O projeto utiliza **emojis nativos** como ícones de categoria de transações e metas — uma abordagem leve que dispensa bibliotecas externas e garante consistência visual em qualquer plataforma. Para ícones de interface (menu, setas), são utilizados **ícones SVG simples** ou caracteres Unicode.
 
### 4.2 Ícones e Suas Funções
 
| Ícone | Função | Contexto de Uso |
|-------|--------|-----------------|
| ☰ (hamburguer) | Abrir menu de navegação | Canto superior esquerdo de todas as páginas |
| 🎓 / 📚 | Categoria Educação | Lista de transações e resumo do dashboard |
| 🎮 / 🎬 | Categoria Lazer | Lista de transações |
| 💻 | Categoria Freelance / Trabalho | Lista de transações |
| 💊 / 🏥 | Categoria Saúde | Lista de transações |
| 🛒 / 🧺 | Categoria Alimentação | Lista de transações e gráfico de categorias |
| 🚌 / 🚗 | Categoria Transporte | Lista de transações |
| 💰 | Categoria Salário / Renda | Lista de transações |
| 💡 | Categoria Contas (luz, internet) | Lista de transações |
| 🏠 | Categoria Moradia / Aluguel | Lista de transações |
| 📈 | Categoria Investimentos | Lista de transações |
| 🛍️ | Categoria Compras | Lista de transações |
| 🏖️ | Meta: Viagem para a praia | Card de metas financeiras |
| 💻 | Meta: Notebook novo | Card de metas financeiras |
| 🎯 | Meta: Reserva de emergência | Card de metas financeiras |
| ↙ / ↗ | Indicador Despesa / Receita | Toggle da página de Nova Transação |
 
### 4.3 Estilos CSS — Iconografia
 
```css
/* Ícone emoji de categoria */
.category-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--color-bg-page);
}
 
/* Barra indicadora de tipo na lista de transações */
.transaction-indicator {
  width: 4px;
  border-radius: 2px;
  align-self: stretch;
}
.transaction-indicator.expense { background-color: var(--color-expense); }
.transaction-indicator.income  { background-color: var(--color-income); }
 
/* Ícone hamburguer no header */
.menu-icon {
  font-size: 22px;
  color: var(--color-text-primary);
  cursor: pointer;
}
```
 
---
 
## 5. Descrição Visual por Página
 
### Página 1 — Dashboard
 
A página de Dashboard é a tela principal do sistema de controle financeiro. Seu layout segue uma estrutura de coluna única com fundo cinza claro (`#F4F5F7`), organizando as informações em blocos empilhados verticalmente.
 
**Cabeçalho da página:** No topo, à esquerda, está posicionado o ícone de menu hamburguer (☰), seguido do título "Dashboard" em negrito e do subtítulo "Visão geral das suas finanças" em texto secundário cinza. Esse padrão de cabeçalho — ícone + título + subtítulo — é repetido em todas as páginas do sistema, funcionando como o elemento de identidade de cada tela.
 
**Card de saldo atual:** Logo abaixo do cabeçalho, há um card de destaque com gradiente azul-roxo (`#4A6CF7` → `#7B5EA7`), ocupando toda a largura disponível. Ele exibe o rótulo "Saldo Atual" acompanhado de um indicador de ponto azul claro, o valor principal "R$ 5.195,10" em tipografia grande e branca, e dois sub-cards internos com fundo semitransparente mostrando "Receitas: R$ 8.050,00" e "Despesas: R$ 2.854,90" lado a lado.
 
**Cards de resumo:** Na sequência, dois pares de cards brancos dispostos em grid 2×2 apresentam os indicadores do mês: "Receitas do mês" (R$ 8.050,00), "Despesas do mês" (R$ 2.854,90), "Economia" (R$ 5.195,10) e "Transações" (13). Cada card possui um ícone ilustrativo no canto superior esquerdo, rótulo em texto cinza pequeno e valor em tipografia maior e preta/colorida.
 
**Seção de transações recentes e gráfico de rosca:** Esta seção divide o espaço em duas colunas. À esquerda, uma lista das 5 transações mais recentes, cada uma com ícone de categoria, nome da transação, data e valor (em vermelho para despesas, verde para receitas) e um link "Ver todas ›" em azul no cabeçalho. À direita, um gráfico de rosca colorido exibe a distribuição de despesas por categoria (Alimentação, Moradia, Compras, Contas, Educação, Transporte, Lazer, Saúde), com legenda de cores abaixo.
 
**Gráfico de visão mensal:** Na base da página, um gráfico de barras verticais duplas (verde para Receitas, vermelho para Despesas) compara os últimos 6 meses (nov a abr), com eixo Y em valores monetários e legenda na parte inferior.
 
---
 
### Página 2 — Transações
 
A página de Transações exibe o histórico completo de movimentações financeiras do usuário em uma lista vertical.
 
**Cabeçalho da página:** Segue o mesmo padrão da página anterior: ícone hamburguer no topo, título "Transações" em bold e subtítulo "Todas as suas movimentações" em cinza.
 
**Barra de busca e filtro:** Abaixo do cabeçalho, há uma barra de busca com placeholder "Buscar transação..." ocupando a maior parte da largura, e um botão "Todas" à direita com bordas arredondadas, que provavelmente serve como filtro por tipo de transação (todas, receitas ou despesas).
 
**Lista de transações:** O corpo da página é composto por uma lista de itens, cada um dentro de um card branco com bordas arredondadas e leve sombra. Cada item apresenta: uma barra colorida vertical à esquerda (vermelha para despesas, verde para receitas) indicando o tipo da transação; um ícone emoji representativo da categoria; o nome da categoria em negrito; a descrição e data em texto cinza menor abaixo; e o valor alinhado à direita, em vermelho (despesas com prefixo `-R$`) ou verde (receitas com prefixo `+R$`). As categorias exibidas incluem Educação, Lazer, Freelance, Saúde, Alimentação, Transporte, Salário, Contas, Moradia, Investimentos e Compras.
 
---
 
### Página 3 — Metas Financeiras
 
A página de Metas Financeiras permite ao usuário acompanhar o progresso de objetivos de poupança.
 
**Cabeçalho da página:** Mantém o padrão das demais telas: ícone hamburguer, título "Metas financeiras" e subtítulo "Acompanhe seus objetivos". À direita do cabeçalho, há um botão de ação primária "+ Nova meta" com fundo azul (`#4A6CF7`) e texto branco, com bordas arredondadas.
 
**Cards de metas:** As metas são exibidas em grid de 2 colunas (com possibilidade de expansão). Cada card é branco com bordas arredondadas e sombra suave, contendo: um ícone emoji da meta no canto superior esquerdo; o nome da meta em negrito; a data limite em texto cinza pequeno; a linha de valores com o valor atual em negrito colorido (azul, laranja ou verde conforme o percentual) e o valor alvo em cinza à direita; uma barra de progresso horizontal colorida (verde para metas próximas, laranja para intermediárias, azul para iniciais); o texto de percentual concluído abaixo da barra; e um botão "＋ Adicionar valor" com borda cinza e texto escuro centralizado. As metas exibidas são: "Viagem para a praia" (40% concluído, barra verde), "Notebook novo" (56% concluído, barra laranja) e "Reserva de emergência" (45% concluído, barra azul).
 
---
 
### Página 4 — Nova Transação
 
A página de Nova Transação é um formulário simples para registro de receitas e despesas.
 
**Cabeçalho da página:** Segue o padrão: ícone hamburguer, título "Nova transação" e subtítulo "Registre uma receita ou despesa".
 
**Formulário:** O formulário está contido em um card branco centralizado, com título interno "Nova transação" em negrito. Os campos são organizados verticalmente com labels acima de cada input:
 
- **Tipo:** Toggle segmentado com duas opções — "↙ Despesa" (ativo, com fundo rosado e texto vermelho) e "↗ Receita" (inativo, fundo branco). O estado ativo é claramente diferenciado por cor de fundo e tipografia colorida.
- **Valor (R$):** Campo de texto numérico com valor inicial "0,00", bordas arredondadas e fundo branco.
- **Categoria:** Campo de texto com placeholder "Escolha uma categoria", provavelmente vinculado a um seletor ou dropdown.
- **Descrição (opcional):** Campo de texto livre com placeholder "Ex: Almoço no restaurante".
- **Data:** Campo de data nativo do browser, exibindo "17/04/2026" como valor padrão, com ícone de calendário à direita.
**Botão de submissão:** Na base do formulário, o botão "Adicionar transação" ocupa toda a largura do card, com fundo vermelho/coral forte (`#E53E3E`), texto branco centralizado em bold e bordas arredondadas. A cor vermelha reforça visualmente o contexto de despesa selecionado no toggle acima.
