"""Check the generated artifact with a file server, not a TanStack server."""
import asyncio
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import urlsplit
from playwright.async_api import async_playwright

ROOT = Path(".output/public").resolve()
BASE = "/Portafolio/"
SCREENSHOTS = Path("/tmp/browser/pages-verification")


class PagesHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        return super().translate_path("/" + path[len(BASE):])

    def do_GET(self):
        path = urlsplit(self.path).path
        if path == BASE.rstrip("/"):
            self.send_response(301)
            self.send_header("Location", BASE)
            self.end_headers()
        elif path.startswith(BASE):
            super().do_GET()
        else:
            self.send_error(404)

    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        body = (ROOT / "404.html").read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


async def main():
    SCREENSHOTS.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(PagesHandler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f"http://127.0.0.1:{server.server_port}"
    try:
        async with async_playwright() as playwright:
            browser = await playwright.chromium.launch(headless=True)
            context = await browser.new_context(viewport={"width": 1280, "height": 1800})
            page = await context.new_page()
            errors, missing = [], []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("response", lambda response: missing.append(response.url) if response.status >= 400 and response.url.startswith(origin) else None)
            response = await page.goto(origin + BASE, wait_until="networkidle")
            assert response and response.status == 200
            await page.get_by_role("button", name="English", exact=True).click()
            assert await page.locator("html").get_attribute("lang") == "en"
            assert await page.locator("#project-conac").inner_text() == "CONAC - Collaborative Project"
            assert "looking for opportunities" in await page.locator(".hero-intro").inner_text()
            assert "only a web prototype" in await page.locator(".project-robo .project-description").inner_text()
            assert await page.title() == "Mariel Obregón — Web & Software Development"
            for section in ["about", "projects", "skills", "education", "experience", "contact"]:
                await page.get_by_role("navigation", name="Main navigation").locator(f'a[href="#{section}"]').click()
                assert urlsplit(page.url).fragment == section
            for image in await page.locator(".project-image img").all():
                await image.scroll_into_view_if_needed()
                await image.evaluate("img => img.decode()")
                assert await image.evaluate("img => img.naturalWidth > 0")
                assert (await image.get_attribute("src")).startswith(BASE + "pages-media/")
            for link in await page.locator('a[target="_blank"]').all():
                assert (await link.get_attribute("href")).startswith("https://")
                assert "noopener" in (await link.get_attribute("rel"))
            await page.locator(".project-conac").screenshot(path=str(SCREENSHOTS / "conac-desktop.png"))
            await page.set_viewport_size({"width": 630, "height": 530})
            await page.get_by_role("button", name="Open navigation", exact=True).click()
            await page.get_by_role("navigation", name="Mobile navigation").get_by_role("link", name="Education", exact=True).click()
            assert urlsplit(page.url).fragment == "education"
            await page.get_by_role("button", name="Español", exact=True).click()
            assert await page.locator("#project-conac").inner_text() == "CONAC - Proyecto Colaborativo"
            assert await page.evaluate("document.documentElement.scrollWidth <= innerWidth")
            await page.locator("#education").screenshot(path=str(SCREENSHOTS / "education-mobile.png"))
            await page.set_viewport_size({"width": 320, "height": 700})
            assert await page.evaluate("document.documentElement.scrollWidth <= innerWidth")
            assert not errors, errors
            assert not missing, missing
            response = await page.goto(origin + BASE + "does-not-exist", wait_until="networkidle")
            assert response and response.status == 404
            await page.get_by_role("button", name="English", exact=True).click()
            assert await page.get_by_role("heading", name="Page not found", exact=True).count() == 1
            assert await page.evaluate("document.documentElement.scrollWidth <= innerWidth")
            await page.screenshot(path=str(SCREENSHOTS / "404-mobile.png"))
            await page.get_by_role("link", name="Go home", exact=True).click()
            assert page.url == origin + BASE
            await page.get_by_role("button", name="English", exact=True).wait_for()
            assert not errors, errors
            await browser.close()
        print("Static Pages artifact verified: ES/EN, project images, metadata, desktop/mobile navigation, anchors, real 404 and return home.")
    finally:
        server.shutdown()
        server.server_close()


asyncio.run(main())