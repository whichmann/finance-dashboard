(function () {
  var key = "finance-dashboard-theme";
  var themes = ["light", "dark", "system"];
  var theme = "system";

  try {
    var storedTheme = window.localStorage.getItem(key);
    if (themes.includes(storedTheme)) {
      theme = storedTheme;
    }
  } catch (error) {
    console.warn("Unable to read the stored theme preference.", error);
  }

  if (theme === "system" && document.documentElement.dataset.theme) {
    return;
  }

  var resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
})();
