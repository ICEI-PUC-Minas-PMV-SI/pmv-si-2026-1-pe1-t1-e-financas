import { signup } from "../auth/auth-service.js";
import { redirectAuthenticatedUser } from "../auth/route-guard.js";
import { migrateLegacyData } from "../core/legacy-migration.js";

if (!redirectAuthenticatedUser()) {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const status = document.getElementById("auth-status");

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const result = await signup({
        storage: localStorage,
        nome: form.nome.value,
        email: form.email.value,
        password: form.senha.value,
        passwordConfirmation: form["confirmar-senha"].value
      });

      if (!result.ok) {
        status.textContent = result.message;
        return;
      }

      migrateLegacyData(localStorage, result.user.id);
      window.location.assign("dashboard.html");
    });
  });
}
