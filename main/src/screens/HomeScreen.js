import React, { useEffect, useState } from "react";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardColumns,
  CardGroup,
  CardDeck,
  CardLink,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col,
  CardBlock,
} from "reactstrap";

import { useHistory } from "react-router-dom";
import Header from "../components/header/header";

const HomeScreen = () => {
  const history = useHistory();
  let loggedUserFullName = "";
  const token = localStorage.getItem("token");
  const [boards, setBoards] = useState(null);

  const [members, setMembers] = useState(null);

  // console.log(params.state);
  useEffect(() => {
    // const fetchBoardsApi = () => {
    getBoards();
    // };
  }, []);

  const getBoards = () => {
    console.log(token);
    fetch("http://localhost:3447/member/all_boards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loggedUserFullName = data.fullName;
        setBoards(data.listOfBoards);
      });
  };

  const getMembers = async (boardId) => {
    fetch("http://localhost:3447/board/all_members?id=" + boardId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMembers(data);
      });
  };

  return (
    <>
      <Header name={loggedUserFullName} />
      <Row>
        {boards &&
          boards.map((item) => (
            <Col xs="12" md="4" key={item.boardId}>
              <div
                onClick={() =>
                  history.push({
                    pathname: "/board",
                    state: {
                      boardId: item.boardId,
                      loggedUserFullName: loggedUserFullName,
                    },
                  })
                }
              >
                <Card>
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>{item.dateLastActivity}</CardSubtitle>
                    <CardText> {item.description}</CardText>
                    {members &&
                      members.map((member) => (
                        <CardFooter key={member.memberId}>
                          {" "}
                          {member.fullName}{" "}
                        </CardFooter>
                      ))}
                  </CardBody>
                </Card>
              </div>
            </Col>
          ))}
      </Row>
      <Button>New board</Button>
    </>
  );
};

export default HomeScreen;
