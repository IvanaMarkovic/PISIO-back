import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Board from "react-trello";
import CardModal from "../components/CardModal";
import Header from "../components/header/header";

let cardMetadata = {};

const BoardScreen = (rops) => {
  const location = useLocation();
  const [lists, setLists] = useState([]);
  const [cardOpened, setCardOpened] = useState(false);
  const token = localStorage.getItem("token");
  const globalData = { lanes: [] };

  useEffect(() => {
    fetchBoardsApi();
  }, []);

  const fetchBoardsApi = () => {
    fetch(
      "http://localhost:3447/board/all_trellolists?id=" +
        location.state.boardId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLists(data);
      });
  };

  const addListApi = (name, boardId) => {
    fetch("http://localhost:3447/trello_list/add_new_list", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      // method: "GET",
      method: "POST",
      body: JSON.stringify({
        name: name.toString(),
        boardId: boardId.toString(),
      }),
      // body: JSON.stringify({ password: "test123", username: "test" }), // body data type must match "Content-Type" header
    }).then((res) => {
      return res.json();
    });
  };

  const addCardApi = (name, laneId, boardId) => {
    fetch("http://localhost:3447/card/add_new_card", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      // method: "GET",
      method: "POST",
      body: JSON.stringify({
        name: name.title,
        desc: name.description,
        boardId: boardId,
        trelloListId: laneId.toString(),
      }),
      // body: JSON.stringify({ password: "test123", username: "test" }), // body data type must match "Content-Type" header
    }).then((res) => {
      return res.json();
    });
  };

  const updateListApi = (laneId, name) => {
    console.log(laneId, name);
    fetch("/trello_list/update_list_name", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({
        trellolistId: laneId.toString(),
        name: name.toString(),
      }),
      // body: JSON.stringify({ password: "test123", username: "test" }), // body data type must match "Content-Type" header
    })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  const data = {
    lanes: [
      {
        id: "lane1",
        title: "Planned Tasks",
        label: "2/2",
        cards: [
          {
            id: "Card1",
            title: "Write Blog",
            description: "Can AI make memes",
            label: "30 mins",
            //draggable: false,
          },
          {
            id: "Card2",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "5 mins",
            metadata: { sha: "be312a1" },
          },
        ],
      },
      {
        id: "lane2",
        title: "Completed",
        label: "0/0",
        cards: [],
      },
    ],
  };

  const filterData = () => {
    lists.forEach((lane) => {
      const cardList = [];
      lane.cards.forEach((card) => {
        cardList.push({
          id: card.cardId,
          title: card.name ? card.name : "",
          description: card.description ? card.description : "",
          // label: card.url,
          draggable: true,
        });
      });
      globalData.lanes.push({
        id: lane.trellolistId,
        title: lane.name,
        // label: item.pos,
        cards: cardList,
        position: lane.pos,
      });
    });

    globalData.lanes.sort(function (a, b) {
      return a.position - b.position;
    });

    return globalData;
  };

  return (
    <div>
      {cardOpened && <CardModal cardId={cardMetadata} />}
      <Header name={location.state.loggedUserFullName}></Header>
      <Board
        draggable
        collapsibleLanes
        cardDraggable
        canAddLanes
        laneDraggable
        editLaneTitle
        editable
        handleLaneDragEnd={(removedIndex, addedIndex, payload) =>
          console.log(removedIndex, addedIndex, payload)
        }
        onLaneAdd={(params) => addListApi(params.title, location.state.boardId)}
        onCardClick={(cardId, metadata, laneId) => {
          cardMetadata = cardId;
          setCardOpened(!cardOpened);
        }}
        onCardAdd={(name, laneId) =>
          addCardApi(name, laneId, location.state.boardId)
        }
        onLaneUpdate={(laneId, name) => {
          updateListApi(laneId, name.title);
        }}
        data={lists.length > 0 ? filterData() : globalData}
      />
    </div>
  );
};
export default BoardScreen;
