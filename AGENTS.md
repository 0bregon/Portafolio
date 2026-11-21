<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the portfolio on the index route with in-page anchors because the requested experience is one continuous page.
- Keep verified project links, technologies and factual data in a browser-safe module; localized descriptions belong in the centralized dictionary, and authentic screenshot URLs are asset pointers.
- Define visual roles and responsive styles in the global design system, with shared Button variants for portfolio actions, to keep presentation consistent.
- Keep all interface translations in a typed centralized dictionary and language state in a shell-level context; standalone emergency HTML also uses that dictionary and offers ES/EN selection because it renders without the React shell.
- Render project presentation through a shared project component, and omit absent demo or résumé actions so no control points to fabricated material.
- Keep GitHub Pages as an explicit build target with coordinated Vite/Start/Router bases; normal builds retain Lovable hosting so Git sync and preview remain independent.
- Let TanStack prerender the index while Nitro's Pages crawler is disabled; validate the public artifact and file-server browser flow before Actions deploys it, to prevent server-dependent output.
- Preserve Lovable asset pointers and use exported original captures from public/pages-media only for Pages, because the Lovable asset gateway is unavailable on GitHub hosting.
- Keep filesystem, subprocess and browser validation code in scripts, never in the app's Worker graph, because they are CI-only tooling.
