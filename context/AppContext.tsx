import { useState, createContext } from "react";

const AppContext = createContext({
  section: "",
  setSection: () => {},
});

const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [section, setSection] = useState("");

  return (
    <AppContext.Provider
      value={{
        section,
        //@ts-ignore
        setSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
