import { renderProfileUi } from "../core/profile-ui.js";
import { readJson, writeJson } from "../core/storage.js";

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
        readJson(localStorage, "perfilUsuario");

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

            writeJson(localStorage, "perfilUsuario", perfil);

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
