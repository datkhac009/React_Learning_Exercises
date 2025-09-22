import { createContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();
function ThemectxProvider({ children }) {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark", mode);
  }, [mode]);
  function toggler() {
    setMode((m) => !m);
  }

  const value = useMemo(() => ({ mode, toggler }), [mode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemectxProvider, ThemeContext };
