import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function NavigationBar({ setShowForm, showForm }) {
  const router = useRouter();
  const isAddButtonDisabled =
    router.route !== "/" && router.route !== "/topic/[id]";

  const handleAddButtonClick = () => {
    if (!isAddButtonDisabled) {
      setShowForm(!showForm);
    }
  };

  // Close form when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setShowForm(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, setShowForm]);

  return (
    <Nav>
      <Ul>
        <Li>
          <NavLink href="/">Home</NavLink>
        </Li>
        <Li>
          <NavLink href="/learn">Learn</NavLink>
        </Li>
        <Li>
          <AddButton
            onClick={handleAddButtonClick}
            disabled={isAddButtonDisabled}
          >
           Add
          </AddButton>
        </Li>
        <Li>
          <NavLink href="/about">About</NavLink>
        </Li>
        <Li>
          <NavLink href="/profile">Profile</NavLink>
        </Li>
      </Ul>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  z-index: 1000;
  padding: 1rem 0;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  margin: 0 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? "#888" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  padding: 0;

  &:hover {
    text-decoration: ${({ disabled }) => (disabled ? "none" : "underline")};
  }
`;
