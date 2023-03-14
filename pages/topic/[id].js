import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Card from "@/components/FlashCards/Card";

export default function Topic({ roadmaps }) {
  const router = useRouter();
  const { id } = router.query;

  const roadmap = roadmaps.find((r) => r.topics.some((t) => t.id === id));
  const topic = roadmap.topics.find((t) => t.id === id);
  console.log(topic);

  if (!id || !topic) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header>{topic.title}</Header>
      <CardsContainer>
        {topic.cards?.map((card) => (
          <Card key={card.id} card={card} color={roadmap.color} />
        ))}
      </CardsContainer>
    </>
  );
}

const Header = styled.h1`
  text-align: center;
`;

const CardsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 0;
`;
