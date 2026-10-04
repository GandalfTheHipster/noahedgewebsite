"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
})

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  const resolvedTheme = isDark ? "dark" : "light"
  const root = document.documentElement

  root.classList.remove("light", "dark")
  root.classList.add(resolvedTheme)
  root.style.colorScheme = resolvedTheme
}

function readStoredTheme(): Theme {
  try {
    const storedTheme = window.localStorage.getItem("theme")
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "system"
  } catch {
    return "system"
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")

  useEffect(() => {
    const storedTheme = readStoredTheme()
    setThemeState(storedTheme)
    applyTheme(storedTheme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = () => {
      if (readStoredTheme() === "system") applyTheme("system")
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme") {
        const nextTheme = readStoredTheme()
        setThemeState(nextTheme)
        applyTheme(nextTheme)
      }
    }

    mediaQuery.addEventListener("change", handleSystemChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const setTheme = useCallback((value: string) => {
    const nextTheme: Theme =
      value === "light" || value === "dark" ? value : "system"
    try {
      window.localStorage.setItem("theme", nextTheme)
    } catch {
      // Keep the selected theme for this page even when storage is unavailable.
    }
    setThemeState(nextTheme)
    applyTheme(nextTheme)
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
