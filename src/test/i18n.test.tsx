import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { defaultLanguage, LanguageProvider, useLanguage } from "@/lib/i18n";

describe("Portfolio language selection", () => {
  it("defaults to Spanish", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider });
    expect(defaultLanguage).toBe("es");
    expect(result.current.language).toBe("es");
    expect(document.documentElement.lang).toBe("es");
  });
  it("switches to English and back without remounting the portfolio", () => {
    const { result, rerender } = renderHook(() => useLanguage(), { wrapper: LanguageProvider });
    act(() => result.current.setLanguage("en"));
    rerender();
    expect(result.current.language).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    act(() => result.current.setLanguage("es"));
    expect(result.current.language).toBe("es");
    expect(document.documentElement.lang).toBe("es");
  });
});