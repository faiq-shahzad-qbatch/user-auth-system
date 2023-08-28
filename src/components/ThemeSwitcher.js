import React, { useEffect, useState } from "react";

import { DarkModeSwitch } from "react-toggle-dark-mode";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light",
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? true
      : false,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  function toggleDarkMode(checked) {
    setDarkMode(checked);

    if (checked) {
      localStorage.theme = "dark";
      setTheme("dark");
    } else {
      localStorage.theme = "light";
      setTheme("light");
    }
  }

  return (
    <>
      <DarkModeSwitch
        checked={darkMode}
        onChange={toggleDarkMode}
        sunColor="#111828"
        moonColor="#F3F4F6"
      />
    </>
  );
}

export default ThemeSwitcher;
