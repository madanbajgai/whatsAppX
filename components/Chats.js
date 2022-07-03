import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import getRecipentEmail from "../utils/getRecipentEmail";

const Chats = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipentEmail(users, user);

  console.log(user, users);
  return (
    <Container>
      <UserAvatar />
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default Chats;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
