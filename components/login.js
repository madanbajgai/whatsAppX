import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" />
        <Button>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div``;
const LoginContainer = styled.div``;
const Logo = styled.img`
  height: 200px;
  width: 200px;
`;
