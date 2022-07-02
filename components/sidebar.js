import { Chat, MoreVert, Search } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Sidebar() {
  const [user] = useAuthState(auth);

  const createChat = async () => {
    const input = prompt("Please enter an email address");
    if (!input) return null;
    if (await chatAlreadyExists(input)) {
      if (EmailValidator.validate(input) && input !== user.email) {
        try {
          const docRef = await addDoc(collection(db, "chat"), {
            users: [user.email, input],
          });
          console.log("User added ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };
  const chatAlreadyExists = async (recipientEmail) => {
    const chatUsers = [];
    const querySnapshot = await getDocs(collection(db, "chat"), where("users", "array-contains", user.email));
    querySnapshot.forEach((doc) => {
      chatUsers.push(doc.data().users[1]);
    });

    return !chatUsers.includes(recipientEmail);
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <MoreVert />
        </IconsContainer>
      </Header>
      <Searchdiv>
        <Search />
        <SearchInput placeholder="Search in chats" />
      </Searchdiv>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chats */}
    </Container>
  );
}

const Container = styled.div``;
const SidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;
const Searchdiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
