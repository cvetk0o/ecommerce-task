"use client";
import { useTheme } from "@/hooks/useTheme";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className={styles.themeToggle}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
