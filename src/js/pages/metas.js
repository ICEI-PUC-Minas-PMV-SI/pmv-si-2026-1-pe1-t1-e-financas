import { formatCurrency, formatCurrencyByCode, parseCurrency } from "../core/currency.js";
import { renderProfileUi } from "../core/profile-ui.js";
import { readJson, writeJson } from "../core/storage.js";

import { logout, requireUser } from "../auth/route-guard.js";
import { bindLogout } from "../core/profile-ui.js";
import { createUserStorage } from "../core/user-storage.js";

const activeUser = requireUser();

if (activeUser) {
    const userStorage = createUserStorage(localStorage, activeUser.id);
    bindLogout(() => logout());

document.addEventListener("DOMContentLoaded", () => {

    const btnNovaMeta = document.getElementById("btnNovaMeta");
    const listaMetas = document.getElementById("listaMetas");

    const modalMeta = document.getElementById("modalMeta");
    const modalAdicionar = document.getElementById("modalAdicionar");

    const salvarMetaBtn = document.getElementById("salvarMeta");
    const cancelarMetaBtn = document.getElementById("cancelarMeta");

    const cancelarAdicionarBtn = document.getElementById("cancelarAdicionar");
    const confirmarAdicionarBtn = document.getElementById("confirmarAdicionar");
    const valorAdicionarLabel = document.getElementById("valorAdicionarLabel");
    const valorAdicionarHint = document.getElementById("valorAdicionarHint");
    const valorAdicionarInput = document.getElementById("valorAdicionar");
    const valorConvertido = document.getElementById("valorConvertido");

    let metaSelecionada = null;
    let editMetaId = null;

    const currencyRates = {
        BRL: 1,
        USD: 5.2,
        EUR: 5.7,
        JPY: 0.038
    };

    let metas =
        readJson(userStorage, "metas", []) || [];

    function salvarMetas() {
        writeJson(userStorage, "metas", metas);
    }

    function convertToBRL(value, currency) {
        return Number(value) * (currencyRates[currency] ?? 1);
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
                meta.objetivo > 0
                    ? Math.min(
                        100,
                        Math.round((meta.guardado / meta.objetivo) * 100)
                    )
                    : 0;

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

                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="goal-card__percent">${percentual}%</span>

                        <button class="btn btn--secondary btn--icon editar" data-id="${meta.id}" aria-label="Editar meta">
                            <svg class="icon icon--pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" width="18" height="18">
                                <path d="M3 21v-3L17.5 3.5a2.1 2.1 0 013 3L6 21H3z"></path>
                                <path d="M14 7l3 3"></path>
                            </svg>
                        </button>
                    </div>
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
                            ${formatCurrencyByCode(
                                meta.guardadoOriginal ?? meta.guardado,
                                meta.moeda || "BRL"
                            )}
                        </strong>
                        guardados
                    </span>

                    <span>
                        <strong>
                            ${formatCurrencyByCode(
                                meta.objetivoOriginal ?? meta.objetivo,
                                meta.moeda || "BRL"
                            )}
                        </strong>
                        objetivo
                    </span>

                    <span>
                        <strong>
                            ${moeda(meta.objetivo - meta.guardado)}
                        </strong>
                        diferença para objetivo
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

                        const meta = metas.find(m => m.id === Number(btn.dataset.id));
                        const moedaMeta = meta?.moeda || "BRL";
                        const symbol = {
                            BRL: "R$",
                            USD: "US$",
                            EUR: "€",
                            JPY: "¥"
                        }[moedaMeta] || moedaMeta;

                        valorAdicionarLabel.textContent = `Valor (${symbol})`;
                        valorAdicionarHint.textContent = `O valor será convertido para reais (${formatCurrencyByCode(1, moedaMeta)} = ${moeda(convertToBRL(1, moedaMeta))}).`;
                        atualizarValorAdicionado();

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
        
        document
            .querySelectorAll(".editar")
            .forEach(btn => {
                btn.addEventListener("click", () => {
                    editMetaId = Number(btn.dataset.id);

                    const meta = metas.find(m => m.id === editMetaId);
                    if (!meta) return;

                    document.getElementById("metaNome").value = meta.nome || "";
                    document.getElementById("metaMoeda").value = meta.moeda || "BRL";
                    document.getElementById("metaObjetivo").value = (meta.objetivoOriginal ?? meta.objetivo) || "";
                    document.getElementById("metaGuardado").value = (meta.guardadoOriginal ?? 0) || 0;
                    document.getElementById("metaPrazo").value = meta.prazo || "";

                    // Ajusta título do modal e texto do botão
                    const titulo = modalMeta.querySelector("h2");
                    if (titulo) titulo.textContent = "Editar Meta";
                    salvarMetaBtn.textContent = "Salvar Alterações";

                    modalMeta.style.display = "flex";
                });
            });
            });
    }

    function atualizarValorAdicionado() {
        const valor = parseCurrency(valorAdicionarInput.value || "0");
        const meta = metas.find(m => m.id === metaSelecionada);
        const moedaMeta = meta?.moeda || "BRL";

        if (isNaN(valor) || !meta) {
            valorConvertido.textContent = "R$ 0,00 convertido";
            return;
        }

        const convertido = convertToBRL(valor, moedaMeta);
        valorConvertido.textContent = `${moeda(convertido)} convertido`;
    }

    valorAdicionarInput.addEventListener("input", atualizarValorAdicionado);

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

            const moedasMeta =
                document.getElementById(
                    "metaMoeda"
                ).value || "BRL";

            const objetivoOriginal =
                parseCurrency(
                    document.getElementById(
                        "metaObjetivo"
                    ).value
                );

            const guardadoOriginal =
                parseCurrency(
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
                !objetivoOriginal ||
                !prazo
            ) {
                alert(
                    "Preencha todos os campos."
                );
                return;
            }

            if (editMetaId) {
                const meta = metas.find(m => m.id === editMetaId);
                if (meta) {
                    meta.nome = nome;
                    meta.moeda = moedasMeta;
                    meta.objetivoOriginal = objetivoOriginal;
                    meta.objetivo = convertToBRL(objetivoOriginal, moedasMeta);
                    meta.guardadoOriginal = guardadoOriginal;
                    meta.guardado = convertToBRL(guardadoOriginal, moedasMeta);
                    meta.prazo = prazo;
                }
                editMetaId = null;
            } else {
                metas.push({
                    id: Date.now(),
                    nome,
                    moeda: moedasMeta,
                    objetivoOriginal,
                    objetivo: convertToBRL(
                        objetivoOriginal,
                        moedasMeta
                    ),
                    guardadoOriginal,
                    guardado: convertToBRL(
                        guardadoOriginal,
                        moedasMeta
                    ),
                    prazo
                });
            }

            salvarMetas();
            renderizarMetas();

            modalMeta.style.display = "none";

            // restaurar botão e título
            const titulo = modalMeta.querySelector("h2");
            if (titulo) titulo.textContent = "Nova Meta";
            salvarMetaBtn.textContent = "Salvar Meta";

            document.getElementById("metaNome").value = "";
            document.getElementById("metaObjetivo").value = "";
            document.getElementById("metaGuardado").value = "0";
            document.getElementById("metaPrazo").value = "";
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
                parseCurrency(
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

                const moedaMeta = meta.moeda || "BRL";
                const convertido = convertToBRL(valor, moedaMeta);

                meta.guardadoOriginal =
                    (meta.guardadoOriginal ?? meta.guardado) + valor;

                meta.guardado += convertido;

                salvarMetas();
                renderizarMetas();

                modalAdicionar.style.display =
                    "none";
            }
        }
    );

    renderizarMetas();


const perfil = readJson(userStorage, "perfilUsuario");
renderProfileUi(perfil);

});
}
