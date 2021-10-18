import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const CardModal = (props) => {
  console.log(props.cardId + " je id kartice");
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form></form>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default CardModal;
