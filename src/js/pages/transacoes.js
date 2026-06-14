import { formatCurrency } from "../core/currency.js";
import { renderProfileUi } from "../core/profile-ui.js";
import { readJson, writeJson } from "../core/storage.js";

document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("transaction-list");
    const busca = document.getElementById("buscar");
    const filtroTipo = document.getElementById("filtro-tipo");

    let transacoes =
        readJson(localStorage, "transacoes", []) || [];

    const moeda = formatCurrency;

    function formatarData(data) {

        const d = new Date(data);

        return d.toLocaleDateString("pt-BR");
    }

    function atualizarResumo() {

        let receitas = 0;
        let despesas = 0;

        transacoes.forEach(t => {

            const valor =
                parseFloat(t.valor.replace(",", "."));

            if (t.tipo === "receita") {
                receitas += valor;
            } else {
                despesas += valor;
            }
        });

        document.getElementById("total-receitas").textContent =
            moeda(receitas);

        document.getElementById("total-despesas").textContent =
            moeda(despesas);

        document.getElementById("saldo-total").textContent =
            moeda(receitas - despesas);

        document.getElementById("quantidade-transacoes").textContent =
            transacoes.length;
    }

    function renderizar() {

        lista.innerHTML = "";

        let filtroTexto =
            busca.value.toLowerCase();

        let tipoSelecionado =
            filtroTipo.value.toLowerCase();

        let dados = transacoes.filter(t => {

            let texto =
                `${t.categoria} ${t.descricao || ""}`.toLowerCase();

            let passouBusca =
                texto.includes(filtroTexto);

            let passouTipo =
                tipoSelecionado === "todas" ||
                (tipoSelecionado === "receitas" && t.tipo === "receita") ||
                (tipoSelecionado === "despesas" && t.tipo === "despesa");

            return passouBusca && passouTipo;
        });

        dados.sort((a,b) =>
            new Date(b.data) - new Date(a.data)
        );

        if(dados.length === 0){

            lista.innerHTML = `
                <div style="padding:30px;text-align:center;">
                    Nenhuma transação encontrada.
                </div>
            `;

            return;
        }

        dados.forEach(t => {

            const valor =
                parseFloat(t.valor.replace(",", "."));

            const artigo =
                document.createElement("article");

            artigo.className =
                "transaction-item";

            artigo.innerHTML = `
                <span class="transaction-indicator transaction-indicator--${t.tipo === "receita" ? "income" : "expense"}"></span>

                <div class="transaction-main">

                    <span class="category-icon">
                        ${t.categoria.substring(0,2).toUpperCase()}
                    </span>

                    <div>

                        <h3 class="transaction-title">
                            ${t.categoria}
                            ${t.descricao ? " · " + t.descricao : ""}
                        </h3>

                        <div class="transaction-meta">

                            <span>
                                ${t.tipo === "receita" ? "Receita" : "Despesa"}
                            </span>

                            <span>
                                ${formatarData(t.data)}
                            </span>

                        </div>

                    </div>

                </div>

                <div class="transaction-value">

                    <strong class="${
                        t.tipo === "receita"
                        ? "value-income"
                        : "value-expense"
                    }">

                    ${
                        t.tipo === "receita"
                        ? "+"
                        : "-"
                    }${moeda(valor)}

                    </strong>

                    <div class="row-actions">

                        <a
                            href="#"
                            class="action-link action-link--danger excluir"
                            data-id="${t.id}"
                        >
                            Excluir
                        </a>

                    </div>

                </div>
            `;

            lista.appendChild(artigo);
        });

        document
            .querySelectorAll(".excluir")
            .forEach(botao => {

                botao.addEventListener("click", e => {

                    e.preventDefault();

                    const id =
                        Number(botao.dataset.id);

                    if(confirm("Deseja excluir esta transação?")) {

                        transacoes =
                            transacoes.filter(
                                t => t.id !== id
                            );

                        writeJson(localStorage, "transacoes", transacoes);

                        atualizarResumo();
                        renderizar();
                    }
                });
            });
    }

    busca.addEventListener(
        "input",
        renderizar
    );

    filtroTipo.addEventListener(
        "change",
        renderizar
    );

    atualizarResumo();
    renderizar();


const perfil = readJson(localStorage, "perfilUsuario");
renderProfileUi(perfil);

});
