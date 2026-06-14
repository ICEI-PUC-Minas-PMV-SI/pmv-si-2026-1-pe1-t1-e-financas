import { formatCurrency } from "../core/currency.js";
import { renderProfileUi } from "../core/profile-ui.js";
import { readJson, writeJson } from "../core/storage.js";

document.addEventListener("DOMContentLoaded", () => {

    const btnNovaMeta = document.getElementById("btnNovaMeta");
    const listaMetas = document.getElementById("listaMetas");

    const modalMeta = document.getElementById("modalMeta");
    const modalAdicionar = document.getElementById("modalAdicionar");

    const salvarMetaBtn = document.getElementById("salvarMeta");
    const cancelarMetaBtn = document.getElementById("cancelarMeta");

    const cancelarAdicionarBtn = document.getElementById("cancelarAdicionar");
    const confirmarAdicionarBtn = document.getElementById("confirmarAdicionar");

    let metaSelecionada = null;

    let metas =
        readJson(localStorage, "metas", []) || [];

    function salvarMetas() {
        writeJson(localStorage, "metas", metas);
    }

    const moeda = formatCurrency;

    function atualizarResumo() {

        const totalPlanejado =
            metas.reduce(
                (s, m) => s + m.objetivo,
                0
            );

        const totalGuardado =
            metas.reduce(
                (s, m) => s + m.guardado,
                0
            );

        const progresso =
            totalPlanejado > 0
            ? Math.round(
                (totalGuardado / totalPlanejado) * 100
            )
            : 0;

        const cards =
            document.querySelectorAll(
                ".summary-card__value"
            );

        if (cards.length >= 3) {

            cards[0].textContent =
                moeda(totalPlanejado);

            cards[1].textContent =
                moeda(totalGuardado);

            cards[2].textContent =
                progresso + "%";
        }
    }

    function renderizarMetas() {

        listaMetas.innerHTML = "";

        if (metas.length === 0) {

            listaMetas.innerHTML = `
                <div class="card" style="padding:30px;text-align:center;">
                    Nenhuma meta cadastrada.
                </div>
            `;

            atualizarResumo();
            return;
        }

        metas.forEach(meta => {

            const percentual =
                Math.min(
                    100,
                    Math.round(
                        (meta.guardado / meta.objetivo) * 100
                    )
                );

            const card =
                document.createElement("article");

            card.className =
                "card goal-card";

            card.innerHTML = `
                <div class="goal-card__header">
                    <div>
                        <p class="eyebrow">
                            Meta financeira
                        </p>
                        <h2>${meta.nome}</h2>
                    </div>

                    <span class="goal-card__percent">
                        ${percentual}%
                    </span>
                </div>

                <div class="progress-track">
                    <span
                        class="progress-track__bar"
                        style="width:${percentual}%">
                    </span>
                </div>

                <div class="goal-card__meta">

                    <span>
                        <strong>
                            ${moeda(meta.guardado)}
                        </strong>
                        guardados
                    </span>

                    <span>
                        <strong>
                            ${moeda(meta.objetivo)}
                        </strong>
                        objetivo
                    </span>

                    <span>
                        <strong>
                            ${new Date(meta.prazo)
                                .toLocaleDateString("pt-BR")}
                        </strong>
                        prazo
                    </span>

                </div>

                <div style="
                    display:flex;
                    gap:10px;
                    margin-top:20px;
                    flex-wrap:wrap;
                ">

                    <button
                        class="btn btn--primary adicionar"
                        data-id="${meta.id}">
                        Adicionar valor
                    </button>

                    <button
                        class="btn btn--secondary excluir"
                        data-id="${meta.id}">
                        Excluir
                    </button>

                </div>
            `;

            listaMetas.appendChild(card);
        });

        atualizarResumo();

        document
            .querySelectorAll(".adicionar")
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        metaSelecionada =
                            Number(
                                btn.dataset.id
                            );

                        document
                            .getElementById(
                                "valorAdicionar"
                            )
                            .value = "";

                        modalAdicionar.style.display =
                            "flex";
                    }
                );
            });

        document
            .querySelectorAll(".excluir")
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        if (
                            !confirm(
                                "Excluir esta meta?"
                            )
                        ) return;

                        metas =
                            metas.filter(
                                m =>
                                    m.id !==
                                    Number(
                                        btn.dataset.id
                                    )
                            );

                        salvarMetas();
                        renderizarMetas();
                    }
                );
            });
    }

    btnNovaMeta.addEventListener(
        "click",
        () => {
            modalMeta.style.display =
                "flex";
        }
    );

    cancelarMetaBtn.addEventListener(
        "click",
        () => {
            modalMeta.style.display =
                "none";
        }
    );

    salvarMetaBtn.addEventListener(
        "click",
        () => {

            const nome =
                document.getElementById(
                    "metaNome"
                ).value;

            const objetivo =
                parseFloat(
                    document.getElementById(
                        "metaObjetivo"
                    ).value
                );

            const guardado =
                parseFloat(
                    document.getElementById(
                        "metaGuardado"
                    ).value
                ) || 0;

            const prazo =
                document.getElementById(
                    "metaPrazo"
                ).value;

            if (
                !nome ||
                !objetivo ||
                !prazo
            ) {
                alert(
                    "Preencha todos os campos."
                );
                return;
            }

            metas.push({
                id: Date.now(),
                nome,
                objetivo,
                guardado,
                prazo
            });

            salvarMetas();
            renderizarMetas();

            modalMeta.style.display =
                "none";

            document.getElementById(
                "metaNome"
            ).value = "";

            document.getElementById(
                "metaObjetivo"
            ).value = "";

            document.getElementById(
                "metaGuardado"
            ).value = "0";

            document.getElementById(
                "metaPrazo"
            ).value = "";
        }
    );

    cancelarAdicionarBtn.addEventListener(
        "click",
        () => {
            modalAdicionar.style.display =
                "none";
        }
    );

    confirmarAdicionarBtn.addEventListener(
        "click",
        () => {

            const valor =
                parseFloat(
                    document.getElementById(
                        "valorAdicionar"
                    ).value
                );

            if (isNaN(valor))
                return;

            const meta =
                metas.find(
                    m =>
                        m.id ===
                        metaSelecionada
                );

            if (meta) {

                meta.guardado += valor;

                salvarMetas();
                renderizarMetas();

                modalAdicionar.style.display =
                    "none";
            }
        }
    );

    renderizarMetas();


const perfil = readJson(localStorage, "perfilUsuario");
renderProfileUi(perfil);

});
