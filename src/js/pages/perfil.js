import { renderProfileUi } from "../core/profile-ui.js";
import { readJson, writeJson } from "../core/storage.js";

import { logout, requireUser } from "../auth/route-guard.js";
import { saveUser } from "../auth/account-repository.js";
import { bindLogout } from "../core/profile-ui.js";
import { createUserStorage } from "../core/user-storage.js";

const activeUser = requireUser();

if (activeUser) {
    const userStorage = createUserStorage(localStorage, activeUser.id);
    bindLogout(() => logout());

document.addEventListener("DOMContentLoaded", () => {

    const nome =
        document.getElementById("nome");

    const email =
        document.getElementById("email");

    const telefone =
        document.getElementById("telefone");

    const btnSalvar =
        document.getElementById(
            "btnSalvarPerfil"
        );

    const mensagem =
        document.getElementById(
            "mensagemPerfil"
        );

    const alertasToggle =
        document.getElementById(
            "alertasResumo"
        );

    const alertasStatus =
        document.getElementById(
            "alertasStatus"
        );

    const metaPrincipalNome =
        document.getElementById(
            "metaPrincipalNome"
        );

    const updateAlertasStatus = (ativo) => {
        alertasStatus.textContent = ativo
            ? "Resumo semanal ativo"
            : "Resumo semanal inativo";
        alertasToggle.setAttribute(
            "aria-checked",
            ativo ? "true" : "false"
        );
    };

    const metas =
        readJson(userStorage, "metas", []) || [];

    if (metaPrincipalNome) {
        metaPrincipalNome.textContent = "";

        if (metas.length > 0) {
            metas.forEach(meta => {
                const line = document.createElement("div");
                const title = document.createElement("strong");
                const progress = Math.round(
                    (meta.objetivo > 0 ? meta.guardado / meta.objetivo : 0) *
                    100
                );

                title.textContent = meta.nome;
                line.appendChild(title);
                line.appendChild(
                    document.createTextNode(` — ${progress}%`)
                );
                metaPrincipalNome.appendChild(line);
            });
        } else {
            metaPrincipalNome.textContent = "Reserva de emergência";
        }
    }

    const dadosSalvos =
        readJson(userStorage, "perfilUsuario");

    if (dadosSalvos) {

        nome.value =
            dadosSalvos.nome || "";

        email.value =
            dadosSalvos.email || "";

        telefone.value =
            dadosSalvos.telefone || "";

        const alertasAtivas =
            dadosSalvos.alertasAtivas ?? true;

        alertasToggle.checked = alertasAtivas;
        updateAlertasStatus(alertasAtivas);

        renderProfileUi(dadosSalvos);
    } else {
        alertasToggle.checked = true;
        updateAlertasStatus(true);
    }

    alertasToggle.addEventListener(
        "change",
        () => {
            updateAlertasStatus(
                alertasToggle.checked
            );
        }
    );

    btnSalvar.addEventListener(
        "click",
        () => {

            const perfil = {

                nome:
                    nome.value,

                email:
                    email.value,

                telefone:
                    telefone.value,

                alertasAtivas:
                    alertasToggle.checked
            };

            try {
                saveUser(localStorage, {
                    ...activeUser,
                    nome: perfil.nome,
                    email: perfil.email
                });
            } catch (error) {
                mensagem.textContent = error.message;
                return;
            }

            writeJson(userStorage, "perfilUsuario", perfil);

            mensagem.innerHTML = `
                <strong>
                    Dados salvos com sucesso
                </strong>
                <p>
                    Suas informações foram atualizadas.
                </p>
            `;

            renderProfileUi(perfil);
        }
    );
});
}
