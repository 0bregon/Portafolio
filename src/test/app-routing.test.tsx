import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("matches the same index route under /Portafolio/ on GitHub Pages", () => {
    const router = createRouter({ routeTree, basepath: "/Portafolio/", history: createMemoryHistory({ initialEntries: ["/Portafolio/"] }), context: { queryClient: new QueryClient() } });
    // Current TanStack separates the internal pathname from the public URL.
    expect(router.latestLocation.pathname).toBe("/");
    expect(router.matchRoutes(router.latestLocation.pathname).at(-1)?.routeId).toBe("/");
    expect(router.buildLocation({ to: "/" }).publicHref).toBe("/Portafolio/");
  });
});
