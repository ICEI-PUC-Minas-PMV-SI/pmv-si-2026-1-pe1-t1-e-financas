import { readJson, writeJson } from "../core/storage.js";

import { logout, requireUser } from "../auth/route-guard.js";
import { bindLogout } from "../core/profile-ui.js";
import { createUserStorage } from "../core/user-storage.js";

const activeUser = requireUser();

if (activeUser) {
    const userStorage = createUserStorage(localStorage, activeUser.id);
    bindLogout(() => logout());

document.addEventListener("DOMContentLoaded", () => {

    const valorInput = document.getElementById("valor");
    const categoriaSelect = document.getElementById("categoria");
    const novaCategoriaInput = document.getElementById("novaCategoria");
    const btnAddCategoria = document.getElementById("btnAddCategoria");
    const descricaoInput = document.getElementById("descricao");
    const dataInput = document.getElementById("data");

    const tipoRadios = document.querySelectorAll('input[name="tipo"]');

    const previewAmount = document.querySelector(".preview-amount");
    const previewTipo = document.querySelectorAll(".preview-line strong")[0];
    const previewCategoria = document.querySelectorAll(".preview-line strong")[1];
    const previewData = document.querySelectorAll(".preview-line strong")[2];

    const statusBox = document.querySelector(".status-box");
    const form = document.querySelector("form");

    const categoriasBase = [
        "Alimentação",
        "Transporte",
        "Salário",
        "Educação"
    ];

    let categorias = readJson(userStorage, "categorias");

    if (!categorias) {
        categorias = [...categoriasBase];
        writeJson(userStorage, "categorias", categorias);
    }

    function renderCategorias() {
        const atual = categoriaSelect.value;

        categoriaSelect.innerHTML = `<option value="">Escolha uma categoria</option>`;

        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categoriaSelect.appendChild(option);
        });

        categoriaSelect.value = atual;
    }

    renderCategorias();

    function addCategoria(nome) {
        nome = nome.trim();
        if (!nome) return;

        const existe = categorias.some(c => c.toLowerCase() === nome.toLowerCase());
        if (existe) return;

        categorias.push(nome);
        writeJson(userStorage, "categorias", categorias);
        renderCategorias();
        categoriaSelect.value = nome;
    }

    function removerCategoriaSelecionada() {
        const valor = categoriaSelect.value;
        if (!valor) return;
        if (categoriasBase.includes(valor)) return;

        categorias = categorias.filter(c => c !== valor);
        writeJson(userStorage, "categorias", categorias);
        renderCategorias();
    }

    btnAddCategoria.addEventListener("click", () => {
        addCategoria(novaCategoriaInput.value);
        novaCategoriaInput.value = "";
    });

    categoriaSelect.addEventListener("keydown", (e) => {
        if (e.key === "Delete") {
            removerCategoriaSelecionada();
        }
    });

    function atualizarPreview() {

        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const valor = valorInput.value || "0,00";

        previewAmount.textContent =
            tipo === "despesa" ? `-R$ ${valor}` : `+R$ ${valor}`;

        previewTipo.textContent = tipo === "despesa" ? "Despesa" : "Receita";
        previewCategoria.textContent = categoriaSelect.value || "Não definida";

        if (dataInput.value) {
            const [ano, mes, dia] = dataInput.value.split("-");
                previewData.textContent = `${dia}/${mes}/${ano}`;
        }
    }

    valorInput.addEventListener("input", atualizarPreview);
    categoriaSelect.addEventListener("change", atualizarPreview);
    dataInput.addEventListener("change", atualizarPreview);

    tipoRadios.forEach(radio => {
        radio.addEventListener("change", atualizarPreview);
    });

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const valor = valorInput.value.trim();
        const categoria = categoriaSelect.value;
        const descricao = descricaoInput.value.trim();
        const data = dataInput.value;

        if (!valor || parseFloat(valor.replace(",", ".")) <= 0) {
            statusBox.textContent = "Informe um valor válido.";
            statusBox.style.color = "#dc2626";
            return;
        }

        if (!categoria) {
            statusBox.textContent = "Selecione uma categoria.";
            statusBox.style.color = "#dc2626";
            return;
        }

        const novaTransacao = {
            id: Date.now(),
            tipo,
            valor,
            categoria,
            descricao,
            data
        };

        const transacoes = readJson(userStorage, "transacoes", []) || [];
        transacoes.push(novaTransacao);

        writeJson(userStorage, "transacoes", transacoes);

        statusBox.textContent = "Transação cadastrada com sucesso!";
        statusBox.style.color = "#16a34a";

        form.reset();
        document.querySelector('input[value="despesa"]').checked = true;
        atualizarPreview();
    });

    atualizarPreview();

});
}
