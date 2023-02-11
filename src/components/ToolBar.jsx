import React from 'react'
import styled from 'styled-components'
import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Container = styled.div`
    height: 60px;
    background-color: white;
`
const Wrapper =styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`

const LEFT =styled.div`
    font-weight: 700;
    font-size: 25px;
    color: darkblue;
`
const RIGHT =styled.div`
    display: flex;
    align-items: center;
    padding: 0px 10px;
`

const Profile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 99%;
    padding-left: 20px;
    cursor: pointer;
`

const ToolBar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth0();
  return (
    <Container>
        <Wrapper>
            <LEFT style={{color:"#205295",
                cursor:"pointer",
            }} onClick={() => navigate("/dashboard")}>DASHBOARD</LEFT>
            <RIGHT>
                <Tab to="/" label="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}/>
            </RIGHT>
        </Wrapper>
    </Container>
  )
}

export default ToolBar;