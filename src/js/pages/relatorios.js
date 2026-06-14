import { formatCurrency } from "../core/currency.js";
import { renderProfileUi } from "../core/profile-ui.js";
import { readJson } from "../core/storage.js";

document.addEventListener(
"DOMContentLoaded",
() => {

    const transacoes =
        readJson(localStorage, "transacoes", []) || [];

    let receitas = 0;
    let despesas = 0;

    const categorias = {};

    transacoes.forEach(t => {

        const valor =
            Number(t.valor);

        if(t.tipo === "receita"){

            receitas += valor;

        }else{

            despesas += valor;

            categorias[t.categoria] =
                (categorias[t.categoria] || 0)
                + valor;
        }
    });

    const saldo =
        receitas - despesas;

    const economia =
        receitas > 0
        ? Math.round(
            (saldo / receitas) * 100
        )
        : 0;

    document.getElementById(
        "receitasTotal"
    ).textContent =
        formatCurrency(receitas);

    document.getElementById(
        "despesasTotal"
    ).textContent =
        formatCurrency(despesas);

    document.getElementById(
        "saldoProjetado"
    ).textContent =
        formatCurrency(saldo);

    document.getElementById(
        "economiaPercentual"
    ).textContent =
        economia + "%";

    new Chart(
        document.getElementById(
            "graficoFluxo"
        ),
        {
            type: "bar",

            data: {

                labels: [
                    "Receitas",
                    "Despesas"
                ],

                datasets: [{

                    label:
                        "Valores",

                    data: [
                        receitas,
                        despesas
                    ],

                    backgroundColor: [
                        "#22c55e",
                        "#ef4444"
                    ]
                }]
            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        display:false
                    }
                }
            }
        }
    );

    new Chart(
        document.getElementById(
            "graficoCategorias"
        ),
        {
            type: "doughnut",

            data: {

                labels:
                    Object.keys(
                        categorias
                    ),

                datasets:[{

                    data:
                        Object.values(
                            categorias
                        )
                }]
            },

            options:{
                responsive:true
            }
        }
    );

    const listaCategorias =
        document.getElementById(
            "listaCategorias"
        );

    listaCategorias.innerHTML = "";

    const totalCategorias =
        Object.values(categorias)
        .reduce(
            (a,b) => a + b,
            0
        );

    Object.entries(categorias)
    .forEach(([nome, valor]) => {

        const percentual =
            totalCategorias > 0
            ? Math.round(
                (valor /
                totalCategorias) * 100
            )
            : 0;

        listaCategorias.innerHTML += `
            <span>
                <strong>
                    ${percentual}%
                </strong>
                ${nome}
            </span>
        `;
    });

    const listaInsights =
        document.getElementById(
            "listaInsights"
        );

    listaInsights.innerHTML = "";

    let maiorCategoria = "";
    let maiorValor = 0;

    Object.entries(categorias)
    .forEach(([nome, valor]) => {

        if(valor > maiorValor){

            maiorValor = valor;
            maiorCategoria = nome;
        }
    });

    if(maiorCategoria){

        listaInsights.innerHTML += `
            <li>
                A categoria
                <strong>
                    ${maiorCategoria}
                </strong>
                representa o maior gasto
                do período.
            </li>
        `;
    }

    if(saldo > 0){

        listaInsights.innerHTML += `
            <li>
                Você economizou
                <strong>
                    ${
                        formatCurrency(saldo)
                    }
                </strong>
                neste período.
            </li>
        `;

    }else{

        listaInsights.innerHTML += `
            <li>
                As despesas superaram
                as receitas neste período.
            </li>
        `;
    }

    listaInsights.innerHTML += `
        <li>
            Sua taxa de economia foi de
            <strong>
                ${economia}%
            </strong>.
        </li>
    `;

    const perfil = readJson(localStorage, "perfilUsuario");
renderProfileUi(perfil);

});
