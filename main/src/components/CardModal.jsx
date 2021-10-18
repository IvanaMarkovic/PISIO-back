import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import style from "../styles/ModalStyle.module.css";

const CardModal = (props) => {
  let commentInput = "";

  const [reload, setReload] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(true);
  const [card, setCard] = useState(null);
  const [comments, setComments] = useState(null);
  const [member, setMember] = useState(null);
  const token = localStorage.getItem("token");

  const fetchCardApi = (id) => {
    fetch("http://localhost:3447/card/?id=" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCard(data);
        console.log(card);
      });
  };

  const fetchCommentsApi = (id) => {
    fetch("http://localhost:3447/card/all_comments/?id=" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
        console.log(comments);
      });
  };

  const addCommnet = (id) => {
    fetch("http://localhost:3447/comment/save", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        text: commentInput,
        date: Date.now().toString(),
        cardId: props.cardId,
      }),
    }).then((res) => {
      console.log(res.status);
      // setReload(!reload);
    });
  };

  useEffect(() => {
    fetchCardApi(props.cardId);
    fetchCommentsApi(props.cardId);
  }, []);

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
      {/* <input type="text">Dodaj komentar: </input> */}
      {card && (
        <div className={style["all"]}>
          <h1 className={style["style"]}>{card.name}</h1>
          <h1 className={style["txt"]}>Description: </h1>
          <h1 className={style["all_style"]}>{card.description}</h1>
          <h1 className={style["txt"]}>Due date: </h1>
          <h1 className={style["all_style"]}>{Date(card.due).slice(0, 24)}</h1>
          <h1 className={style["txt"]}>Last activity: </h1>
          <h1 className={style["all_style"]}>
            {Date(card.dateLastActivity).slice(0, 24)}
          </h1>
          <h1 className={style["txt"]}>Comments: </h1>
          {comments &&
            comments.map((comment) => (
              <>
                {" "}
                <div
                  style={{
                    borderRadius: 10,
                    border: "2px solid black",
                    padding: 10,
                    margin: 3,
                  }}
                >
                  <h1 className={style["comments"]}>{comment.commenterName}</h1>
                  <p>{comment.commentContent.text}</p>
                </div>
              </>
            ))}

          <div>
            <input onInput={(value) => (commentInput = value)} />
            <button onClick={addCommnet()}>Add comment</button>
          </div>
        </div>
      )}

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
