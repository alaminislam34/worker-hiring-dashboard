"use client";

const { createContext, useState } = require("react");

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = { isOpen, setIsOpen };
  return <StateContext.Provider value={info}>{children}</StateContext.Provider>;
};
