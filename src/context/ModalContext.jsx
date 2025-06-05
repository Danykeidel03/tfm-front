import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openExerciseModal = () => setModal('exercise');
  const openFoodModal = () => setModal('food');
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openExerciseModal, openFoodModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}