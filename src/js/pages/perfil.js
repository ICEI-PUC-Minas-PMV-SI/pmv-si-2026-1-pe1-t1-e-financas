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

    const dadosSalvos =
        readJson(userStorage, "perfilUsuario");

    if (dadosSalvos) {

        nome.value =
            dadosSalvos.nome || "";

        email.value =
            dadosSalvos.email || "";

        telefone.value =
            dadosSalvos.telefone || "";

        renderProfileUi(dadosSalvos);
    }

    btnSalvar.addEventListener(
        "click",
        () => {

            const perfil = {

                nome:
                    nome.value,

                email:
                    email.value,

                telefone:
                    telefone.value
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
