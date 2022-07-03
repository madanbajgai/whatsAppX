import { dividerClasses } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/sidebar";

const ChatPage = ({}) => {
  return (
    <Container>
      <Head>
        <title>chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style {
    scrollbar-width: none;
  }
`;
