import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
