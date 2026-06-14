import { login } from "../auth/auth-service.js";
import { redirectAuthenticatedUser } from "../auth/route-guard.js";
import { migrateLegacyData } from "../core/legacy-migration.js";

if (!redirectAuthenticatedUser()) {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const status = document.getElementById("auth-status");

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const result = await login({
        storage: localStorage,
        email: form.email.value,
        password: form.senha.value
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
