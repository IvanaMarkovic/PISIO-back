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

  const [boards, setBoards] = useState(null);

  const [members, setMembers] = useState(null);

  // console.log(params.state);
  useEffect(() => {
    // const fetchBoardsApi = () => {
    getBoards();
    getMembers();
    // };
  }, []);

  const getBoards = () => {
    fetch(
      "http://localhost:3447/member/all_boards?id=5"
      // , {
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMyIsImV4cCI6MTYzNDU0MTI2MCwiaWF0IjoxNjM0NTA1MjYwfQ.BBU2sr_8bizGEA2mmp2Mt64TuE-FDHudaAtmSQSFEiQ`,
      //   },
      // }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBoards(data);
      });
  };

  const getMembers = () => {
    fetch("http://localhost:3447/board/all_members?id=1", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNSIsImV4cCI6MTYzNDU3OTQ1MSwiaWF0IjoxNjM0NTQzNDUxfQ.HGneD7H0KdzMTbUUtv93ZXIuLZcPw8oRA9N3NCvllE4`,
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
      <Header />
      <Row>
        {boards &&
          boards.map((item) => (
            <Col xs="12" md="4" key={item.boardId}>
              <div
                onClick={() =>
                  history.push({
                    pathname: "/board",
                    state: { boardId: item.boardId },
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
