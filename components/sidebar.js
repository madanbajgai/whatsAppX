import { Avatar } from "@mui/material";
import styled from "styled-components";

export default function Sidebar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
      </Header>
    </Container>
  );
}

const Container = styled.div``;
const Header = styled.div``;
const UserAvatar = styled(Avatar)`
  margin: 10px;76yyt
`;
