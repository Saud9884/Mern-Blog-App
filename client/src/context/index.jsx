import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        blogList,
        setBlogList,
        pending,
        setPending,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
