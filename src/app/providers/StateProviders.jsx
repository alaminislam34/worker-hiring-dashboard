"use client";

const { createContext, useState } = require("react");

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const info = {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    isModalOpen,
    setIsModalOpen,
    selectedWorker,
    setSelectedWorker,
  };
  return <StateContext.Provider value={info}>{children}</StateContext.Provider>;
};
