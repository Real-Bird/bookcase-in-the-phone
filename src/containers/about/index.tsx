import { checkedUser, disconnect, logout } from "@api/auth";
import { useUserDispatch, useUserState } from "@libs/userContextApi";
import { Logout } from "@components/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AboutBlock = styled.div`
  width: 100%;
  height: 87vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 3rem;
  padding: 1rem 10px;
  position: relative;
  div {
    position: absolute;
    top: 25%;
    font-size: 1.5rem;
    strong {
      font-size: 1.75rem;
      font-weight: 600;
      padding: 0 1rem;
    }
  }
  footer {
    position: absolute;
    bottom: 2rem;
    display: flex;
  }
`;

function AboutContainer() {
  const FetchUserDispatch = useUserDispatch();
  const userState = useUserState();
  const navigate = useNavigate();
  const googleAuthLogout = async () => {
    FetchUserDispatch({ type: "INITIALIZE_USER" });
    await logout();
    navigate("/");
  };

  const disconnectGoogleAuth = async () => {
    const res = await checkedUser();
    if (!res || !res.isLogged) {
      return navigate("/404", { replace: true });
    }
    if (
      window.confirm(
        "탈퇴 시 모든 데이터(사용자, 책장)가 삭제됩니다.\n정말 탈퇴하시겠습니까?"
      )
    ) {
      await disconnect();
      return navigate("/login", { replace: true });
    }
  };
  return (
    <AboutBlock>
      <div>
        안녕하세요,<strong>{userState.userInfo.name}</strong>님!
      </div>
      <Logout onClick={googleAuthLogout} />

      <footer>
        <h6 style={{ marginRight: 10 }}>
          &copy; Bookcase in the Phone 2023 by Real-Bird
        </h6>
        <strong
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={disconnectGoogleAuth}>
          탈퇴하기
        </strong>
      </footer>
    </AboutBlock>
  );
}

export default AboutContainer;
