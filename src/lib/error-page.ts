import { defaultLanguage, translations } from "./i18n";

export function renderErrorPage(): string {
  const t = translations[defaultLanguage];
  const messages = Object.fromEntries(Object.entries(translations).map(([language, value]) => [language, {
    pageTitle: value.pageTitle, errorTitle: value.errorTitle, errorMessage: value.errorMessage,
    tryAgain: value.tryAgain, goHome: value.goHome, languageSelector: value.languageSelector,
  }]));
  return `<!doctype html>
<html lang="${defaultLanguage}">
  <head>
    <meta charset="utf-8" />
    <title>${t.pageTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="actions" role="group" aria-label="${t.languageSelector}" id="language-selector">
        <button lang="es" aria-label="Español" aria-pressed="true" onclick="setLanguage('es')">ES</button>
        <button lang="en" aria-label="English" aria-pressed="false" onclick="setLanguage('en')">EN</button>
      </div>
      <h1 id="error-title">${t.errorTitle}</h1>
      <p id="error-message">${t.errorMessage}</p>
      <div class="actions">
        <button class="primary" id="retry" onclick="location.reload()">${t.tryAgain}</button>
        <a class="secondary" id="home" href="/">${t.goHome}</a>
      </div>
    </div>
    <script>
      const messages = ${JSON.stringify(messages).replace(/</g, "\\u003c")};
      function setLanguage(language) {
        const t = messages[language];
        if (!t) return;
        document.documentElement.lang = language;
        document.title = t.pageTitle;
        document.getElementById('error-title').textContent = t.errorTitle;
        document.getElementById('error-message').textContent = t.errorMessage;
        document.getElementById('retry').textContent = t.tryAgain;
        document.getElementById('home').textContent = t.goHome;
        document.getElementById('language-selector').setAttribute('aria-label', t.languageSelector);
        document.querySelectorAll('#language-selector button').forEach(button => button.setAttribute('aria-pressed', String(button.lang === language)));
      }
    </script>
  </body>
</html>`;
}
