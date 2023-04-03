import Header from "@/components/Header/Header";
import styled from "styled-components";

export default function Profile({ subjects }) {
  const totalCards = subjects.reduce((total, subject) => {
    return (
      total +
      subject.topics.reduce((topicTotal, topic) => {
        return topicTotal + (topic.cards ? topic.cards.length : 0);
      }, 0)
    );
  }, 0);

  return (
    <>
      <Header>Profile</Header>
      <Main>
        <H2>Statistics: </H2>
        <P>Total flashcards: {totalCards}</P>
      </Main>
    </>
  );
}

const Main = styled.main`
  color: #fff;
  margin: 0 20px;
`;

const H2 = styled.h2`
  color: #fff;
`;

const P = styled.p`
  color: #fff;
`;
