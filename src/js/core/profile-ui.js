export function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export function renderProfileUi(profile, root = document) {
  if (!profile) return;

  const sidebarName = root.querySelector(".sidebar-profile strong");

  if (sidebarName) {
    sidebarName.textContent = profile.nome;
  }

  const avatar = root.querySelector(".avatar");

  if (avatar) {
    avatar.textContent = getInitials(profile.nome);
  }
}

export function bindLogout(handler, root = document) {
  const logoutButton = root.querySelector(".logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", handler);
  }
}
