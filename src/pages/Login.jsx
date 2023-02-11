import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/716107/pexels-photo-716107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"), center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Agreement = styled.div`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const LINK = styled.a`
    min-width: 20%;
    margin-top: 10px;
    margin-left: 5px;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
`

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

  return (
    <Container>
        <Wrapper>
            <Title>LOGIN ACCOUNT</Title>
            <Form >
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with <b>Privacy Policy</b>
                </Agreement>
                <Button onClick={() => loginWithRedirect()}>LOGIN</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login