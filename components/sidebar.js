import { Chat, MoreVert, Search } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const usersRef = collection(db, "chat");
  const q = query(usersRef, where("chat", "array-contains", "user.email"));

  const getChat = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  getChat();

  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = async () => {
    const input = prompt("Please enter an email address");
    if (!input) return null;

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      try {
        const docRef = await addDoc(collection(db, "chat"), {
          users: [user.email, input],
        });
        console.log("User added ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const chatAlreadyExists = (recipentEmail) => !!chatSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipentEmail)?.length > 0);

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
