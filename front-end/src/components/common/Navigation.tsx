import { useIsbnDispatch } from "@libs/searchContextApi";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavBlock = styled.nav`
  position: fixed;
  background: #6ab04c;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
  max-width: 1024px;
  z-index: 10;
`;
const NavList = styled.ul`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled.li<{ isCurrentPath: boolean }>`
  margin: 0 auto;
  color: ${(props) => (props.isCurrentPath ? "#130f40" : "#6c6f72")};
  padding: 10px 0;
`;

const NavIconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavIcon = styled.svg`
  width: 1.75rem;
`;

export function Navigation() {
  const { pathname } = useLocation();
  const isbnDispatch = useIsbnDispatch();
  const onClick = () => isbnDispatch({ type: "INITIALIZE_DATA" });
  return (
    <NavBlock>
      <NavList>
        <NavItem isCurrentPath={pathname === "/"}>
          <Link to={"/"} onClick={onClick}>
            <NavIconBox>
              <NavIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </NavIcon>
              <span>Home</span>
            </NavIconBox>
          </Link>
        </NavItem>
        <NavItem isCurrentPath={pathname === "/search"}>
          <Link to={"search"} onClick={onClick}>
            <NavIconBox>
              <NavIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </NavIcon>
              <span>Search</span>
            </NavIconBox>
          </Link>
        </NavItem>
        <NavItem isCurrentPath={pathname === "/about"}>
          <Link to={"about"} onClick={onClick}>
            <NavIconBox>
              <NavIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </NavIcon>
              <span>About</span>
            </NavIconBox>
          </Link>
        </NavItem>
      </NavList>
    </NavBlock>
  );
}
