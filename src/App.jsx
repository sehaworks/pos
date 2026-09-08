import React, { useState } from 'react';
import './App.css'
import PosMain from './pages/ProductMainPage'

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return <PosMain
    activeModal={activeModal}
    openModal={openModal}
    closeModal={closeModal}
  />
}

export default App
