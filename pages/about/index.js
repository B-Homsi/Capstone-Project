import React from "react";
import styled from "styled-components";

export default function About() {
  return (
    <>
      <Header>Welcome to IntelliFlash!</Header>
      <Text>
        IntelliFlash is a powerful and user-friendly spaced repetition
        flashcards app designed to help you learn and retain information more
        effectively. The app is built using React and Next.js, ensuring a
        seamless and efficient learning experience. In IntelliFlash, you can
        create subjects and topics, add flashcards, review them daily, and track
        your progress.
      </Text>
      <Header>Getting Started</Header>
      <Text>
        1. <strong>Create Subjects and Topics:</strong> Click the (+) button on
        the homepage to create a new subject, and then add topics within that
        subject. This allows you to organize your learning material based on
        your interests and needs.
      </Text>
      <Text>
        2. <strong>Add Flashcards:</strong> Navigate to a specific topic by
        selecting a subject and clicking on the desired topic. Once there, you
        can add flashcards by clicking the (+) button on the navbar.
      </Text>
      <Text>
        3. <strong>Review Flashcards:</strong> To see the answer on a flashcard,
        simply click on it to flip the card. This interactive feature helps keep
        you engaged while studying.
      </Text>
      <Header>Learn Page</Header>
      <Text>
        The Learn Page is where you will review your cards every day. First,
        select the subject you want to study. You will then be taken to the
        Learn Page, where you can review cards one by one. Click (Correct) if
        you have reviewed the card correctly, or (Incorrect) if not. You can
        also skip a card or go back to the previous one. When you have finished
        your learning session, click (Done) to see your results.
      </Text>
      <Header>Spaced Repetition: The Science Behind IntelliFlash</Header>
      <Text>
        Spaced repetition is a proven learning technique that involves reviewing
        information at gradually increasing intervals. This approach takes
        advantage of the psychological spacing effect, which states that
        information is more easily retained when it is studied repeatedly over
        spaced intervals rather than being crammed into a single session.
      </Text>
      <Text>
        By leveraging this technique, IntelliFlash helps you retain knowledge
        more efficiently and effectively. Research shows that our brains are
        better at retaining information when we space out our learning sessions,
        as it allows the information to move from our short-term memory to our
        long-term memory. This process, known as consolidation, helps form
        stronger neural connections, leading to better recall and understanding
        of the material.
      </Text>
      <Text>
        IntelliFlash uses the following as the first stages for card review:
        <ul>
          <li>Stage 0: Review immediately.</li>
          <li>Stage 1: Review after 24 hours.</li>
          <li>Stage 2: Review after another 24 hours.</li>
          <li>Stage 3: Review after 72 hours.</li>
          <li>...more increasing intervals</li>
        </ul>
      </Text>
      <Header>Creating Effective Flashcards with Chunks</Header>
      <Text>
        To maximize your learning experience, create flashcards using chunks -
        small, digestible pieces of information. Breaking complex concepts into
        chunks allows you to focus on one idea at a time, making it easier to
        remember and understand. Here are some tips for creating effective
        chunked flashcards:
      </Text>
      <Text>
        1. <strong>Keep it simple:</strong> Focus on one idea or concept per
        card.
      </Text>
      <Text>
        2. <strong>Be concise:</strong> Use clear and concise language to convey
        the information.
      </Text>
      <Text>
        3. <strong>Test yourself:</strong> Design your flashcards to prompt
        active recall and self-testing.
      </Text>
      <MotivationalMessage>
        Unlock your true learning potential with IntelliFlash! Start your
        journey to lasting knowledge today and see the amazing difference it can
        make.
      </MotivationalMessage>
      <Footer>
        <p>Copyright © 2023 Bilal Homsi. All rights reserved.</p>
        <Link href="[GitHub URL]" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
        {" | "}
        <Link href="[LinkedIn URL]" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
      </Footer>
    </>
  );
}

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #0070f3;

  &:hover {
    text-decoration: underline;
  }
`;

const MotivationalMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #888;
`;
