// Проверка сообщений коммитов по Conventional Commits (см. CONTRIBUTING.md)
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [1, "always", [
      "tone", "spelling", "formatting", "markdown", "templates",
      "recommendations", "glossary", "accessibility", "api", "lint", "ci", "deps",
    ]],
  },
};
