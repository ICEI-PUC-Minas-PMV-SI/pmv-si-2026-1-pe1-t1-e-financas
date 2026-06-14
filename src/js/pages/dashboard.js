import { formatCurrency } from "../core/currency.js";
import { renderProfileUi } from "../core/profile-ui.js";
import { readJson } from "../core/storage.js";

import { logout, requireUser } from "../auth/route-guard.js";
import { bindLogout } from "../core/profile-ui.js";
import { createUserStorage } from "../core/user-storage.js";

const activeUser = requireUser();

if (activeUser) {
    const userStorage = createUserStorage(localStorage, activeUser.id);
    bindLogout(() => logout());

document.addEventListener("DOMContentLoaded", () => {

    const transacoes =
        readJson(userStorage, "transacoes", []) || [];

    const moeda = formatCurrency;

    let receitas = 0;
    let despesas = 0;

    transacoes.forEach(t => {

        const valor =
            parseFloat(
                String(t.valor)
                .replace(".", "")
                .replace(",", ".")
            );

        if (t.tipo === "receita") {
            receitas += valor;
        } else {
            despesas += valor;
        }
    });

    const saldo = receitas - despesas;

    const saldoEl =
        document.getElementById("saldo");

    const receitasEl =
        document.getElementById("receitas");

    const despesasEl =
        document.getElementById("despesas");

    if (saldoEl)
        saldoEl.textContent = moeda(saldo);

    if (receitasEl)
        receitasEl.textContent = moeda(receitas);

    if (despesasEl)
        despesasEl.textContent = moeda(despesas);

    const lista =
        document.getElementById(
            "ultimas-transacoes"
        );

    if (!lista) return;

    if (transacoes.length === 0) {

        lista.innerHTML = `
            <div style="
                padding:20px;
                text-align:center;
            ">
                Nenhuma movimentação cadastrada.
            </div>
        `;

    } else {

    const recentes =
        [...transacoes]
        .sort(
            (a,b) =>
            new Date(b.data) -
            new Date(a.data)
        )
        .slice(0,5);

    lista.innerHTML = "";

    recentes.forEach(t => {

        const valor =
            parseFloat(
                String(t.valor)
                .replace(".", "")
                .replace(",", ".")
            );

        const item =
            document.createElement("article");

        item.className =
            "transaction-item transaction-item--compact";

        item.innerHTML = `
            <span
                class="transaction-indicator transaction-indicator--${
                    t.tipo === "receita"
                    ? "income"
                    : "expense"
                }">
            </span>

            <div class="transaction-main">

                <span class="category-icon">
                    ${t.categoria.substring(0,2).toUpperCase()}
                </span>

                <div>

                    <h3 class="transaction-title">
                        ${t.categoria}
                        ${
                            t.descricao
                            ? " · " + t.descricao
                            : ""
                        }
                    </h3>

                    <div class="transaction-meta">

                        <span>
                            ${
                                new Date(t.data)
                                .toLocaleDateString("pt-BR")
                            }
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
                    }

                    ${moeda(valor)}

                </strong>

            </div>
        `;

        lista.appendChild(item);
    });
    }


    const perfil = readJson(userStorage, "perfilUsuario");
    renderProfileUi(perfil);

const ctxDashboard =
    document.getElementById(
        "graficoDashboard"
    );

if(ctxDashboard){

    new Chart(
        ctxDashboard,
        {
            type: "bar",

            data: {

                labels: [
                    "Receitas",
                    "Despesas",
                    "Saldo"
                ],

                datasets: [{
                    label: "Valores",

                    data: [
                        receitas,
                        despesas,
                        saldo
                    ],

                    backgroundColor: [
                        "#22c55e",
                        "#ef4444",
                        "#3b82f6"
                    ]
                }]
            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        display: false
                    }
                },

                scales: {

                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}

const metas =
    readJson(userStorage, "metas", []) || [];

const totalMetas =
    document.getElementById(
        "totalMetas"
    );

const progressoMetas =
    document.getElementById(
        "progressoMetas"
    );

const metasPrioritarias =
    document.getElementById(
        "metasPrioritarias"
    );

const proximasAcoes =
    document.getElementById(
        "proximasAcoes"
    );

if(metas.length > 0){

    let somaPercentuais = 0;

    metas.forEach(meta => {

        somaPercentuais +=
            Math.round(
                (meta.guardado /
                meta.objetivo) * 100
            );
    });

    const media =
        Math.round(
            somaPercentuais /
            metas.length
        );

    totalMetas.textContent =
        metas.length + " ativas";

    progressoMetas.textContent =
        media +
        "% de progresso médio";

}else{

    totalMetas.textContent =
        "0 ativas";

    progressoMetas.textContent =
        "Nenhuma meta cadastrada";
}

metasPrioritarias.innerHTML = "";

const topMetas =
    [...metas]
    .sort((a,b) => {

        const pa =
            (a.guardado /
            a.objetivo);

        const pb =
            (b.guardado /
            b.objetivo);

        return pb - pa;
    })
    .slice(0,3);

if(topMetas.length === 0){

    metasPrioritarias.innerHTML = `
        <p>Nenhuma meta cadastrada.</p>
    `;

}else{

    topMetas.forEach(meta => {

        const percentual =
            Math.min(
                100,
                Math.round(
                    (meta.guardado /
                    meta.objetivo) * 100
                )
            );

        metasPrioritarias.innerHTML += `
            <article class="goal-mini">

                <div class="goal-mini__header">
                    <strong>
                        ${meta.nome}
                    </strong>

                    <span>
                        ${percentual}%
                    </span>
                </div>

                <div class="progress-track">
                    <span
                        class="progress-track__bar"
                        style="
                        width:${percentual}%">
                    </span>
                </div>

            </article>
        `;
    });
}

proximasAcoes.innerHTML = "";

if(metas.length === 0){

    proximasAcoes.innerHTML = `
        <li>
            Cadastre sua primeira meta financeira.
        </li>
        <li>
            Registre transações para gerar análises.
        </li>
    `;

}else{

    const metaMaisProxima =
        [...metas]
        .sort(
            (a,b) =>
            (a.objetivo-a.guardado)
            -
            (b.objetivo-b.guardado)
        )[0];

    const falta =
        metaMaisProxima.objetivo
        -
        metaMaisProxima.guardado;

    proximasAcoes.innerHTML += `
        <li>
            Faltam
            <strong>
                ${falta.toLocaleString(
                    "pt-BR",
                    {
                        style:"currency",
                        currency:"BRL"
                    }
                )}
            </strong>
            para concluir
            ${metaMaisProxima.nome}.
        </li>
    `;

    if(saldo > 0){

        proximasAcoes.innerHTML += `
            <li>
                Considere investir parte do saldo atual em suas metas.
            </li>
        `;
    }

    proximasAcoes.innerHTML += `
        <li>
            Continue registrando movimentações para manter os relatórios atualizados.
        </li>
    `;
}

});
}
